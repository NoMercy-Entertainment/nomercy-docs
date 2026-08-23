// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// Import-specifier gate for the player-trio content trees. Hand-written code
// fences in `.mdx` prose show readers import lines like
// `from '@nomercy-entertainment/nomercy-player-core/plugins/key-handler'` —
// nothing compiles those fences, so a subpath that never existed (or was
// renamed in the package) reads plausibly and ships. `check:examples` proves
// the `src/examples/` files (the `:::snippet` sources) resolve for real via
// tsc; this gate covers the residue: every trio import specifier in every
// fenced block, validated against the LIVE exports map read from that
// package's package.json in the monorepo (`../../packages/<pkg>/package.json`),
// falling back to the installed copy in node_modules when this repo is
// checked out standalone. A specifier that matches no exports key — exact or
// `*` pattern — fails the build with file, line, and the bad specifier.
//
// Scope is deliberately the trio collections only (same list as
// check-docs.mjs): the media-server / app-web trees don't
// document these npm packages and are outside this contract.

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'src', 'content');

const TRIO_COLLECTIONS = ['nomercy-player-core', 'nomercy-video-player', 'nomercy-music-player'];
const SCOPE = '@nomercy-entertainment';
const TRIO_PACKAGES = TRIO_COLLECTIONS.map((name) => `${SCOPE}/${name}`);

// `from '…'`, `import '…'` (side-effect), `import('…')` (dynamic), `require('…')`.
const IMPORT_RE =
  /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)['"](@nomercy-entertainment\/[^'"]+)['"]/g;

/** exports keys ('.', './plugins/key-handler', './streams/*', …) for a trio package, read from the monorepo source first. */
function readExportsKeys(packageName) {
  const dirName = packageName.slice(SCOPE.length + 1);
  const candidates = [
    path.join(root, '..', '..', 'packages', dirName, 'package.json'),
    path.join(root, 'node_modules', packageName, 'package.json'),
  ];
  const manifestPath = candidates.find((candidate) => existsSync(candidate));
  if (!manifestPath) {
    throw new Error(
      `cannot locate package.json for ${packageName} (looked in the monorepo and node_modules)`,
    );
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const { exports } = manifest;
  if (exports === undefined || typeof exports === 'string') return { keys: ['.'], manifestPath };
  const keys = Object.keys(exports);
  // A conditions object ({ import: …, types: … }) exports only the root.
  if (!keys.some((key) => key.startsWith('.'))) return { keys: ['.'], manifestPath };
  return { keys, manifestPath };
}

/** Node exports-map semantics: exact key, or a single-`*` pattern key where `*` may span path segments. */
function matchesExportKey(subpath, key) {
  if (!key.includes('*')) return subpath === key;
  const [prefix, suffix] = key.split('*');
  return (
    subpath.length > prefix.length + suffix.length &&
    subpath.startsWith(prefix) &&
    subpath.endsWith(suffix)
  );
}

/** Every trio import specifier inside a fenced code block, with its 1-based line number. */
function extractFencedSpecifiers(source) {
  const specifiers = [];
  const lines = source.split(/\r?\n/);
  let inFence = false;
  let fenceMarker = '';
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fenceMatch[1][0].repeat(fenceMatch[1].length);
      } else if (trimmed.startsWith(fenceMarker)) {
        inFence = false;
      }
      continue;
    }
    if (!inFence) continue;
    for (const match of lines[i].matchAll(IMPORT_RE)) {
      specifiers.push({ specifier: match[1], line: i + 1 });
    }
  }
  return specifiers;
}

function main() {
  const exportsByPackage = new Map(TRIO_PACKAGES.map((name) => [name, readExportsKeys(name)]));

  const failures = [];
  let checkedCount = 0;
  let fileCount = 0;

  for (const collection of TRIO_COLLECTIONS) {
    const collectionDir = path.join(contentDir, collection);
    for (const file of glob.sync('**/*.{md,mdx}', { cwd: collectionDir })) {
      const filePath = path.join(collectionDir, file);
      const relFile = path.relative(root, filePath).split(path.sep).join('/');
      const found = extractFencedSpecifiers(readFileSync(filePath, 'utf8'));
      if (found.length > 0) fileCount++;

      for (const { specifier, line } of found) {
        const packageName = TRIO_PACKAGES.find(
          (name) => specifier === name || specifier.startsWith(`${name}/`),
        );
        if (!packageName) continue; // other @nomercy-entertainment packages are outside this contract
        checkedCount++;
        const subpath = specifier === packageName ? '.' : `.${specifier.slice(packageName.length)}`;
        const { keys, manifestPath } = exportsByPackage.get(packageName);
        if (!keys.some((key) => matchesExportKey(subpath, key))) {
          failures.push({ relFile, line, specifier, packageName, manifestPath });
        }
      }
    }
  }

  if (failures.length > 0) {
    console.error(
      `\n${failures.length} import specifier(s) don't exist in their package's exports map:\n`,
    );
    for (const failure of failures) {
      console.error(
        `  ${failure.relFile}:${failure.line}\n    '${failure.specifier}' — no matching export in ${failure.packageName} (${failure.manifestPath})\n`,
      );
    }
    console.error(
      'Every import path a reader copies must resolve against the real package. ' +
        'Fix the doc to use an existing exports subpath — or, if the code genuinely grew a new ' +
        "entry point, that belongs in the package's exports map first.",
    );
    process.exit(1);
  }

  console.log(
    `Doc import specifiers OK — ${checkedCount} trio specifier(s) across ${fileCount} file(s) validated against the exports maps.`,
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main();
}
