import { slugifyWithCounter } from '@sindresorhus/slugify';
import * as acorn from 'acorn';
import { fromHtml } from 'hast-util-from-html';
import { toString } from 'hast-util-to-string';
import { mdxAnnotations } from 'mdx-annotations';
import * as shiki from 'shiki';
import { SKIP, visit } from 'unist-util-visit';
import type { Root, Element, ElementContent } from 'hast';

function rehypeParseCodeBlocks() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, _nodeIndex, parentNode: any) => {
      if (node.tagName === 'code' && parentNode && parentNode.tagName === 'pre') {
        const className = node.properties?.className as string[] | undefined
        parentNode.properties = parentNode.properties || {}
        
        // Set the language property for syntax highlighting
        if (!parentNode.properties.language) {
          let lang = className
            ? (Array.isArray(className) ? className[0] : className)?.replace(/^language-/, '') || 'txt'
            : 'txt'
          // Normalize custom blocks (button, btn) to 'txt' so Shiki never sees them
          if (lang && (lang.toLowerCase() === 'button' || lang.toLowerCase() === 'btn')) {
            lang = 'txt'
          }
          parentNode.properties.language = lang
        }

        // Also set data-language as an HTML attribute for client-side access
        let dataLang = parentNode.properties.language as string
        if (dataLang && (dataLang.toLowerCase() === 'button' || dataLang.toLowerCase() === 'btn')) {
          dataLang = 'txt'
        }
        parentNode.properties['data-language'] = dataLang
        
        // Extract title from annotation attribute (from mdx-annotations)
        if (parentNode.properties.annotation) {
          const annotation = parentNode.properties.annotation as string
          // Parse the annotation string like "{ title: 'Example request with basic auth' }"
          const titleMatch = annotation.match(/title:\s*['"]([^'"]+)['"]/)
          if (titleMatch) {
            parentNode.properties['data-title'] = titleMatch[1]
          }
          // Remove the annotation attribute as it's not needed in the final HTML
          delete parentNode.properties.annotation
        }
      }
    })
  }
}

// Dual-theme: One Light for light mode, One Dark Pro for dark.
// shiki v3 emits inline color + `--shiki-dark:` style vars; CSS in global.css
// switches between them on the .dark class.
//
// Highlighter is cached on globalThis so it survives Vite's per-worker module
// re-evaluation during the Astro build. A module-scoped `let` re-initialises
// every time the plugin module is re-loaded, which Astro does per content
// collection — leaking a fresh highlighter instance per ~100 pages, eventually
// blowing past shiki's 230+ singleton warning and into OOM territory.
//
// We cache the *promise*, not the resolved value, so concurrent first-page
// renders await the same in-flight construction instead of racing to create
// multiple highlighters before the cache is set.

const LANGS = [
  'txt', 'plaintext', 'text', 'bash', 'sh', 'shell', 'powershell',
  'js', 'jsx', 'ts', 'tsx', 'json', 'jsonc', 'yaml', 'toml',
  'html', 'xml', 'css', 'scss', 'md', 'mdx',
  'python', 'rust', 'go', 'csharp', 'cs', 'java', 'kotlin', 'swift',
  'php', 'ruby', 'sql', 'astro', 'svelte', 'vue', 'dockerfile', 'diff', 'ini',
  'http',
]

const HIGHLIGHTER_KEY = Symbol.for('nomercy-docs.shiki-highlighter')
type HighlighterPromise = Promise<shiki.HighlighterGeneric<any, any>>

function getHighlighter(): HighlighterPromise {
  const g = globalThis as unknown as Record<symbol, HighlighterPromise | undefined>
  let cached = g[HIGHLIGHTER_KEY]
  if (!cached) {
    cached = shiki.createHighlighter({
      themes: [
        'one-light', 'one-dark-pro',
        'github-light', 'github-dark',
        'github-light-high-contrast', 'github-dark-high-contrast',
        'vitesse-light', 'vitesse-dark',
      ],
      langs: LANGS,
    })
    g[HIGHLIGHTER_KEY] = cached
  }
  return cached
}

/**
 * A pseudo-tag is not a language. It is a value the reader should see in one
 * of the theme's colors, written in prose without the syntax that would earn
 * that color. Each one names the smallest piece of real code that puts the
 * value in the right token position, and the scaffolding is cut afterwards so
 * only the value is shown.
 */
