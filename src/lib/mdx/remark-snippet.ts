// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format as prettierFormat } from 'prettier';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const examplesDir = path.resolve(currentDir, '../../examples');
// The native snippets, in their own directories because they are their own
// languages: `check:examples` runs tsc over `src/examples` and would choke on a
// .kt file sitting in it, and the Kotlin and Swift gates each need a directory
// they can hand whole to a compiler.
const kotlinExamplesDir = path.resolve(currentDir, '../../examples-kmp');
const swiftExamplesDir = path.resolve(currentDir, '../../examples-swift');
const mediaPath = path.join(examplesDir, 'media.ts');
const prettierRcPath = path.resolve(currentDir, '../../../.prettierrc.json');

const DIRECTIVE_NODE_TYPES = ['containerDirective', 'leafDirective'] as const;

// What a snippet can be written in. The first two run in the browser and get a
// live island; the last two are compiled by their own gates and shown as code.
type SnippetLang = 'ts' | 'tsx' | 'kotlin' | 'swift';

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
/**
 * Resolve `<file>.ts` or `<file>.tsx` under `examplesDir`, in that order.
 * `.tsx` exists for framework-recipe examples that contain real JSX (React
 * hooks/components/providers) — TypeScript requires the `.tsx` extension for
 * JSX syntax, `.ts` can't parse it. Throws with both attempted paths listed
 * so a typo'd `file` attribute fails loudly instead of an opaque ENOENT deep
 * in the MDX/rollup pipeline.
 */
function resolveExampleFile(file: string): { path: string; lang: SnippetLang } {
  const candidates: Array<{ path: string; lang: SnippetLang }> = [
    { path: path.join(examplesDir, `${file}.ts`), lang: 'ts' },
    { path: path.join(examplesDir, `${file}.tsx`), lang: 'tsx' },
    // Kotlin and Swift come last so a name that exists in both worlds keeps
    // resolving to the web one, which is what every existing page means.
    { path: path.join(kotlinExamplesDir, `${file}.kt`), lang: 'kotlin' },
    { path: path.join(swiftExamplesDir, `${file}.swift`), lang: 'swift' },
  ];
  const found = candidates.find((candidate) => existsSync(candidate.path));
  if (found) return found;
  throw new Error(
    `:::snippet{file="${file}"} — no example file found at any of:` +
      candidates.map((candidate) => `
  ${candidate.path}`).join(''),
  );
}

// A native snippet has no live island and never will: the preview mounts a real
// browser player, and there is no browser in a Kotlin quickstart. The directive
// still reads the real compiled file, which is the part that matters — what the
// page shows is what the compiler checked.
function isNative(lang: SnippetLang): boolean {
  return lang === 'kotlin' || lang === 'swift';
}

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

/** Rewrites `import type { A, B } from '<pkg>'` into `import nmplayer, { type A, type B } from '<pkg>'` — merging the real default export into whatever type-only import the example already has, instead of emitting a second, redundant import line. Prepends a fresh default import if the package has no type-only import to merge into. */
function mergeDefaultImport(source: string, pkg: string): string {
  const escapedPkg = pkg.replace(/[/]/g, '\\/');
  const typeImportRe = new RegExp(`^import type \\{([^}]+)\\} from '${escapedPkg}';\\n?`, 'm');
  const match = source.match(typeImportRe);
  if (match) {
    const names = match[1]
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
      .map((n) => `type ${n}`);
    return source.replace(typeImportRe, `import nmplayer, { ${names.join(', ')} } from '${pkg}';\n`);
  }
  return `import nmplayer from '${pkg}';\n${source}`;
}

/** Reads a `function <name>(<params>): <returnType> {` signature (the docs-example convention — every `configure`/`onReady` in `src/examples` is declared this way) without needing to brace-match the body: just enough to know how many parameters to pass at the call site, and whether the return type is the `(): () => void` cleanup-function shape. */
function functionSignature(source: string, name: string): { params: string[]; returnsCleanup: boolean } | null {
  const re = new RegExp(`function ${name}\\s*\\(([^)]*)\\)\\s*:\\s*([^{]+)\\{`);
  const match = re.exec(source);
  if (!match) return null;
  const params = match[1].split(',').map((p) => p.trim()).filter(Boolean);
  const returnsCleanup = match[2].trim().startsWith('()');
  return { params, returnsCleanup };
}

