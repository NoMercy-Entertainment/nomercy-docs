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

function isCalloutStart(text: string): boolean {
  const t = text.trim();
  return t === '::Callout' || t === '::callout';
}

function isDirectiveEnd(text: string): boolean {
  const t = text.trim();
  return t === '::' || t === '::end';
}

/**
 * Remark plugin: Callout directive
 *
 * Usage:
 * ::Callout
 *
 * Your callout content here. Can span multiple paragraphs.
 *
 * ::
 *
 * Replaces with the Callout component containing the content as children.
 */
export function remarkCallout() {
  return (tree: Root) => {
    const replacements: { parent: any; start: number; end: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const text = getParagraphText(node);
      if (!isCalloutStart(text)) return;

      // Find closing :: among following siblings
      let endIdx = -1;
      for (let i = index + 1; i < parent.children.length; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph') {
          const sibText = getParagraphText(sib);
          if (isDirectiveEnd(sibText)) {
            endIdx = i;
            break;
          }
        }
      }
      if (endIdx < 0) return;

      // Collect all children between start and end
      const contentChildren: any[] = [];
      for (let i = index + 1; i < endIdx; i++) {
        contentChildren.push(parent.children[i]);
      }

      const calloutElement: any = {
        type: 'mdxJsxFlowElement',
        name: 'Callout',
        attributes: [],
        children: contentChildren,
      };

      replacements.push({ parent, start: index, end: endIdx, node: calloutElement });
    });

    // Apply in reverse order so indices remain valid
    replacements.sort((a, b) => b.start - a.start);
    for (const { parent, start, end, node } of replacements) {
      parent.children.splice(start, end - start + 1, node);
    }
  };
}