const PSEUDO_TAGS: Record<string, { before: string; after: string; lang?: string }> = {
  // An HTML element name, in the theme's tag color. Only markup earns that
  // color, so the name is wrapped as a self-closing JSX element and the
  // brackets are cut.
  el: { before: '<', after: ' />', lang: 'tsx' },
  // A value or constant, in the theme's variable color. A bare name inside
  // parentheses is an expression, which is where a variable gets its color.
  var: { before: '(', after: ')' },
  // An HTML attribute name (`aria-label`, `viewBox`), in the theme's
  // attribute color: the name sits on a JSX element, and the element and the
  // empty value are cut.
  attr: { before: '<a ', after: '="" />', lang: 'tsx' },
  // A string, without the quotes a reader would have to look past.
  str: { before: '\'', after: '\'' },
  // A class or type name, in the theme's class color. A type annotation is
  // what earns that color: `new X()` tokenizes X as a call and comes out the
  // function blue instead.
  cls: { before: 'let _: ', after: '' },
  // A function or method, in the theme's function color. Call parentheses are
  // what earn that color, so they are added and then cut: the name is what the
  // prose is naming, and a pair of empty brackets is punctuation the sentence
  // did not ask for.
  fn: { before: '', after: '()' },
  // An object key, in the theme's property color. Key position is inside an
  // object literal, so that is the smallest wrapper that earns the color.
  key: { before: '({', after: ':0})' },
}

/** Cut the scaffolding a pseudo-tag was highlighted with, keeping the value's color. */
function stripWrapper(nodes: ElementContent[], before: number, after: number): void {
  const texts: { value: string }[] = []
  const walk = (list: ElementContent[]): void => {
    for (const n of list) {
      if (n.type === 'text') texts.push(n)
      else if (n.type === 'element') walk(n.children as ElementContent[])
    }
  }
  walk(nodes)

  let left = before
  for (const t of texts) {
    if (left <= 0) break
    const cut = Math.min(left, t.value.length)
    t.value = t.value.slice(cut)
    left -= cut
  }
  let right = after
  for (let i = texts.length - 1; i >= 0 && right > 0; i--) {
    const t = texts[i]!
    const cut = Math.min(right, t.value.length)
    t.value = t.value.slice(0, t.value.length - cut)
    right -= cut
  }

  // The wrapper's tokens leave empty spans behind. The browser can break a
  // line at an empty span, so a tag split in two: its left edge stayed at the
  // end of one line and the word moved to the next. Drop them.
  const prune = (list: ElementContent[]): void => {
    for (let i = list.length - 1; i >= 0; i--) {
      const n = list[i]!
      if (n.type === 'element') prune(n.children as ElementContent[])
      if ((n.type === 'text' && n.value === '') || (n.type === 'element' && n.children.length === 0)) list.splice(i, 1)
    }
  }
  prune(nodes)
}

