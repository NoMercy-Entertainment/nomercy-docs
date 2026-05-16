import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

/**
 * Remark plugin: strip orphaned directive-closer paragraphs.
 *
 * Several remark plugins in this site (Hero, Button, Callout, etc.)
 * consume an opening `::Foo` line and emit a JSX flow element with no
 * children — they do NOT walk the content between `::Foo` and the
 * matching `::`. That leaves the trailing closer as a literal paragraph
 * that renders as visible `::` text.
 *
 * Run this plugin LAST so it sees the cleanup work all directive
 * plugins left behind. Any paragraph whose entire content is `::` or
 * `::end` gets removed.
 */
export function remarkCleanup() {
    return (tree: Root) => {
        const removals: { parent: any; index: number }[] = [];

        visit(tree, 'paragraph', (node: any, index, parent) => {
            if (!parent || typeof index !== 'number') return;
            if (!node.children || node.children.length !== 1) return;
            const child = node.children[0];
            if (child.type !== 'text') return;
            const text = (child.value || '').trim();
            if (text === '::' || text === '::end') {
                removals.push({ parent, index });
            }
        });

        // Reverse-sort so removing earlier indices doesn't shift later ones.
        removals.sort((a, b) => b.index - a.index);
        for (const { parent, index } of removals) {
            parent.children.splice(index, 1);
        }
    };
}
