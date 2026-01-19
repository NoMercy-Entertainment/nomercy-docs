import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

function getParagraphText(node: { children?: { type?: string; value?: string }[] }): string {
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

function isRowStart(text: string): boolean {
  const t = text.trim();
  return t === '::row';
}

function isDirectiveEnd(text: string): boolean {
  const t = text.trim();
  // Generic end marker, but NOT another directive start
  if (t === '::' || t === '::end') return true;
  return false;
}

function isAnyDirectiveStart(text: string): boolean {
  const t = text.trim();
  // Check if this is any known directive start (not just :: end marker)
  if (t.startsWith('::row')) return true;
  if (t.startsWith('::col')) return true;
  if (t.startsWith('::properties')) return true;
  if (t.startsWith('::property')) return true;
  if (t.startsWith('::button')) return true;
  if (t.startsWith('::icon')) return true;
  if (t.startsWith('::code-group')) return true;
  if (t.startsWith('::note')) return true;
  return false;
}

function parseColDirective(text: string): { isCol: boolean; sticky: boolean } {
  const t = text.trim();
  if (!t.startsWith('::col')) return { isCol: false, sticky: false };
  const rest = t.slice(5).trim();
  // ::col, ::col sticky, ::col {{ sticky }}, ::col {{ sticky: 'true' }}
  const sticky = /^sticky$/i.test(rest) || /\{\{[\s\S]*?sticky[\s\S]*?\}\}/.test(rest);
  return { isCol: true, sticky };
}

/**
 * Remark plugin: row/col block directives
 *
 *  ::row
 *  ::col
 *  ... block content (MDX, paragraphs, code, etc.) ...
 *  ::col sticky
 *  ... or ::col {{ sticky }} ...
 *  ... more content ...
 *  ::
 *
 * Replaces these with <Row><Col>...</Col><Col sticky>...</Col></Row>.
 */
export function remarkRowCol() {
  return (tree: Root) => {
    const replacements: { parent: any; start: number; end: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const text = getParagraphText(node);
      if (!isRowStart(text)) return;

      // Find closing :: among following siblings (skip nested directive starts)
      // Count nesting level - we need to find the :: at our level
      let endIdx = -1;
      let nestLevel = 0;
      
      for (let i = index + 1; i < parent.children.length; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph') {
          const sibText = getParagraphText(sib);
          
          // Skip ::col markers as they're part of our structure
          if (parseColDirective(sibText).isCol) continue;
          
          // Check for nested directives that also use :: as end marker
          if (sibText.trim() === '::properties' || sibText.trim() === '::code-group') {
            nestLevel++;
            continue;
          }
          
          // Check for end marker
          if (isDirectiveEnd(sibText)) {
            if (nestLevel > 0) {
              nestLevel--;
              continue;
            }
            endIdx = i;
            break;
          }
        }
      }
      if (endIdx < 0) return;

      // Find all ::col / ::col sticky in (index+1, endIdx)
      const colMarkers: { idx: number; sticky: boolean }[] = [];
      for (let i = index + 1; i < endIdx; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph') {
          const parsed = parseColDirective(getParagraphText(sib));
          if (parsed.isCol) colMarkers.push({ idx: i, sticky: parsed.sticky });
        }
      }

      // Build Cols: content between col markers (and between ::row and first ::col, or last ::col and ::)
      const colChildren: { sticky: boolean; blocks: any[] }[] = [];

      if (colMarkers.length === 0) {
        // No ::col; optional: one Col with all content. We'll emit Row with no Cols.
      } else {
        for (let c = 0; c < colMarkers.length; c++) {
          const start = colMarkers[c].idx + 1;
          const stop = c + 1 < colMarkers.length ? colMarkers[c + 1].idx : endIdx;
          const blocks: any[] = [];
          for (let i = start; i < stop; i++) {
            const n = parent.children[i];
            if (n?.type === 'paragraph') {
              const pt = getParagraphText(n);
              if (parseColDirective(pt).isCol) continue; // skip any ::col line that we might have missed
            }
            blocks.push(n);
          }
          colChildren.push({ sticky: colMarkers[c].sticky, blocks });
        }
      }

      const colElements = colChildren.map(({ sticky, blocks }) => ({
        type: 'mdxJsxFlowElement',
        name: 'Col',
        attributes: sticky
          ? [{ type: 'mdxJsxAttribute', name: 'sticky', value: null }]
          : [],
        children: blocks,
      }));

      const rowElement: any = {
        type: 'mdxJsxFlowElement',
        name: 'Row',
        attributes: [],
        children: colElements,
      };

      replacements.push({ parent, start: index, end: endIdx, node: rowElement });
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