function rehypeShiki() {
  return async (tree: Root) => {
    const highlighter = await getHighlighter()

    // A heading names its subject in the heading's own face. A code badge in a
    // title reads as a pill stuck on the line, so code inside a heading becomes
    // plain text: the pseudo-tag or language tag is dropped and the name stays.
    // The text is what the badge showed, so the heading's anchor id is the same.
    visit(tree, 'element', (heading: Element) => {
      if (!/^h[1-6]$/.test(heading.tagName)) return
      visit(heading, 'element', (node: Element, index, parent) => {
        if (node.tagName !== 'code' || !parent || index === undefined) return
        const raw = toString(node).trim()
        const tagged = /^([a-z]+)[ \t]+([\s\S]+)$/.exec(raw)
        const text = tagged && (PSEUDO_TAGS[tagged[1]] || LANGS.includes(tagged[1])) ? tagged[2] : raw
        ;(parent as Element).children.splice(index, 1, { type: 'text', value: text })
      })
    })

    // Inline `code` spans get the same two themes as a fence. A page names
    // `await player.ready()` in prose far more often than it shows a block, and
    // an unhighlighted span beside a highlighted fence reads as two different
    // languages. Everything inline is treated as TypeScript: the identifiers,
    // strings and punctuation a docs page quotes are all TS-shaped, and a token
    // TS cannot place falls back to the plain foreground rather than erroring.
    visit(tree, 'element', (node: Element, _index, parent) => {
      if (node.tagName !== 'code') return
      if ((parent as Element | undefined)?.tagName === 'pre') return
      if (node.properties?.['data-inline-highlighted']) return

      // Triple-backtick inline spans keep a padding space around their content,
      // so the tag is not the first character. Trim before matching the tag.
      const raw = toString(node).trim()
      if (!raw || raw.length > 160) return

      // An explicit language prefix inside the backticks, written as
      // `ts await player.ready()`. Markdown has no inline fence, so the tag
      // arrives as the first word of an ordinary code span; naming it is how an
      // author says "this one is code" for a span the heuristic below would
      // read as prose. The tag is stripped before highlighting and never shown.
      const tagged = /^([a-z]+)[ 	]+([\s\S]+)$/.exec(raw)
      // A pseudo-tag names a color rather than a language; see PSEUDO_TAGS.
      const pseudo = tagged ? PSEUDO_TAGS[tagged[1]] : undefined
      const taggedLang = tagged && (pseudo || LANGS.includes(tagged[1])) ? tagged[1] : null
      const text = taggedLang ? tagged![2] : raw

      // Only spans that are actually code. A page's backticks carry far more
      // than TypeScript: file extensions, error codes, config keys, language
      // tags. Highlighting those as TS tokenizes `.m3u8` into punctuation plus
      // a red identifier, which is noise wearing the colors of meaning. A call,
      // an arrow, an object literal or a generic is code; a bare word is not.
      // A bare value is code too: `0`, `-1`, `false`, `undefined`. A fence
      // colors these as number and keyword, so leaving them plain inline made
      // the same value two different colors on one page.
      const isLiteral = /^-?\d[\d_]*(\.\d+)?$|^(true|false|null|undefined|this)$/.test(text)
      // An HTTP header line (`Authorization: Bearer <token>`) is not
      // TypeScript: read as TS its value turned into a run of red tokens. The
      // http grammar colors the name and gives the value the string color. A
      // header name has a hyphen or is a well-known one; an all-caps word
      // (`KIT: 1`, `WARNING: ...`) is not a header.
      const isHeader = !pseudo && !taggedLang
        && /^[A-Za-z][A-Za-z0-9]*(-[A-Za-z0-9]+)*:\s+\S/.test(text)
        && /[a-z]/.test(text.split(':')[0])
        && (text.split(':')[0].includes('-') || /^(Authorization|Accept|Cookie|Origin|Range|Referer|Host|Location)$/i.test(text.split(':')[0]))
      const isKeyValue = !isHeader && /^[A-Za-z_$][\w$]*\??:\s+\S/.test(text) && !/[;{}]/.test(text)
      // Three more shapes are code without a tag. A capitalized name is a class
      // or type in TypeScript (`IPlayer`, `Promise`), so it takes the class
      // color; an all-caps name is a constant and is left alone. A keyword
      // (`instanceof`, `as const`) highlights as itself. An expression with a
      // spaced operator or an array literal (`duration - position`,
      // `[0.5, 1]`) is code; the spaces keep `text/vtt` and `H:M:S` out.
      // A scoped package name (`@nomercy-entertainment/nomercy-player-core`,
      // with or without a subpath) is what an import statement quotes, so it
      // takes the string color it has in a fence's `from '...'`.
      const isPackage = !pseudo && !taggedLang && /^@[a-z0-9-]+\/[a-z0-9._-]+(\/[a-z0-9._/-]+)?$/.test(text)
      // A generic or array type (`PluginTestContext<C>`, `Track[]`) is a type
      // too; wrapped as an expression its name came out in the variable color.
      const typeName = text.replace(/<[\s\S]*>$/, '').replace(/(\[\])+$/, '')
      const isType = !pseudo && !taggedLang && (/^[A-Z][A-Za-z0-9_$]*$/.test(typeName) && /[a-z]/.test(typeName) || /^[A-Z]$/.test(typeName))
      const isKeyword = /^as\s+\S/.test(text) || /^(instanceof|typeof|keyof|try|catch|finally|await|async|new|return|throw|const|let|type|interface|extends|implements|import|export)$/.test(text)
      const isExpression = /^\[.*\]$/.test(text) || /^[\w$.'"]+\s+(\?\?|\|\||&&|===?|!==?|[-+*/%]|<=?|>=?)\s+[\w$.'"]+/.test(text)
      const isCode = taggedLang !== null || isHeader || isLiteral || isKeyValue || isPackage || isType || isKeyword || isExpression || /\(\)|\(.*\)|=>|[{};]|<[A-Za-z]/.test(text)
      if (!isCode) return

      // TypeScript reads a bare `{ autoplay: true }` as a block with a label,
      // which colors the key as something else, and `autoplay: false` alone
      // the same way. Parentheses put both in expression position, where the
      // key gets the property color; the wrapper is cut after highlighting.
      const objectWrap = !pseudo && !taggedLang
        ? (/^\{[\s\S]*\}$/.test(text)
            ? { before: '(', after: ')' }
            : isKeyValue
              ? { before: '({', after: '})' }
              : undefined)
        : undefined
      const wrap = pseudo ?? (isPackage ? PSEUDO_TAGS.str : isType ? PSEUDO_TAGS.cls : objectWrap)

      node.properties = node.properties || {}
      node.properties['data-inline-highlighted'] = 'true'

      const source = wrap ? `${wrap.before}${text}${wrap.after}` : text
      const html = highlighter.codeToHtml(source, {
        lang: pseudo ? (pseudo.lang ?? 'ts') : isHeader ? 'http' : (taggedLang ?? 'ts'),
        themes: {
          light: 'one-light',
          dark: 'one-dark-pro',
          ghLight: 'github-light',
          ghDark: 'github-dark',
          hcLight: 'github-light-high-contrast',
          hcDark: 'github-dark-high-contrast',
          vtLight: 'vitesse-light',
          vtDark: 'vitesse-dark',
        },
        defaultColor: 'light',
        structure: 'inline',
        // One Dark Pro ships two palettes and Shiki bundles only the first.
        // These four are the Vivid scheme's values for the same token roles,
        // which is what the editor beside this site is set to: a brighter red
        // and purple, a slightly cooler green and cyan. Blue, yellow, orange
        // and the foreground are identical in both and are not listed.
        colorReplacements: {
          'one-dark-pro': {
            '#e06c75': '#ef596f',
            '#c678dd': '#d55fde',
            '#98c379': '#89ca78',
            '#56b6c2': '#2bbac5',
          },
            // Vitesse paints its string-escape token with an eight-digit hex,
            // so the color carries alpha and the token lands at 47% opacity.
            // Inside a sentence that is a fragment of body text rendered
            // nearly transparent. Same color, full strength.
            'vitesse-light': { '#b5695977': '#b56959' },
            'vitesse-dark': { '#c98a7d77': '#c98a7d' },
        },
      })
      // Vitesse paints some tokens with an eight-digit hex, so the color
      // carries alpha. Dimmed punctuation inside a fenced block is the theme
      // working as intended; the same token inline is a fragment of a sentence
      // rendered at 47% opacity, which is unreadable next to full-strength
      // prose. Drop the alpha on the inline path and leave blocks alone.
      const opaque = html.replace(/(#[0-9a-fA-F]{6})[0-9a-fA-F]{2}/g, '$1')
      const parsed = fromHtml(opaque, { fragment: true }).children as ElementContent[]
      if (wrap) stripWrapper(parsed, wrap.before.length, wrap.after.length)
      node.children = parsed
    })

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre' || node.children[0]?.type !== 'element') return
      const codeNode = node.children[0] as Element
      if (codeNode.tagName !== 'code') return

      // Coalesce ALL child nodes to a single source text. MDX parses real
      // HTML tags (`<script>`, `<div>`) inside ```html fences as element
      // children, so `children[0].type === 'text'` would miss them and the
      // block would render unhighlighted as escaped raw HTML.
      const rawText = toString(codeNode)
      if (!rawText) return

      node.properties = node.properties || {}
      const existingDataTitle = node.properties['data-title']
      // Store raw text under `data-code` (valid HTML5 data attribute).
      // The previous custom `code` attribute name made some browsers
      // mis-tokenize html / vue blocks whose value contained literal
      // `<script>` substrings, dropping every shiki span inside.
      node.properties['data-code-raw'] = rawText
      node.properties.className = ['shiki', 'overflow-x-auto', 'px-5', 'py-4', 'text-xs', 'leading-relaxed']
      delete node.properties.style
      delete node.properties.tabindex
      if (existingDataTitle) {
        node.properties['data-title'] = existingDataTitle
      }

      let syntaxLanguage = (node.properties['data-language'] as string | undefined) ?? 'txt'
      const langLower = syntaxLanguage.toLowerCase()
      if (langLower === 'button' || langLower === 'btn') {
        syntaxLanguage = 'txt'
      }
      // Shiki throws on unregistered langs — fall back to txt.
      if (!LANGS.includes(syntaxLanguage)) {
        syntaxLanguage = 'txt'
      }
      // Dual theme: One Light in light mode, One Dark Pro in dark mode. Shiki
      // emits the light hex inline and a --shiki-dark var; global.css swaps to
      // the dark var under .dark.
      const highlightedHtml = highlighter.codeToHtml(rawText, {
        lang: syntaxLanguage,
        themes: {
          light: 'one-light',
          dark: 'one-dark-pro',
          ghLight: 'github-light',
          ghDark: 'github-dark',
          hcLight: 'github-light-high-contrast',
          hcDark: 'github-dark-high-contrast',
          vtLight: 'vitesse-light',
          vtDark: 'vitesse-dark',
        },
        defaultColor: 'light',
        // One Dark Pro ships two palettes and Shiki bundles only the first.
        // These four are the Vivid scheme's values for the same token roles,
        // which is what the editor beside this site is set to: a brighter red
        // and purple, a slightly cooler green and cyan. Blue, yellow, orange
        // and the foreground are identical in both and are not listed.
        colorReplacements: {
          'one-dark-pro': {
            '#e06c75': '#ef596f',
            '#c678dd': '#d55fde',
            '#98c379': '#89ca78',
            '#56b6c2': '#2bbac5',
          },
            // Vitesse paints its string-escape token with an eight-digit hex,
            // so the color carries alpha and the token lands at 47% opacity.
            // Inside a sentence that is a fragment of body text rendered
            // nearly transparent. Same color, full strength.
            'vitesse-light': { '#b5695977': '#b56959' },
            'vitesse-dark': { '#c98a7d77': '#c98a7d' },
        },
        structure: 'inline',
      })
      // Parse shiki's HTML into HAST and replace the code element's
      // children with the parsed span tree. Round-tripping through a
      // `data-highlighted` attribute double-encoded `<` chars and broke
      // any code sample that contained literal `<` (HTML, JSX, Vue).
      const fragment = fromHtml(highlightedHtml, { fragment: true })
      codeNode.children = fragment.children as ElementContent[]
    })
  }
}

// Display names for the code-block header bar.
const LANGUAGE_NAMES: Record<string, string> = {
  js: 'JavaScript', jsx: 'JavaScript', javascript: 'JavaScript',
  ts: 'TypeScript', tsx: 'TypeScript', typescript: 'TypeScript',
  json: 'JSON', jsonc: 'JSON', yaml: 'YAML', toml: 'TOML', ini: 'INI',
  html: 'HTML', xml: 'XML', css: 'CSS', scss: 'SCSS', md: 'Markdown', mdx: 'MDX',
  bash: 'Shell', sh: 'Shell', shell: 'Shell', powershell: 'PowerShell',
  python: 'Python', rust: 'Rust', go: 'Go', csharp: 'C#', cs: 'C#',
  java: 'Java', kotlin: 'Kotlin', swift: 'Swift', php: 'PHP', ruby: 'Ruby',
  sql: 'SQL', astro: 'Astro', svelte: 'Svelte', vue: 'Vue',
  dockerfile: 'Dockerfile', diff: 'Diff', txt: 'Code', plaintext: 'Code',
}

function rehypeWrapCodeBlocks() {
  return (tree: Root) => {
    // Collect all pre elements that need wrapping
    const nodesToWrap: Array<{ node: Element; parent: any; index: number }> = []
    
    visit(tree, 'element', (node: Element, index, parent: any) => {
      if (
        node.tagName === 'pre' &&
        parent &&
        index !== null &&
        // Only wrap standalone code blocks. Skip pre's inside a JSX component
        // (e.g. the `::code-group` <CodeGroup>, type 'mdxJsxFlowElement'), which
        // owns its own chrome — wrapping them would nest two containers. Root- and
        // element-parented pre's are the standalone ones we want to wrap.
        parent.type !== 'mdxJsxFlowElement' &&
        parent.type !== 'mdxJsxTextElement' &&
        // Check that parent is not already a code wrapper div
        !(parent.tagName === 'div' && Array.isArray(parent.properties?.className) && parent.properties.className.includes('my-6'))
      ) {
        nodesToWrap.push({ node, parent, index })
      }
    })

    // Wrap each pre element (in reverse order to maintain correct indices)
    for (let i = nodesToWrap.length - 1; i >= 0; i--) {
      const { node, parent, index } = nodesToWrap[i]
      const dataTitle = node.properties?.['data-title'] as string | undefined
      const code = (node.properties?.['data-code-raw'] as string | undefined) ?? (node.properties?.code as string | undefined)
      const lang = (node.properties?.['data-language'] as string | undefined)?.toLowerCase() ?? 'txt'
      // Header label: explicit title wins, else the language display name.
      // Plain text has neither a language to name nor a file to point at, so
      // an untitled txt block gets no header bar at all rather than one
      // reading "Code" over something that is not code.
      const isPlainText = lang === 'txt' || lang === 'plaintext' || lang === 'text'
      const headerLabel = dataTitle || (isPlainText ? '' : LANGUAGE_NAMES[lang] || lang.toUpperCase())

      // Create wrapper structure — theme-aware (One Light / One Dark Pro).
      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['my-6', 'overflow-hidden', 'rounded-2xl', 'bg-zinc-200', 'ring-1', 'ring-zinc-300', 'shadow-md', 'dark:bg-zinc-900', 'dark:ring-white/10'],
        },
        children: [{
          type: 'element',
          tagName: 'div',
          properties: { className: ['not-prose'] },
          children: []
        }]
      }

      const notProseDiv = wrapper.children[0] as Element

      // Header bar, when there is a filename/title or a language to name.
      if (headerLabel) {
        notProseDiv.children.push({
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['flex', 'items-center', 'gap-2', 'border-b', 'border-zinc-400', 'bg-zinc-300', 'px-5', 'py-2.5', 'dark:border-white/10', 'dark:bg-white/2.5'],
          },
          children: [{
            type: 'element',
            tagName: 'span',
            properties: { className: ['font-mono', 'text-xs', 'text-zinc-500', 'dark:text-zinc-400'] },
            children: [{ type: 'text', value: headerLabel }]
          }]
        })
      }

      // Add code block with copy button
      notProseDiv.children.push({
        type: 'element',
        tagName: 'div',
        properties: { className: ['group', 'dark:bg-white/2.5'] },
        children: [{
          type: 'element',
          tagName: 'div',
          properties: { className: ['relative'] },
          children: [
            {
              type: 'element',
              tagName: 'div',
              // Padding is forced here via the child combinator because the
              // pre's own className does not survive the Astro MDX `pre`
              // component override.
              properties: { className: ['[&>pre]:!m-0', '[&>pre]:!border-0', '[&>pre]:!px-5', '[&>pre]:!py-4', '[&>pre]:!leading-relaxed'] },
              children: [node]
            },
            {
              type: 'element',
              tagName: 'button',
              properties: {
                type: 'button',
                className: ['group/button', 'absolute', 'top-3', 'right-3', 'overflow-hidden', 'rounded-lg', 'py-1', 'pl-2', 'pr-3', 'text-2xs', 'font-medium', 'opacity-0', 'backdrop-blur', 'transition', 'focus:opacity-100', 'group-hover:opacity-100', 'bg-zinc-900/5', 'hover:bg-zinc-900/10', 'ring-1', 'ring-zinc-900/10', 'dark:bg-white/5', 'dark:hover:bg-white/10', 'dark:ring-white/10'],
                'data-code': code || '',
              },
              children: [{
                type: 'element',
                tagName: 'span',
                properties: {
                  'aria-hidden': 'true',
                  className: ['pointer-events-none', 'flex', 'items-center', 'gap-0.5', 'text-zinc-400', 'transition', 'duration-300'],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'svg',
                    properties: {
                      viewBox: '0 0 20 20',
                      'aria-hidden': 'true',
                      className: ['h-5', 'w-5', 'fill-zinc-500/20', 'stroke-zinc-500', 'transition-colors', 'group-hover/button:stroke-zinc-400'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'path',
                        properties: {
                          'stroke-width': '0',
                          d: 'M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z',
                        },
                        children: [],
                      },
                      {
                        type: 'element',
                        tagName: 'path',
                        properties: {
                          fill: 'none',
                          'stroke-linecap': 'round',
                          'stroke-linejoin': 'round',
                          d: 'M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1',
                        },
                        children: [],
                      },
                    ],
                  },
                  { type: 'text', value: 'Copy' },
                ],
              }]
            },
          ]
        }]
      })

      // Replace the pre element with the wrapper
      parent.children[index] = wrapper
    }
  }
}

