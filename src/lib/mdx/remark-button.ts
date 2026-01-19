import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

function pick<T>(obj: Record<string, T>, key: string, alt?: string): T | undefined {
  if (obj[key] != null) return obj[key];
  if (alt && obj[alt] != null) return obj[alt];
  return undefined;
}

function getParagraphText(node: any): string {
  if (!node?.children) return '';
  // Handle both text nodes and mdxTextExpression nodes (for {{ ... }})
  return node.children
    .map((c: any) => {
      if (c.type === 'text') return c.value || '';
      if (c.type === 'mdxTextExpression') return `{{ ${c.value || ''} }}`;
      return '';
    })
    .join('')
    .trim();
}

function isButtonStart(text: string): boolean {
  const t = text.trim();
  return t === '::button' || t.startsWith('::button ');
}

function isDirectiveEnd(text: string): boolean {
  const t = text.trim();
  return t === '::' || t === '::end';
}

/**
 * Parse ::icon directive
 * Supports: ::icon arrow-right, ::icon arrow-left, ::icon name
 */
function parseIconDirective(text: string): string | null {
  const t = text.trim();
  if (!t.startsWith('::icon')) return null;
  const iconName = t.slice(6).trim();
  return iconName || null;
}

function getAnnotationData(node: any): Record<string, any> {
  // mdx-annotations stores annotation data in node.data._mdxAnnotation during remark phase
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
 * Remark plugin: custom button directives
 *
 * ::button {{ url: '/path', variant: 'text' }}
 *
 * Label text here
 *
 * ::icon arrow-right
 *
 * ::
 *
 * Supported icons: arrow-right, arrow-left
 *
 * Replaces these with a Button component (href, variant, arrow).
 */
export function remarkButton() {
  return (tree: Root) => {
    const replacements: { parent: any; start: number; end: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const text = getParagraphText(node);
      if (!isButtonStart(text)) return;

      // Find closing :: among following siblings
      // Button blocks are simple - find the first :: that's not ::icon
      let endIdx = -1;
      for (let i = index + 1; i < parent.children.length; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph') {
          const sibText = getParagraphText(sib);
          
          // Skip ::icon directives (they're part of button)
          if (sibText.trim().startsWith('::icon')) continue;
          
          // Check for end marker
          if (isDirectiveEnd(sibText)) {
            endIdx = i;
            break;
          }
        }
      }
      if (endIdx < 0) return;

      // Get attributes from annotation (mdx-annotations parses {{ ... }} into annotation)
      const annotationData = getAnnotationData(node);
      
      // Collect text content between start and end for label, and look for ::icon
      const bodyParts: string[] = [];
      let iconName: string | null = null;
      
      for (let i = index + 1; i < endIdx; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph') {
          const sibText = getParagraphText(sib);
          
          // Check for ::icon directive
          const parsedIcon = parseIconDirective(sibText);
          if (parsedIcon) {
            iconName = parsedIcon;
            continue; // Don't add ::icon line to body parts
          }
          
          bodyParts.push(sibText);
          // Also check for annotations on body paragraphs (for additional attributes)
          const sibAnnotation = getAnnotationData(sib);
          Object.assign(annotationData, sibAnnotation);
        }
      }
      const bodyText = bodyParts.join('\n');

      // Also parse any {{ }} in the text content (fallback)
      const textPairs = parseAttributes(text + '\n' + bodyText);
      const pairs = { ...textPairs, ...annotationData };

      const attributes: Record<string, string> = {};
      const u = pick(pairs, 'url', 'href');
      if (!u) return; // url is required
      attributes.href = u;

      const v = pick(pairs, 'variant');
      if (v) attributes.variant = v;

      // Arrow from annotation/attributes
      const a = pick(pairs, 'arrow');
      if (a) attributes.arrow = a;

      // Icon from ::icon directive or {{ icon: '...' }}
      const icon = iconName || pick(pairs, 'icon');
      if (icon && !a) {
        if (icon === 'arrow-right') attributes.arrow = 'right';
        else if (icon === 'arrow-left') attributes.arrow = 'left';
      }

      // Get label: text or label attribute, or body stripped of {{ }} blocks
      const t = pick(pairs, 'text', 'label');
      let label: string;
      if (t) {
        label = t;
      } else {
        // Use body as label: strip all {{ }} blocks and ::icon lines, collapse newlines, trim
        label = bodyText
          .replace(/\{\{\s*[\s\S]*?\s*\}\}/g, '')
          .replace(/::icon\s+\S+/g, '')
          .replace(/\n+/g, ' ')
          .trim();
      }
      if (!label) return;

      const buttonElement: any = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: 'not-prose' }],
        children: [{
          type: 'mdxJsxFlowElement',
          name: 'Button',
          attributes: Object.entries(attributes).map(([k, v]) => ({
            type: 'mdxJsxAttribute',
            name: k,
            value: v,
          })),
          children: [{ type: 'text', value: label }],
        }],
      };

      replacements.push({ parent, start: index, end: endIdx, node: buttonElement });
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
