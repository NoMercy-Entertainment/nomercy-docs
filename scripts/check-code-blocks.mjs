// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// A ratchet on hand-written code in the player docs.
//
// The rule it holds: code on a player page comes from a compiled example in
// src/examples, pulled in with :::snippet, so it type-checks and cannot drift
// from the package. A fenced TypeScript or JavaScript block written into the
// page is not compiled by anything, and 423 of them had built up across 129
// pages before this check existed (measured 2026-09-29).
//
// It is a BUDGET, not a threshold. The build fails when the count goes UP, so
// no new hand-written block gets in, and each one converted to a snippet
// lowers the count for good. Lower the budget when you convert blocks; never
// raise it to make a red build green. Shell and config fences (sh, json) are
// not counted: they are commands and data, not code a package compiles.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const COLLECTIONS = ['nomercy-player-core', 'nomercy-video-player', 'nomercy-music-player'];

// Measured on master 2026-09-29 (423); lowered to 420 after the Timing
// and Volume pages moved their blocks into compiled snippets.
const BUDGET = 419;

const FENCE = /^```(?:ts|typescript|tsx|js|javascript|jsx)\b/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      // Generated from the player contract, not written by hand.
      if (name === 'native') continue;
      yield* walk(p);
    }
    else if (extname(name) === '.mdx') yield p;
  }
}

const perPage = [];
let total = 0;

for (const collection of COLLECTIONS) {
  for (const file of walk(join(ROOT, 'src', 'content', collection))) {
    const count = readFileSync(file, 'utf8').split('\n').filter(line => FENCE.test(line)).length;
    if (count === 0) continue;
    total += count;
    perPage.push({ rel: relative(ROOT, file).replace(/\\/g, '/'), count });
  }
}

if (total <= BUDGET) {
  const note = total < BUDGET ? ` — under budget, lower BUDGET in scripts/check-code-blocks.mjs to ${total}` : '';
  console.log(`check-code-blocks: ${total} hand-written code block(s) in ${perPage.length} player page(s)${note}`);
  process.exit(0);
}

console.error(`check-code-blocks: ${total} hand-written code blocks, budget ${BUDGET}.\n`);
console.error('  most per page:');
for (const p of perPage.sort((a, b) => b.count - a.count).slice(0, 10))
  console.error(`    ${p.rel}  ${p.count}`);
console.error(
  '\nPut the code in a src/examples file and show it with :::snippet{file="..." lines="..."}. The budget only goes down.',
);
process.exit(1);