// Stamp every <td> with `data-label="<header text>"` so the CSS in
// global.css can stack each row as a key/value list on narrow viewports
// instead of horizontally scrolling a 5-column table off the side of a
// phone screen.
function rehypeTableLabels() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'table') return
      const headers: string[] = []
      visit(node, 'element', (cell: Element) => {
        if (cell.tagName === 'th') headers.push(toString(cell).trim())
      })
      if (headers.length === 0) return
      visit(node, 'element', (row: Element) => {
        if (row.tagName !== 'tr') return
        let col = 0
        for (const child of row.children) {
          if (child.type !== 'element' || child.tagName !== 'td') continue
          const label = headers[col]
          if (label) {
            child.properties = child.properties || {}
            child.properties['data-label'] = label
          }
          col++
        }
      })
    })
  }
}

function rehypeSlugify() {
  return (tree: Root) => {
    const slugify = slugifyWithCounter()
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'h2') {
        node.properties = node.properties || {}
        if (!node.properties.id) {
          node.properties.id = slugify(toString(node))
        }
      }
    })
  }
}

function getSections(node: any): string[] {
  const sections: string[] = []

  for (const child of node.children ?? []) {
    if (child.type === 'element' && child.tagName === 'h2') {
      const annotation = child.properties?.annotation || '{}'
      sections.push(`{
        title: ${JSON.stringify(toString(child))},
        id: ${JSON.stringify(child.properties?.id)},
        ...${annotation}
      }`)
    } else if (child.children) {
      sections.push(...getSections(child))
    }
  }

  return sections
}

