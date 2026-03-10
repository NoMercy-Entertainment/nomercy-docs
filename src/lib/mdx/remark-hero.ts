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

function isHeroDirective(text: string): boolean {
  const t = text.trim();
  return t === '::Hero' || t === '::hero';
}

/**
 * Remark plugin: Hero directive
 *
 * Usage:
 * ::Hero
 *
 * Replaces with the Hero component.
 */
export function remarkHero() {
  return (tree: Root) => {
    const replacements: { parent: any; index: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const text = getParagraphText(node);
      if (!isHeroDirective(text)) return;

      const heroElement: any = {
        type: 'mdxJsxFlowElement',
        name: 'Hero',
        attributes: [],
        children: [],
      };

      replacements.push({ parent, index, node: heroElement });
    });

    // Apply in reverse order so indices remain valid
    replacements.sort((a, b) => b.index - a.index);
    for (const { parent, index, node } of replacements) {
      parent.children.splice(index, 1, node);
    }
  };
}
