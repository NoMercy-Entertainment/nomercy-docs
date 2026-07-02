// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const examplesDir = path.resolve(currentDir, '../../examples');

const DIRECTIVE_NODE_TYPES = ['containerDirective', 'leafDirective'] as const;

/**
 * Remark plugin: snippet directive
 *
 * :::snippet{file="quickstart"}
 * :::
 *
 * Reads `src/examples/<file>.ts` at build time and replaces the directive
 * with a fenced `ts` code block holding that file's exact source, followed
 * by a live `<PlayerExample>` island bound to the same file. The rendered
 * code block and the mounted player both come from the same tested source
 * file, so the docs can never drift from working code — a rename or
 * deletion of the example file fails the build instead of silently going
 * stale.
 *
 * Parsed by `remark-directive` (registered in `remark.ts`), which claims
 * `:::name{attrs}` syntax at the micromark level before MDX's own
 * curly-brace expression tokenizer can misread `{file="quickstart"}` as a
 * JS assignment. `:::snippet` has no body content, so an unclosed opening
 * fence at the end of a document is harmless (the container simply has no
 * children) — but mid-document it would silently swallow every following
 * block as this directive's children, so a non-empty `children` array is
 * treated as a build error instead of being dropped.
 *
 * `PlayerExample` needs `client:load` to ever hydrate (see
 * `rehypeSnippetPlayerImport` in `rehype.ts`, which supplies the real
 * import that directive requires) — this plugin only emits the marker
 * attribute; the import itself has to be added once the tree is HAST, not
 * here, or Astro's MDX compiler can't trace it back to a module.
 */
export function remarkSnippet() {
  return (tree: Root) => {
    const replacements: { parent: any; index: number; nodes: any[] }[] = [];

    visit(
      tree,
      (node: any) => DIRECTIVE_NODE_TYPES.includes(node.type),
      (node: any, index, parent) => {
        if (!parent || typeof index !== 'number' || node.name !== 'snippet') return;

        const file = node.attributes?.file;
        if (!file) {
          throw new Error(':::snippet directive is missing its required `file` attribute.');
        }
        if (node.children?.length) {
          throw new Error(
            `:::snippet{file="${file}"} has body content — it must be closed immediately ` +
              '(":::snippet{file=\\"...\\"}" then ":::" on the next line) so trailing content ' +
              "isn't silently absorbed into the directive.",
          );
        }

        const source = readFileSync(path.join(examplesDir, `${file}.ts`), 'utf8');
        // A fenced code block's content never includes the file's own trailing
        // EOF newline (the closing fence itself delimits the block) — strip
        // exactly one so the rendered block matches every hand-authored fence
        // in this repo, not the file's own trailing blank line.
        const codeValue = source.endsWith('\n') ? source.slice(0, -1) : source;

        const codeNode: any = { type: 'code', lang: 'ts', value: codeValue };
        const playerElement: any = {
          type: 'mdxJsxFlowElement',
          name: 'PlayerExample',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'snippet', value: file },
            { type: 'mdxJsxAttribute', name: 'client:load', value: null },
          ],
          children: [],
        };

        replacements.push({ parent, index, nodes: [codeNode, playerElement] });
      },
    );

    // Apply in reverse order so earlier indices stay valid.
    replacements.sort((a, b) => b.index - a.index);
    for (const { parent, index, nodes } of replacements) {
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
