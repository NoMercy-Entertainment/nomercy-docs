import { slugifyWithCounter } from '@sindresorhus/slugify';
import * as acorn from 'acorn';
import { toString } from 'hast-util-to-string';
import { mdxAnnotations } from 'mdx-annotations';
import * as shiki from 'shiki';
import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

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

let highlighter: shiki.Highlighter | null = null

function rehypeShiki() {
  return async (tree: Root) => {
    if (!highlighter) {
      highlighter = await shiki.getHighlighter({ theme: 'css-variables' })
    }

    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre' && node.children[0]?.type === 'element') {
        const codeNode = node.children[0] as Element
        if (codeNode.tagName === 'code' && codeNode.children[0]?.type === 'text') {
          const textNode = codeNode.children[0]

          // Preserve existing properties including data-title from remark
          node.properties = node.properties || {}
          const existingDataTitle = node.properties['data-title']
          
          // Store raw code on pre element (not as HTML attribute, just for internal use)
          node.properties.code = textNode.value

          // Replace the default classes with our custom ones
          node.properties.className = ['overflow-x-auto', 'p-4', 'text-xs', 'text-zinc-900', 'dark:text-white']
          
          // Remove any inline styles (especially background-color)
          delete node.properties.style
          delete node.properties.tabindex

          // Restore data-title if it was set by remark
          if (existingDataTitle) {
            node.properties['data-title'] = existingDataTitle
          }

          // Apply syntax highlighting using data-language (the actual code fence language)
          // Use 'txt' for custom blocks (button, btn) to avoid "No language registration" from Shiki
          let syntaxLanguage = node.properties['data-language'] as string | undefined
          const langLower = syntaxLanguage?.toLowerCase()
          if (langLower === 'button' || langLower === 'btn') {
            syntaxLanguage = 'txt'
          }
          if (syntaxLanguage && highlighter) {
            const tokens = highlighter.codeToThemedTokens(
              textNode.value as string,
              syntaxLanguage,
            )

            const highlightedHtml = shiki.renderToHtml(tokens, {
              elements: {
                pre: ({ children }) => children,
                code: ({ children }) => children,
                line: ({ children }) => `<span class="line">${children}</span>`,
              },
            })

            // Store the highlighted HTML as a data attribute for client-side rendering
            node.properties['data-highlighted'] = highlightedHtml
            
            // Keep the plain text in the code node for fallback
            textNode.value = textNode.value as string
          }
        }
      }
    })
  }
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
      const code = node.properties?.code as string | undefined

      // Create wrapper structure
      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['my-6', 'overflow-hidden', 'rounded-2xl', 'bg-zinc-50', 'ring-1', 'ring-zinc-200', 'shadow-md', 'dark:bg-zinc-900', 'dark:ring-white/10'],
        },
        children: [{
          type: 'element',
          tagName: 'div',
          properties: { className: ['not-prose'] },
          children: []
        }]
      }

      const notProseDiv = wrapper.children[0] as Element

      // Add title header if present
      if (dataTitle) {
        notProseDiv.children.push({
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['flex', 'min-h-[calc(--spacing(12)+1px)]', 'flex-wrap', 'items-start', 'gap-x-4', 'border-b', 'border-zinc-200', 'bg-zinc-100', 'px-4', 'dark:border-zinc-800', 'dark:bg-transparent'],
          },
          children: [{
            type: 'element',
            tagName: 'h3',
            properties: { className: ['mr-auto', 'pt-3', 'text-xs', 'font-semibold', 'text-zinc-700', 'dark:text-white'] },
            children: [{ type: 'text', value: dataTitle }]
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
              properties: { className: ['[&>pre]:!m-0', '[&>pre]:!border-0'] },
              children: [node]
            },
            {
              type: 'element',
              tagName: 'button',
              properties: {
                type: 'button',
                className: ['group/button', 'absolute', 'top-3.5', 'right-4', 'overflow-hidden', 'rounded-full', 'py-1', 'pl-2', 'pr-3', 'text-2xs', 'font-medium', 'opacity-0', 'backdrop-blur', 'transition', 'focus:opacity-100', 'group-hover:opacity-100', 'bg-zinc-900/5', 'hover:bg-zinc-900/10', 'dark:bg-white/5', 'dark:hover:bg-white/10'],
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

export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeParseCodeBlocks,
  rehypeShiki,
  rehypeWrapCodeBlocks,
  rehypeSlugify,
  [
    rehypeAddMDXExports,
    (tree: any) => ({
      sections: `[${getSections(tree).join(',')}]`,
    }),
  ],
]