/**
 * An example module is the island's input, not a program a reader can run: it
 * carries an `export default { config, configure?, onReady? }`, where
 * `PlayerExample` (see `src/components/PlayerExample.tsx`) calls `configure`
 * on the unconfigured instance before `setup()`, and `onReady` once `ready()`
 * resolves, passing the live instance and its mount element. For a `runnable`
 * block we rebuild the copy-paste form a consumer actually writes: the real
 * default import merged with whatever the example already imports, the exact
 * config verbatim, every helper/`configure`/`onReady` function declaration
 * kept as real code (not paraphrased), and real call sites wired in the same
 * order `PlayerExample` itself calls them — `configure(player)` before
 * `setup()`, `onReady(player, container)` after `ready()`, with `container`
 * resolved to the same `#player` element `setup()` mounted into. Only the
 * `export default { … }` line itself is stripped — that object's shape has
 * no meaning outside `PlayerExample`'s dynamic `import()`. The live island
 * still imports the untouched module, so shown code and running player stay
 * one source.
 */
function toRunnableSnippet(source: string): string | null {
  const pkg = source.match(/@nomercy-entertainment\/nomercy-(?:video|music)-player/)?.[0];
  if (!pkg) return null;
  if (!/^(?:export )?const config\b/m.test(source)) return null;
  const isMusic = pkg.includes('music');

  const withImport = mergeDefaultImport(source, pkg);
  const configureSig = functionSignature(withImport, 'configure');
  const onReadySig = functionSignature(withImport, 'onReady');
  const body = withImport.replace(/^export default \{[^}]*\};?\s*$/m, '').trimEnd();

  const mountLines: string[] = [];
  if (configureSig) {
    mountLines.push(
      `const player = nmplayer('player');`,
      `configure(player);`,
      `player.setup(config);`,
      `await player.ready();`,
    );
  } else {
    mountLines.push(`const player = nmplayer('player')`, `    .setup(config);`, `await player.ready();`);
  }

  if (onReadySig) {
    const passesContainer = onReadySig.params.length >= 2;
    if (passesContainer) mountLines.push('', `const container = document.getElementById('player')!;`);
    const call = passesContainer ? 'onReady(player, container)' : 'onReady(player)';
    mountLines.push(onReadySig.returnsCleanup ? `const cleanup = ${call};` : `${call};`);
  } else if (isMusic) {
    // Music has no autoPlay config: load the first item so the native
    // controls have something to play. Video autoplays via its own config
    // flag. A snippet whose own `onReady` already starts playback (most
    // music recipes call `item(0, { autoplay: true })` themselves) skips
    // this — the two would otherwise race for the same starting item.
    mountLines.push('player.item(0);');
  }

  return `${body}\n\n${mountLines.join('\n')}`;
}

// -----------------------------------------------------------------------------
//  ./media inlining
//
//  Every example file is allowed to `import { X, Y } from './media'` for its
//  OWN execution (the live `<PlayerExample>` island really does load that
//  module) — but `./media` is a docs-repo-internal fixture, it does not exist
//  in a reader's project. What gets DISPLAYED has to be self-contained: the
//  real, resolved nomercy-media catalogue values (`FILMS_BASE`, `sintel`,
//  `songs`, …), inlined as plain `const` declarations, verbatim from
//  `media.ts`. One inliner here keeps every snippet honest instead of hand
//  -copying catalogue data into each example file (which would drift the
//  moment `media.ts` changes).
// -----------------------------------------------------------------------------

function skipQuoted(source: string, start: number, quote: string): number {
  let i = start + 1;
  while (i < source.length) {
    if (source[i] === '\\') { i += 2; continue; }
    if (source[i] === quote) return i + 1;
    i++;
  }
  return i;
}

