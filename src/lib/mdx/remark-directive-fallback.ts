import { SKIP, visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { VFile } from 'vfile';

/**
 * Remark plugin: hand every directive except `snippet` back as the text it was written as.
 *
 * `remark-directive` is in the chain for one directive, `:::snippet{file="..."}`. It parses
 * the whole directive syntax, though, so two other things stopped reaching the page:
 *
 * - A `::Name` line (`::Troubleshooting`, `::Callout`, `::row`, ...) became a `leafDirective`
 *   node. The block plugins in this folder match a *paragraph* whose text is `::Name`, so none
 *   of them fired and the page rendered an empty `<div>` with the content loose beneath it.
 * - A colon followed by a letter inside prose (`4:3`, `0:42`, `key:value`) became a
 *   `textDirective`, and the text after the colon disappeared from the sentence.
 *
 * Runs right after `remarkDirective`: each directive that is not a snippet is replaced by the
 * exact source slice it was parsed from, as a paragraph for a block and as plain text inline.
 * Everything downstream then sees the page as it was written.
 */
export function remarkDirectiveFallback() {
  return (tree: Root, file: VFile) => {
    const source = String(file.value);

    visit(tree, (node: any, index, parent: any) => {
      if (!/^(container|leaf|text)Directive$/.test(node.type) || node.name === 'snippet')
        return;
      if (!parent || typeof index !== 'number' || !node.position)
        return;

      const value = source.slice(node.position.start.offset, node.position.end.offset);
      const text = { type: 'text', value, position: node.position };
      parent.children[index] = node.type === 'textDirective'
        ? text
        : { type: 'paragraph', children: [text], position: node.position };

      return [SKIP, index + 1];
    });
  };
}
