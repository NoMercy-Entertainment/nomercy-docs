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
 * `<PlayerExample>` always mounts the real `@nomercy-entertainment/nomercy-video-player`
 * factory — it has no generic "render whatever this snippet composed" path.
 * That's the right default for video/music pages, but `nomercy-player-core`
 * examples (composing the kit directly, no media backend) have nothing for it
 * to render; forcing the island there would either mount an unrelated video
 * player on a core page or sit permanently in an error state — either way a
 * faked result. `:::snippet{file="..." live="false"}` opts a directive out of
 * the island and emits only the code block. Omitting `live` (or any value
 * other than the literal string `"false"`) keeps the original always-live
 * behavior, so every existing video/music usage is unaffected.
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
/** Strip a leading SPDX/Copyright license comment block and the blank lines after it. */
function stripLicenseHeader(source: string): string {
  const lines = source.split('\n');
  if (!lines[0]?.startsWith('//')) return source;
  let end = 0;
  while (end < lines.length && lines[end].startsWith('//')) end++;
  if (!/SPDX|Copyright|Licensed under/.test(lines.slice(0, end).join('\n'))) return source;
  while (end < lines.length && lines[end].trim() === '') end++;
  return lines.slice(end).join('\n');
}

/** Extract the whole `const config … = { … };` declaration by brace-matching, ignoring the rest of the file. */
function extractConfigBlock(source: string): string | null {
  const decl = source.match(/const config\b[^=]*=\s*\{/);
  if (!decl || decl.index === undefined) return null;
  const braceStart = source.indexOf('{', decl.index);
  let depth = 0;
  for (let i = braceStart; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) {
        let end = i + 1;
        if (source[end] === ';') end++;
        return source.slice(decl.index, end);
      }
    }
  }
  return null;
}

/**
 * An example module is the island's input, not a program a reader can run: it
 * carries an `export default { config, … }` and, for docs-preview autoplay,
 * sometimes an `onReady`. For a `runnable` block we rebuild the copy-paste form
 * a consumer actually writes: import the factory, the exact config verbatim,
 * mount, await readiness, and (for music, which has no autoPlay config) start
 * the first item. The config is brace-matched out so preview-only machinery
 * (onReady, the `player` field) never shows. The live island still imports the
 * untouched module, so shown code and running player stay one source.
 */
function toRunnableSnippet(source: string): string | null {
  const pkg = source.match(/@nomercy-entertainment\/nomercy-(?:video|music)-player/)?.[0];
  if (!pkg) return null;
  const configBlock = extractConfigBlock(source);
  if (!configBlock) return null;

  const configType = configBlock.match(/const config\s*:\s*([A-Za-z0-9_]+)/)?.[1];
  const importLine = configType
    ? `import nmplayer, { type ${configType} } from '${pkg}';`
    : `import nmplayer from '${pkg}';`;
  const mount = `const player = nmplayer('player').setup(config);\nawait player.ready();`;
  // Music has no autoPlay config: load the first item so the native controls
  // have something to play. Video autoplays via its own config flag.
  const start = pkg.includes('music') ? `${mount}\nplayer.item(0);` : mount;

  return `${importLine}\n\n${configBlock}\n\n${start}`;
}

/** License-stripped, and (when the directive marks it `runnable`) rewritten to copy-paste form. */
function toDisplaySource(source: string, runnable: boolean): string {
  const stripped = stripLicenseHeader(source);
  const out = (runnable ? toRunnableSnippet(stripped) : null) ?? stripped;
  return out.endsWith('\n') ? out.slice(0, -1) : out;
}

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

        const live = node.attributes?.live !== 'false';
        // `runnable` opts a snippet into copy-paste rewriting (import + config +
        // mount). Tutorial snippets (build steps with an onReady overlay) omit
        // it and show their exact source.
        const runnable = node.attributes?.runnable !== undefined && node.attributes?.runnable !== 'false';

        const source = readFileSync(path.join(examplesDir, `${file}.ts`), 'utf8');
        const codeValue = toDisplaySource(source, runnable);

        const codeNode: any = { type: 'code', lang: 'ts', value: codeValue };
        if (!live) {
          replacements.push({ parent, index, nodes: [codeNode] });
          return;
        }

        const playerElement: any = {
          type: 'mdxJsxFlowElement',
          name: 'PlayerExample',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'snippet', value: file },
            { type: 'mdxJsxAttribute', name: 'client:load', value: null },
          ],
          children: [],
        };

        // `preview="first"` renders the live player above the code, so the
        // reader sees the running result and then the copy-paste example
        // underneath it. Default keeps code-then-player for tutorial steps.
        const playerFirst = node.attributes?.preview === 'first';
        replacements.push({
          parent,
          index,
          nodes: playerFirst ? [playerElement, codeNode] : [codeNode, playerElement],
        });
      },
    );

    // Apply in reverse order so earlier indices stay valid.
    replacements.sort((a, b) => b.index - a.index);
    for (const { parent, index, nodes } of replacements) {
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