/** `start` is the index right after an opening `` ` ``. Returns the index right after the matching closing backtick. */
function skipTemplate(source: string, start: number): number {
  let i = start;
  while (i < source.length) {
    if (source[i] === '\\') { i += 2; continue; }
    if (source[i] === '`') return i + 1;
    if (source[i] === '$' && source[i + 1] === '{') {
      i = skipTemplateExpr(source, i + 2);
      continue;
    }
    i++;
  }
  return i;
}

/** `start` is the index right after a template `${`. Returns the index right after the matching `}`. */
function skipTemplateExpr(source: string, start: number): number {
  let depth = 1;
  let i = start;
  while (i < source.length && depth > 0) {
    const ch = source[i];
    if (ch === '\'' || ch === '"') { i = skipQuoted(source, i, ch); continue; }
    if (ch === '`') { i = skipTemplate(source, i + 1); continue; }
    if (ch === '{') { depth++; i++; continue; }
    if (ch === '}') { depth--; i++; continue; }
    i++;
  }
  return i;
}

/** Scans forward from `start` (right after a decl's `=`) for the end of the statement — the first `;` at bracket depth 0 — skipping over strings, template literals, and comments so brackets inside them don't throw off depth tracking. */
function scanStatementEnd(source: string, start: number): number {
  let i = start;
  const stack: string[] = [];
  while (i < source.length) {
    const ch = source[i];
    if (ch === '/' && source[i + 1] === '/') {
      const nl = source.indexOf('\n', i);
      i = nl === -1 ? source.length : nl;
      continue;
    }
    if (ch === '/' && source[i + 1] === '*') {
      const close = source.indexOf('*/', i + 2);
      i = close === -1 ? source.length : close + 2;
      continue;
    }
    if (ch === '\'' || ch === '"') { i = skipQuoted(source, i, ch); continue; }
    if (ch === '`') { i = skipTemplate(source, i + 1); continue; }
    if (ch === '{' || ch === '[' || ch === '(') { stack.push(ch); i++; continue; }
    if (ch === '}' || ch === ']' || ch === ')') { stack.pop(); i++; continue; }
    if (ch === ';' && stack.length === 0) return i;
    i++;
  }
  return i;
}

/** Spans of `text` that are string/template-literal CONTENT, not live code — substitution must skip these so a string value that happens to equal a declaration name (e.g. `id: 'sintel'` next to `export const sintel = …`) is never corrupted. A template's `${…}` interior is real code and is excluded from the ineligible spans (recursively, in case it holds its own strings). */
function ineligibleRanges(text: string): [number, number][] {
  const ranges: [number, number][] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '/' && text[i + 1] === '/') {
      const nl = text.indexOf('\n', i);
      i = nl === -1 ? text.length : nl;
      continue;
    }
    if (ch === '/' && text[i + 1] === '*') {
      const close = text.indexOf('*/', i + 2);
      i = close === -1 ? text.length : close + 2;
      continue;
    }
    if (ch === '\'' || ch === '"') {
      const start = i;
      i = skipQuoted(text, i, ch);
      ranges.push([start, i]);
      continue;
    }
    if (ch === '`') {
      let j = i + 1;
      let segStart = i;
      while (j < text.length) {
        if (text[j] === '\\') { j += 2; continue; }
        if (text[j] === '`') { j++; break; }
        if (text[j] === '$' && text[j + 1] === '{') {
          ranges.push([segStart, j]);
          const exprStart = j + 2;
          const exprEnd = skipTemplateExpr(text, exprStart);
          const nestedText = text.slice(exprStart, exprEnd - 1);
          for (const [s, e] of ineligibleRanges(nestedText)) ranges.push([s + exprStart, e + exprStart]);
          j = exprEnd;
          segStart = j;
          continue;
        }
        j++;
      }
      ranges.push([segStart, j]);
      i = j;
      continue;
    }
    i++;
  }
  return ranges;
}

function isInRanges(index: number, ranges: [number, number][]): boolean {
  return ranges.some(([s, e]) => index >= s && index < e);
}

