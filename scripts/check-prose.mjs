// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// Drift gate for the four writing habits that reliably mark text as machine-written:
// marketing adjectives, hedging preambles, corporate verbs, and empty closing lines.
//
// It is a TRIPWIRE, not a score. That distinction is the whole design. Running the
// ASD-STE100 linter from woosal1337/blog against these collections returned 4.73
// violations per 100 words, worse than that study's own unassisted baseline — and
// 75% of the number was long sentences and contractions, both of which are this
// site's deliberate voice. Driving that score down would mean deleting 615
// contractions and chopping 903 explanatory sentences into fragments, producing
// docs that measure four times better and read worse. A metric you optimise
// rewrites the writing to suit the metric.
//
// So this gate only checks the categories where any hit is a genuine defect, and it
// fails on the first one rather than reporting a total. The same run scored 0
// marketing adjectives, 0 hedges, 1 phrasal verb and 6 corporate verbs across 43,000
// words, so the bar is already met: this exists to catch NEW drift, not to grade
// what is here.
//
// Contractions, sentence length, passive voice and semicolons are deliberately
// absent. They are style, this repo has chosen its style, and a linter is not the
// place to relitigate that.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT = join(ROOT, 'src', 'content');

// Adjectives that assert quality instead of describing behaviour. A reader cannot act
// on "seamless"; they can act on "reconnects without dropping the queue".
const MARKETING = [
  'seamless', 'seamlessly', 'robust', 'cutting-edge', 'state-of-the-art', 'revolutionary',
  'game-changing', 'best-in-class', 'world-class', 'blazing', 'blazingly fast', 'lightning-fast',
  'powerful', 'elegant', 'effortless', 'delightful', 'unparalleled', 'unmatched', 'industry-leading',
  'next-generation', 'turnkey', 'rock-solid', 'battle-tested', 'first-class citizen',
];

// Words that announce a sentence is coming instead of being one.
const HEDGES = [
  'it is important to note', "it's important to note", 'it is worth noting', "it's worth noting",
  'as mentioned above', 'as mentioned earlier', 'as we discussed', 'needless to say',
  'it should be noted', 'please note that', 'keep in mind that', 'at the end of the day',
];

// Latinate verbs with a shorter English equivalent that is always clearer.
const CORPORATE = [
  'utilize', 'utilizes', 'utilized', 'utilizing', 'leverage', 'leverages', 'leveraged', 'leveraging',
  'facilitate', 'facilitates', 'facilitated', 'aforementioned', 'prior to', 'in the event that',
  'in order to', 'a plethora of', 'myriad of', 'delve into', 'deep dive into',
];

// The paragraph that restates the page and tells the reader they now understand it.
const EMPTY_CLOSERS = [
  'in conclusion', 'to summarize', 'to sum up', 'in summary,', 'hopefully this helps',
  'happy coding', 'that’s it!', "that's it!", 'and that is all there is to it',
];

// Text from the starter template this site was scaffolded from, never replaced. The first run of this
// gate flagged "seamlessly" on two index pages and the surrounding sentence turned out to be verbatim
// Tailwind "Protocol" copy — a MESSAGING API — offering readers of the media server docs access to
// "contacts, conversations, group messages". That is worse than a style problem and no other check
// here would ever have found it, so the residue itself is a category.
const TEMPLATE_RESIDUE = [
  'contacts, conversations, group messages', 'devoted protocol users', 'the protocol api',
  'lorem ipsum', 'your product name', 'todo: write', 'coming soon.', 'replace this text',
];

const CHECKS = [
  ['marketing adjective', MARKETING, 'Say what it does. A reader cannot act on an adjective.'],
  ['hedging preamble', HEDGES, 'Delete the preamble and keep the sentence.'],
  ['corporate verb', CORPORATE, 'Use the short English word: use, build, help, before, to.'],
  ['empty closer', EMPTY_CLOSERS, 'End on the last real instruction.'],
  ['starter-template residue', TEMPLATE_RESIDUE, 'This is scaffold copy about another product. Write what this page is actually for.'],
];

// Prose only. Code is not writing, and a banned word inside an identifier or a URL is
// not a style violation — `leverage` in an API name has to stay spelled that way.
function proseOf(text) {
  return text
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '')
    .replace(/^\s*(?:import|export)\s.*$/gm, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/^:::.*$/gm, '');
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (['.md', '.mdx'].includes(extname(name))) yield p;
  }
}

const findings = [];
for (const file of walk(CONTENT)) {
  const lines = proseOf(readFileSync(file, 'utf8')).split('\n');
  lines.forEach((line, i) => {
    const low = line.toLowerCase();
    for (const [label, terms, fix] of CHECKS) {
      for (const term of terms) {
        // Whole-phrase match, so "powerful" never fires inside "powerfully-named-thing".
        const re = new RegExp(`(?<![\\w-])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`, 'g');
        if (re.test(low)) {
          findings.push({ file: relative(ROOT, file).replace(/\\/g, '/'), line: i + 1, label, term, fix, text: line.trim().slice(0, 110) });
        }
      }
    }
  });
}

if (findings.length === 0) {
  console.log('check-prose: clean.');
  process.exit(0);
}

console.error(`check-prose: ${findings.length} finding(s).\n`);
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  ${f.label} "${f.term}"`);
  console.error(`    ${f.text}`);
  console.error(`    ${f.fix}\n`);
}
console.error('These four categories are drift markers, not style preferences. Rewrite the line.');
process.exit(1);
