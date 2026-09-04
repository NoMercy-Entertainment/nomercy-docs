// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// A ratchet on prose density, not a style score.
//
// The complaint this exists for: "the documentation is way too dense and people
// give up reading after the first paragraph." That is measurable. A paragraph
// over 60 words is a wall, and a sentence over 30 words has to be re-read.
//
// It is a BUDGET, not a threshold. The build fails when the count goes UP, so
// prose can only get lighter over time. Lower the budget when you improve a
// page; never raise it to make a red build green.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT = join(ROOT, 'src', 'content');

// Measured 2026-09-04 after the density pass. Was 157 / 355 across the trio
// before it. Zero long paragraphs is the floor: it can only be held, not beaten.
const BUDGET = {
  longParagraphs: 0,
  longSentences: 300,
};

const MAX_PARAGRAPH_WORDS = 60;
const MAX_SENTENCE_WORDS = 30;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (extname(name) === '.mdx') yield p;
  }
}

// Prose only. Code, tables, directives and lists are not paragraphs, and a long
// table row is not a wall of text.
function paragraphsOf(text) {
  return text
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^:::[\s\S]*?^:::/gm, '')
    .replace(/^\s*<[^>]+>\s*$/gm, '')
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(
      p =>
        p &&
        !p.startsWith('#') &&
        !p.startsWith('|') &&
        !p.startsWith('- ') &&
        !p.startsWith('*') &&
        !p.startsWith('::') &&
        // A multi-line JSX island is a component, not a wall of prose.
        !p.startsWith('<') &&
        !/^\d+\./.test(p),
    );
}

const worst = [];
let longParagraphs = 0;
let longSentences = 0;
let pages = 0;

for (const file of walk(CONTENT)) {
  const text = readFileSync(file, 'utf8');
  if (/^draft:\s*true/m.test(text)) continue;
  pages++;
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  for (const para of paragraphsOf(text)) {
    const words = para.split(/\s+/).length;
    if (words > MAX_PARAGRAPH_WORDS) {
      longParagraphs++;
      worst.push({ rel, words, text: para.slice(0, 90) });
    }
    for (const sentence of para.split(/(?<=[.!?])\s+/)) {
      if (sentence.split(/\s+/).length > MAX_SENTENCE_WORDS) longSentences++;
    }
  }
}

const overParagraphs = longParagraphs - BUDGET.longParagraphs;
const overSentences = longSentences - BUDGET.longSentences;

if (overParagraphs <= 0 && overSentences <= 0) {
  const note =
    overParagraphs < 0 || overSentences < 0
      ? ` — under budget, lower BUDGET in scripts/check-density.mjs to ${longParagraphs} / ${longSentences}`
      : '';
  console.log(
    `check-density: ${longParagraphs} long paragraph(s), ${longSentences} long sentence(s) across ${pages} pages${note}`,
  );
  process.exit(0);
}

console.error('check-density: prose got denser.\n');
if (overParagraphs > 0)
  console.error(`  paragraphs over ${MAX_PARAGRAPH_WORDS} words: ${longParagraphs} (budget ${BUDGET.longParagraphs})`);
if (overSentences > 0)
  console.error(`  sentences over ${MAX_SENTENCE_WORDS} words: ${longSentences} (budget ${BUDGET.longSentences})`);

console.error('\n  longest paragraphs:');
for (const w of worst.sort((a, b) => b.words - a.words).slice(0, 10))
  console.error(`    ${w.rel}  ${w.words} words\n      ${w.text}...`);

console.error(
  '\nOne idea per paragraph. A list in prose becomes a list. The budget only goes down.',
);
process.exit(1);