/** Replaces bare-word occurrences of `name` with `replacement`, skipping occurrences inside string/template-literal content. */
function replaceIdentifier(text: string, name: string, replacement: string): string {
  const ranges = ineligibleRanges(text);
  const re = new RegExp(`\\b${name}\\b`, 'g');
  let result = '';
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (isInRanges(m.index, ranges)) continue;
    result += text.slice(last, m.index) + replacement;
    last = m.index + name.length;
  }
  result += text.slice(last);
  return result;
}

function containsLiveReference(text: string, name: string): boolean {
  const ranges = ineligibleRanges(text);
  const re = new RegExp(`\\b${name}\\b`, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (!isInRanges(m.index, ranges)) return true;
  }
  return false;
}

let mediaDeclsCache: Map<string, string> | null = null;

/** Every top-level `const NAME[: Type] = <expr>;` declaration in `media.ts`, keyed by name, value = the RHS expression source with its type annotation stripped. Read once and cached for the build. */
function mediaDecls(): Map<string, string> {
  if (mediaDeclsCache) return mediaDeclsCache;
  const source = readFileSync(mediaPath, 'utf8');
  const decls = new Map<string, string>();
  const declRe = /^(?:export )?const (\w+)\s*(?::\s*[^=\n]+)?\s*=\s*/gm;
  let match: RegExpExecArray | null;
  while ((match = declRe.exec(source))) {
    const name = match[1];
    const rhsStart = declRe.lastIndex;
    const end = scanStatementEnd(source, rhsStart);
    decls.set(name, source.slice(rhsStart, end).trim());
    declRe.lastIndex = end;
  }
  mediaDeclsCache = decls;
  return decls;
}

/** Recursively expands every `media.ts`-internal identifier referenced inside `rhs` (a wire-item object like `sintelItem`, never shown standalone in docs) EXCEPT names in `keep` — those get their own top-level `const` in the displayed snippet, so a reference to them (e.g. `${MUSIC_BASE}` reused across three tracks) stays a live reference instead of getting flattened three times over. */
function inlineRefs(rhs: string, decls: Map<string, string>, keep: Set<string>, seen: Set<string>): string {
  let out = rhs;
  let changed = true;
  let guard = 0;
  while (changed && guard < 10) {
    changed = false;
    guard++;
    for (const [name, value] of decls) {
      if (keep.has(name) || seen.has(name)) continue;
      if (containsLiveReference(out, name)) {
        seen.add(name);
        const resolved = inlineRefs(value, decls, keep, seen);
        out = replaceIdentifier(out, name, resolved);
        changed = true;
      }
    }
  }
  return out;
}

/** Replaces `import { A, B } from './media';` with self-contained `const` declarations holding the real, resolved nomercy-media catalogue values — a reader pasting the snippet never needs the docs repo's internal fixture module, every URL and playlist item is inlined verbatim from `media.ts`. The declarations land after the LAST remaining top-level import, not at the removed line's own position — a file that imports something else after `./media` (e.g. a sibling example module) would otherwise show an import statement sitting after a `const`, valid JS but backwards to read. No-op if the snippet doesn't import from `./media`. */
function inlineMediaImports(source: string): string {
  const importRe = /^import \{\s*([^}]+?)\s*\} from '\.\/media';\n?/m;
  const match = source.match(importRe);
  if (!match) return source;

  const names = match[1].split(',').map((n) => n.trim()).filter(Boolean);
  const decls = mediaDecls();
  const keep = new Set(names);

  const block = names
    .map((name) => {
      const rhs = decls.get(name);
      if (rhs === undefined) {
        throw new Error(
          `remark-snippet: media.ts has no export named "${name}" (imported by an example file's './media' import).`,
        );
      }
      const inlined = inlineRefs(rhs, decls, keep, new Set([name]));
      return `const ${name} = ${inlined};`;
    })
    .join('\n\n');

  const withoutImport = source.replace(importRe, '');
  const importLineRe = /^import\b[^\n]*\n/gm;
  let lastImportEnd = 0;
  let importMatch: RegExpExecArray | null;
  while ((importMatch = importLineRe.exec(withoutImport))) {
    lastImportEnd = importLineRe.lastIndex;
  }

  return `${withoutImport.slice(0, lastImportEnd)}${block}\n\n${withoutImport.slice(lastImportEnd)}`;
}