function rehypeAddMDXExports(getExports: (tree: any) => Record<string, string>) {
  return (tree: any) => {
    const exports = Object.entries(getExports(tree))

    for (const [name, value] of exports) {
      // Check if export already exists
      for (const node of tree.children) {
        if (
          node.type === 'mdxjsEsm' &&
          new RegExp(`export\\s+const\\s+${name}\\s*=`).test(node.value)
        ) {
          return
        }
      }

      // Add export
      const exportStr = `export const ${name} = ${value}`
      tree.children.push({
        type: 'mdxjsEsm',
        value: exportStr,
        data: {
          estree: acorn.parse(exportStr, {
            sourceType: 'module',
            ecmaVersion: 'latest',
          }),
        },
      })
    }
  }
}

const PLAYER_EXAMPLE_IMPORT = "import { PlayerExample } from '@/components/PlayerExample';"

// `remarkSnippet` (remark-snippet.ts) emits `<PlayerExample client:load>` for
// every `:::snippet` directive, but `client:load` only hydrates a component
// Astro's MDX compiler can trace to a real module — `PlayerExample` is
// normally reached only through the `components={mdxComponents}` prop on
// `<Content>` (see `src/components/protocol/index.tsx`), which isn't
// statically resolvable and fails the build ("No matching import has been
// found for `PlayerExample`"). That resolution check runs at the HAST stage
// (`rehypeAnalyzeAstroMetadata`, registered by @astrojs/mdx after this
// site's own rehype plugins), so the import has to be injected here, as a
// real `mdxjsEsm` node — a plain remark-stage insert doesn't survive far
// enough. A local import binding also takes precedence over the
// `components` prop for this one tag, so this doesn't create two competing
// definitions of `PlayerExample`.
function rehypeSnippetPlayerImport() {
  return (tree: any) => {
    let usesPlayerExample = false
    visit(tree, (node: any) => {
      if (
        (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
        node.name === 'PlayerExample'
      ) {
        usesPlayerExample = true
      }
    })
    if (!usesPlayerExample) return

    const alreadyImported = tree.children.some(
      (node: any) => node.type === 'mdxjsEsm' && node.value === PLAYER_EXAMPLE_IMPORT,
    )
    if (alreadyImported) return

    tree.children.unshift({
      type: 'mdxjsEsm',
      value: PLAYER_EXAMPLE_IMPORT,
      data: {
        estree: acorn.parse(PLAYER_EXAMPLE_IMPORT, {
          sourceType: 'module',
          ecmaVersion: 'latest',
        }),
      },
    })
  }
}

// rehypeWrapCodeBlocks owns the code-block chrome (rounded/ringed container,
// optional title header, and the copy button wired by CodeHighlighter via
// `data-code`). It runs at HAST level so the chrome is static HTML and works
// without hydrating a React component per block. The React `Pre` mapping is a
// pass-through (Code.tsx) so the chrome is emitted exactly once — no box-in-box.
// It skips pre's inside a <CodeGroup> (guard above), which renders its own tabs.

// Inline code may wrap at its spaces, but a browser also breaks after a
// hyphen or a slash, which split `nomercy-music-player` across two lines.
// Each word gets `data-word` (nowrap in global.css) so it stays whole, and a
// token's edge spaces move out of its colored span so the line can break
// there. A word longer than a phone line is left breakable: a whole URL
// pushed past the screen is worse than a URL split at a slash.
const WORD_MAX = 30

function rehypeInlineWords() {
  return (tree: Root) => {
    visit(tree, 'element', (code: Element, _index, parent) => {
      if (code.tagName !== 'code' || (parent as Element | undefined)?.tagName === 'pre') return
      const text = toString(code)
      if (!/\s/.test(text.trim())) {
        if (text.trim().length <= WORD_MAX) code.properties = { ...code.properties, dataWord: '' }
        return
      }
      const out: ElementContent[] = []
      for (const child of code.children as ElementContent[]) {
        const only = child.type === 'element' && child.children.length === 1 ? child.children[0] : undefined
        if (child.type !== 'element' || only?.type !== 'text') {
          out.push(child)
          continue
        }
        const inner = only.value
        const lead = /^\s*/.exec(inner)![0]
        const trail = inner.length > lead.length ? /\s*$/.exec(inner)![0] : ''
        const core = inner.slice(lead.length, inner.length - trail.length)
        if (lead) out.push({ type: 'text', value: lead })
        if (core) {
          only.value = core
          if (!/\s/.test(core) && core.length <= WORD_MAX) child.properties = { ...child.properties, dataWord: '' }
          out.push(child)
        }
        if (trail) out.push({ type: 'text', value: trail })
      }
      code.children = out
    })
  }
}

// A step sequence in prose (`beforeSeek` → `seek` → `seeked`, or a menu path
// like Settings → Privacy) was a bare arrow glyph in body text, set in the
// text face and sitting off the code tags' baseline. Each prose arrow becomes
// one small chevron in the muted color, and a screen reader hears "then".
const SEQ_ARROW = /\s*(?:→|->)\s*/

function sequenceSeparator(): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: ['seq-sep'] },
    children: [
      {
        type: 'element',
        tagName: 'svg',
        properties: { viewBox: '0 0 16 16', ariaHidden: 'true', fill: 'none' },
        children: [{
          type: 'element',
          tagName: 'path',
          properties: { d: 'M6 3.5 10.5 8 6 12.5', stroke: 'currentColor', strokeWidth: '1.75', strokeLinecap: 'round', strokeLinejoin: 'round' },
          children: [],
        }],
      },
      { type: 'element', tagName: 'span', properties: { className: ['sr-only'] }, children: [{ type: 'text', value: ' then ' }] },
    ],
  }
}

