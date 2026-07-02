import { slugifyWithCounter } from '@sindresorhus/slugify';
import * as acorn from 'acorn';
import { fromHtml } from 'hast-util-from-html';
import { toString } from 'hast-util-to-string';
import { mdxAnnotations } from 'mdx-annotations';
import * as shiki from 'shiki';
import { visit } from 'unist-util-visit';
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
  'txt', 'plaintext', 'bash', 'sh', 'shell', 'powershell',
  'js', 'jsx', 'ts', 'tsx', 'json', 'jsonc', 'yaml', 'toml',
  'html', 'xml', 'css', 'scss', 'md', 'mdx',
  'python', 'rust', 'go', 'csharp', 'cs', 'java', 'kotlin', 'swift',
  'php', 'ruby', 'sql', 'astro', 'svelte', 'vue', 'dockerfile', 'diff', 'ini',
]

const HIGHLIGHTER_KEY = Symbol.for('nomercy-docs.shiki-highlighter')
type HighlighterPromise = Promise<shiki.HighlighterGeneric<any, any>>

function getHighlighter(): HighlighterPromise {
  const g = globalThis as unknown as Record<symbol, HighlighterPromise | undefined>
  let cached = g[HIGHLIGHTER_KEY]
  if (!cached) {
    cached = shiki.createHighlighter({
      themes: ['one-light', 'one-dark-pro'],
      langs: LANGS,
    })
    g[HIGHLIGHTER_KEY] = cached
  }
  return cached
}

function rehypeShiki() {
  return async (tree: Root) => {
    const highlighter = await getHighlighter()

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
        themes: { light: 'one-light', dark: 'one-dark-pro' },
        defaultColor: 'light',
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
      const headerLabel = dataTitle || LANGUAGE_NAMES[lang] || lang.toUpperCase() || 'Code'

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

      // Always show a header bar with the filename/title or language name.
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

export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeParseCodeBlocks,
  rehypeShiki,
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
