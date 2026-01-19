import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

function getParagraphText(node: any): string {
  if (!node?.children) return '';
  return node.children
    .map((c: any) => {
      if (c.type === 'text') return c.value || '';
      if (c.type === 'mdxTextExpression') return `{{ ${c.value || ''} }}`;
      return '';
    })
    .join('')
    .trim();
}

function isCodeGroupStart(text: string): boolean {
  const t = text.trim();
  return t === '::code-group' || t.startsWith('::code-group ');
}

function isDirectiveEnd(text: string): boolean {
  const t = text.trim();
  return t === '::' || t === '::end';
}

function getAnnotationData(node: any): Record<string, any> {
  const annotation = node?.data?._mdxAnnotation || node?.data?.hProperties?.annotation;
  if (annotation) {
    if (typeof annotation === 'object') return annotation;
    if (typeof annotation === 'string') {
      try {
        const parsed = new Function(`return ${annotation}`)();
        if (typeof parsed === 'object') return parsed;
      } catch {
        // ignore parse errors
      }
    }
  }
  return {};
}

function parseAttributes(text: string): Record<string, string> {
  const pairs: Record<string, string> = {};
  const braceRe = /\{\{\s*([\s\S]*?)\s*\}\}/g;
  let braceMatch;
  while ((braceMatch = braceRe.exec(text)) !== null) {
    const inner = braceMatch[1];
    const pairRe = /(\w+)\s*:\s*['"]([^'"]*)['"]/g;
    let m;
    while ((m = pairRe.exec(inner)) !== null) pairs[m[1]] = m[2];
  }
  return pairs;
}

/**
 * Remark plugin: code-group directive
 *
 * ::code-group {{ title: 'Request', tag: 'GET', label: '/v1/contacts' }}
 *
 * ```bash {{ title: 'cURL' }}
 * curl -G https://api.protocol.chat/v1/contacts
 * ```
 *
 * ```js
 * import ApiClient from '@example/protocol-api'
 * ```
 *
 * ::
 *
 * Replaces with CodeGroup component containing the code blocks.
 */
export function remarkCodeGroup() {
  return (tree: Root) => {
    const replacements: { parent: any; start: number; end: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const text = getParagraphText(node);
      if (!isCodeGroupStart(text)) return;

      // Find closing :: among following siblings
      let endIdx = -1;
      for (let i = index + 1; i < parent.children.length; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph' && isDirectiveEnd(getParagraphText(sib))) {
          endIdx = i;
          break;
        }
      }
      if (endIdx < 0) return;

      // Get attributes from annotation and text
      const annotationData = getAnnotationData(node);
      const textAttrs = parseAttributes(text);
      const attrs = { ...textAttrs, ...annotationData };

      // Collect all code blocks between start and end
      const codeBlocks: any[] = [];
      for (let i = index + 1; i < endIdx; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'code') {
          codeBlocks.push(sib);
        }
      }

      // Build CodeGroup element attributes
      const codeGroupAttrs: any[] = [];
      if (attrs.title) {
        codeGroupAttrs.push({ type: 'mdxJsxAttribute', name: 'title', value: attrs.title });
      }
      if (attrs.tag) {
        codeGroupAttrs.push({ type: 'mdxJsxAttribute', name: 'tag', value: attrs.tag });
      }
      if (attrs.label) {
        codeGroupAttrs.push({ type: 'mdxJsxAttribute', name: 'label', value: attrs.label });
      }

      const codeGroupElement: any = {
        type: 'mdxJsxFlowElement',
        name: 'CodeGroup',
        attributes: codeGroupAttrs,
        children: codeBlocks,
      };

      replacements.push({ parent, start: index, end: endIdx, node: codeGroupElement });
    });

    // Apply in reverse order by start index so indices remain valid
    replacements.sort((a, b) => {
      if (a.parent !== b.parent) return 0;
      return b.start - a.start;
    });
    for (const { parent, start, end, node } of replacements) {
      parent.children.splice(start, end - start + 1, node);
    }
  };
}