let prettierOptionsCache: Record<string, unknown> | null = null;

function prettierOptions(): Record<string, unknown> {
  if (!prettierOptionsCache) {
    prettierOptionsCache = JSON.parse(readFileSync(prettierRcPath, 'utf8')) as Record<string, unknown>;
  }
  return prettierOptionsCache;
}

/** Formats displayed code through the repo's own Prettier config so text-surgery (media inlining, runnable call-site rewriting) always renders with consistent indentation, regardless of the source position the inlined text was lifted from. Falls back to the unformatted string if Prettier can't parse it (should not happen for valid ts/tsx — fails loudly via the thrown reason logged to the console, rather than silently shipping a stack trace as page content). */
async function formatDisplaySource(code: string, lang: SnippetLang): Promise<string> {
  try {
    const formatted = await prettierFormat(code, {
      ...prettierOptions(),
      parser: 'typescript',
      filepath: `snippet.${lang}`,
    });
    return formatted.endsWith('\n') ? formatted.slice(0, -1) : formatted;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`remark-snippet: Prettier failed to format a displayed snippet, showing it unformatted.\n${message}`);
    return code;
  }
}

/** License-stripped, `./media` inlined, and (when the directive marks it `runnable`) rewritten to copy-paste form — then run through Prettier so the displayed block always reads clean regardless of where its pieces were lifted from. */
async function toDisplaySource(source: string, runnable: boolean, lang: SnippetLang): Promise<string> {
  const stripped = stripLicenseHeader(source);
  // Prettier has no Kotlin or Swift parser, and the media inlining below is
  // about a TypeScript module's imports. A native snippet is shown exactly as
  // it compiles.
  if (isNative(lang)) return stripped;
  const deMedia = inlineMediaImports(stripped);
  const out = (runnable ? toRunnableSnippet(deMedia) : null) ?? deMedia;
  return formatDisplaySource(out, lang);
}

interface PendingSnippet {
  parent: any;
  index: number;
  file: string;
  resolved: { path: string; lang: SnippetLang };
  live: boolean;
  runnable: boolean;
  playerFirst: boolean;
}

export function remarkSnippet() {
  return async (tree: Root) => {
    const pending: PendingSnippet[] = [];

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
        // Every video/music snippet gets the copy-paste rewrite (real default
        // import + config verbatim + real create/configure/mount/onReady call
        // sites) by default — `toRunnableSnippet` itself is the gate: it only
        // fires for a file that actually exports a video/music `config`, and
        // returns null (falling back to raw source) for anything else, e.g. a
        // `nomercy-player-core` example composing the kit directly with no
        // media backend. `:::snippet{file="..." runnable="false"}` opts a
        // directive out for the rare case raw source is the point.
        const runnable = node.attributes?.runnable !== 'false';
        const playerFirst = node.attributes?.preview === 'first';

        pending.push({ parent, index, file, resolved: resolveExampleFile(file), live, runnable, playerFirst });
      },
    );

    const replacements: { parent: any; index: number; nodes: any[] }[] = [];

    for (const { parent, index, file, resolved, live, runnable, playerFirst } of pending) {
      const source = readFileSync(resolved.path, 'utf8');
      const codeValue = await toDisplaySource(source, runnable, resolved.lang);

      const codeNode: any = { type: 'code', lang: resolved.lang, value: codeValue };
      // A native snippet never gets the island, whatever the directive said.
      // The preview mounts a real browser player and there is no browser in a
      // Kotlin quickstart; forcing it would leave a permanent error state on
      // the page, which is a faked result rather than a missing one.
      if (!live || isNative(resolved.lang)) {
        replacements.push({ parent, index, nodes: [codeNode] });
        continue;
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
      replacements.push({
        parent,
        index,
        nodes: playerFirst ? [playerElement, codeNode] : [codeNode, playerElement],
      });
    }

    // Apply in reverse order so earlier indices stay valid.
    replacements.sort((a, b) => b.index - a.index);
    for (const { parent, index, nodes } of replacements) {
      parent.children.splice(index, 1, ...nodes);
    }
  };
}