function rehypeSequences() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      // Only prose: an arrow inside code, a code block or a heading stays as written.
      if (node.type === 'element' && /^(code|pre|h[1-6])$/.test((node as Element).tagName)) return SKIP
      if (node.type !== 'text' || !parent || index === undefined || !SEQ_ARROW.test(node.value)) return
      if (!('tagName' in parent)) return
      const parts = node.value.split(SEQ_ARROW)
      const out: ElementContent[] = []
      parts.forEach((part, i) => {
        if (i > 0) out.push(sequenceSeparator())
        if (part) out.push({ type: 'text', value: part })
      })
      ;(parent as Element).children.splice(index, 1, ...out)
      return index + out.length
    })
  }
}

// With the reader's "Wrap long code lines" on, a wrapped line started again at
// the left edge, so `player.duration());` looked like a new statement outside
// its block. Each line becomes one `span.line` carrying its indent width, and
// global.css hangs the wrapped part two columns past that indent. With wrap off
// the spans are plain inline boxes and change nothing.
const TAB_WIDTH = 4

function rehypeCodeLines() {
  return (tree: Root) => {
    visit(tree, 'element', (pre: Element) => {
      if (pre.tagName !== 'pre') return
      const code = pre.children.find((c): c is Element => c.type === 'element' && c.tagName === 'code')
      if (!code) return
      // Shiki's inline structure ends each line with a <br>.
      const lines: ElementContent[][] = [[]]
      for (const child of code.children as ElementContent[]) {
        if (child.type === 'element' && child.tagName === 'br') lines.push([])
        else lines[lines.length - 1]!.push(child)
      }
      if (lines.length === 1) return
      const out: ElementContent[] = []
      lines.forEach((line, i) => {
        if (i > 0) out.push({ type: 'element', tagName: 'br', properties: {}, children: [] })
        if (line.length === 0) return
        const text = line.map(n => toString(n as Element)).join('')
        const lead = /^[ \t]*/.exec(text)![0]
        const indent = [...lead].reduce((n, ch) => n + (ch === '\t' ? TAB_WIDTH : 1), 0)
        out.push({
          type: 'element',
          tagName: 'span',
          properties: { className: ['line'], style: `--indent:${indent}` },
          children: line,
        })
      })
      code.children = out
    })
  }
}

export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeParseCodeBlocks,
  rehypeShiki,
  rehypeCodeLines,
  rehypeInlineWords,
  rehypeSequences,
  rehypeWrapCodeBlocks,
  rehypeTableLabels,
  rehypeSlugify,
  rehypeSnippetPlayerImport,
  [
    rehypeAddMDXExports,
    (tree: any) => ({
      sections: `[${getSections(tree).join(',')}]`,
    }),
  ],
]
