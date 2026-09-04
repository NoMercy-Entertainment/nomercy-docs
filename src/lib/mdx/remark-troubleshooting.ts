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

function isStart(text: string): boolean {
  const t = text.trim();
  return t === '::Troubleshooting' || t === '::troubleshooting';
}

function isDirectiveEnd(text: string): boolean {
  const t = text.trim();
  return t === '::' || t === '::end';
}

/**
 * Remark plugin: Troubleshooting directive
 *
 * Usage:
 * ::Troubleshooting
 *
 * **Symptom in bold.**
 * What to do about it.
 *
 * ::
 *
 * Replaces with the Troubleshooting component containing the content as children.
 */
export function remarkTroubleshooting() {
  return (tree: Root) => {
    const replacements: { parent: any; start: number; end: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      if (!isStart(getParagraphText(node))) return;

      let endIdx = -1;
      for (let i = index + 1; i < parent.children.length; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph' && isDirectiveEnd(getParagraphText(sib))) {
          endIdx = i;
          break;
        }
      }
      if (endIdx < 0) return;

      const contentChildren: any[] = [];
      for (let i = index + 1; i < endIdx; i++) {
        contentChildren.push(parent.children[i]);
      }

      replacements.push({
        parent,
        start: index,
        end: endIdx,
        node: {
          type: 'mdxJsxFlowElement',
          name: 'Troubleshooting',
          attributes: [],
          children: contentChildren,
          data: { _mdxExplicitJsx: true },
        },
      });
    });

    // Splice from the end so earlier indices stay valid.
    for (const r of replacements.reverse()) {
      r.parent.children.splice(r.start, r.end - r.start + 1, r.node);
    }
  };
}
