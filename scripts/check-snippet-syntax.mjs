// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// Syntax gate for every reader-facing `ts`/`tsx` code block the site renders —
// both directive-driven (`:::snippet{file="..."}`, already real source under
// `src/examples/`) and hand-written fenced blocks inside `.mdx` prose. Reads
// `dist/**/*.html` (the same build `e2e/snippets.spec.ts` gates against, see
// its own header comment for why the built output is the one enumeration
// that can't drift from what's actually served) rather than re-parsing MDX
// itself, so this check exercises the EXACT text a reader would copy —
// including the `remark-snippet.ts` transforms (`./media` inlining, the
// `runnable` copy-paste rewrite, Prettier formatting) that already ran to
// produce it.
//
// A hand-written fenced block that's a deliberate PARTIAL — a config
// property meant to be grafted onto an example shown earlier on the same
// page, not a standalone program (an `auth: {...}` block, a `plugins: [...]`
// array) — is not valid on its own and would false-positive here. Precede
// that fence with an MDX comment `{/* partial */}` in the `.mdx` SOURCE and
// this gate skips it — the comment itself renders to nothing (MDX strips it
// at compile time), so it can't be detected in the built HTML; this reads
// the source instead and correlates fences to their rendered block by
// position (both remark and the directive substitution preserve document
// order 1:1, so the Nth `ts`/`tsx` fence in the source is always the Nth
// `data-language="ts"` block on that route). Undocumented, unmarked fences
// are all expected to parse as valid, standalone TypeScript.
//
// Run after `astro build` — `npm run build` already sequences this after
// `check:docs` (which itself triggers a build via the Playwright webServer),
// so `dist/` is guaranteed fresh by the time this runs.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transform } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const contentDir = path.join(root, 'src', 'content');

const TRIO_COLLECTIONS = ['nomercy-player-core', 'nomercy-video-player', 'nomercy-music-player'];

function walkFiles(dir, matchName) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full, matchName));
    else if (matchName(entry.name)) out.push(full);
  }
  return out;
}

/** route (e.g. `/nomercy-video-player/recipes/auth-tokens/`) -> absolute `.mdx` source path, for every page in the trio collections. */
function buildRouteToSourceMap() {
  const map = new Map();
  for (const collection of TRIO_COLLECTIONS) {
    const collectionDir = path.join(contentDir, collection, 'en');
    for (const file of walkFiles(collectionDir, (name) => name.endsWith('.mdx'))) {
      const relFromCollection = path.relative(collectionDir, file).split(path.sep).join('/');
      const slug = relFromCollection.replace(/\.mdx$/, '').replace(/\/index$/, '').replace(/^index$/, '');
      const route = `/${collection}/${slug}/`.replace(/\/{2,}/g, '/');
      map.set(route, file);
    }
  }
  return map;
}

/** Ordered `isPartial` flags for every `ts`/`tsx` fence in a `.mdx` source file — true when the fence is immediately preceded (ignoring blank lines) by `{/* partial *\/}`. */
function partialFlagsForSource(sourcePath) {
  const source = readFileSync(sourcePath, 'utf8');
  const lines = source.split('\n');
  const flags = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^```(ts|tsx)\s*$/.test(lines[i].trim())) continue;
    let j = i - 1;
    while (j >= 0 && lines[j].trim() === '') j--;
    flags.push(j >= 0 && /\{\/\*[^*]*\bpartial\b/.test(lines[j]));
  }
  return flags;
}

/** One `<pre data-language="ts|tsx" data-code-raw="...">` block, decoded, with the route it renders on and its position on that route. */
function extractRenderedSnippets() {
  const snippets = [];
  const files = walkFiles(distDir, (name) => name === 'index.html');
  const blockRe = /data-language="(ts|tsx)" data-code-raw="([\s\S]*?)"><code>/g;

  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    const route = '/' + path.relative(distDir, file).split(path.sep).join('/').replace(/index\.html$/, '');
    let match;
    let position = 0;
    while ((match = blockRe.exec(html))) {
      const [, lang, raw] = match;
      snippets.push({ route, lang, code: decodeHtmlEntities(raw), position: position++ });
    }
  }
  return snippets;
}

function decodeHtmlEntities(text) {
  return text
    .replaceAll('&#x27;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&#10;', '\n')
    .replaceAll('&#x60;', '`')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');
}

async function main() {
  if (!existsSync(distDir)) {
    console.error(`check-snippet-syntax: ${distDir} does not exist — run "astro build" first.`);
    process.exit(1);
  }

  const routeToSource = buildRouteToSourceMap();
  const partialFlagsByRoute = new Map();
  const snippets = extractRenderedSnippets();

  const checked = [];
  let skippedPartial = 0;

  for (const snippet of snippets) {
    const sourcePath = routeToSource.get(snippet.route);
    if (!sourcePath) {
      // Non-trio page (rest/, signalr/, etc.) — outside this gate's scope.
      checked.push(snippet);
      continue;
    }
    if (!partialFlagsByRoute.has(snippet.route)) {
      partialFlagsByRoute.set(snippet.route, partialFlagsForSource(sourcePath));
    }
    const flags = partialFlagsByRoute.get(snippet.route);
    if (flags[snippet.position]) {
      skippedPartial++;
      continue;
    }
    checked.push(snippet);
  }

  const failures = [];
  for (const snippet of checked) {
    try {
      await transform(snippet.code, { loader: snippet.lang, target: 'es2022', sourcefile: snippet.route });
    } catch (error) {
      failures.push({ route: snippet.route, message: error instanceof Error ? error.message : String(error) });
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} snippet(s) failed to parse as valid TypeScript:\n`);
    for (const failure of failures) {
      console.error(`  ${failure.route}\n    ${failure.message.split('\n').slice(0, 3).join('\n    ')}\n`);
    }
    console.error(
      'Every reader-facing code block must be complete, valid, standalone TypeScript. ' +
        'If this one is a deliberate partial (a config property meant to be grafted onto an ' +
        'earlier example, not a full program), precede its fence with "{/* partial */}" in the .mdx source.',
    );
    process.exit(1);
  }

  console.log(
    `Snippet syntax OK — ${checked.length} block(s) parsed, ${skippedPartial} marked partial and skipped.`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main();
}
