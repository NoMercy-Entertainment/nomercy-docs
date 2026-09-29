// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// A map row that says "reviewed" must still be true.
//
// A page is reviewed when two verdict files (fact check and reader) say
// "Verdict: PASS" and each carries the SHA of the page version it judged.
// Editing the page afterwards leaves the row claiming a review of text nobody
// read. On 2026-09-29, 24 fact-check and 23 reader PASS verdicts had gone
// stale that way without anything failing.
//
// Only rows marked reviewed are checked. A planned or drafted row makes no
// claim, so it is not this gate's business. When this fails, either review
// the page again or set its row back to "drafted".
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const WORK = join(ROOT, 'docs-work');

// Same slug and digest as the atlas skill's check_docs.py, so both agree.
const slug = page => page.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const digest = file => createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 16);

function reviewedRows(mapFile) {
  const rows = [];
  let header = null;
  for (const line of readFileSync(mapFile, 'utf8').split(/\r?\n/)) {
    const stripped = line.trim();
    if (!stripped.startsWith('|')) continue;
    const cells = stripped.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    if (!header) {
      header = cells.map(c => c.toLowerCase());
      continue;
    }
    if (cells.every(c => /^:?-+:?$/.test(c))) continue;
    const row = Object.fromEntries(header.map((h, i) => [h, cells[i] ?? '']));
    if (row.status?.toLowerCase() === 'reviewed') rows.push(row.page);
  }
  return rows;
}

const problems = [];
let checked = 0;

for (const set of readdirSync(WORK, { withFileTypes: true })) {
  const mapFile = join(WORK, set.name, 'map.md');
  if (!set.isDirectory() || !existsSync(mapFile)) continue;

  for (const page of reviewedRows(mapFile)) {
    checked++;
    for (const kind of ['factcheck', 'reader']) {
      const verdict = join(WORK, set.name, 'reviews', `${slug(page)}.${kind}.md`);
      if (!existsSync(verdict)) {
        problems.push(`${page}: no ${kind} verdict`);
        continue;
      }
      const body = readFileSync(verdict, 'utf8');
      if (!/^verdict:\s*pass\s*$/im.test(body)) {
        problems.push(`${page}: ${kind} verdict is not 'Verdict: PASS'`);
        continue;
      }
      const named = body.match(/^reviewed:\s*(\S+)\s*$/im)?.[1];
      const sha = body.match(/^reviewed-sha:\s*([0-9a-f]{16})\s*$/im)?.[1]?.toLowerCase();
      // Reviewers ran in worktrees, so the stamp may hold an absolute path.
      const rel = named?.replace(/\\/g, '/').replace(/^.*?(?=src\/content\/)/, '');
      if (!rel || !sha) {
        problems.push(`${page}: ${kind} verdict has no 'Reviewed:' plus 'Reviewed-SHA:' stamp`);
        continue;
      }
      const file = join(ROOT, rel);
      if (!existsSync(file)) problems.push(`${page}: ${kind} verdict names ${rel}, which does not exist`);
      else if (digest(file) !== sha) problems.push(`${page}: ${kind} verdict is stale, the page changed after it`);
    }
  }
}

if (problems.length === 0) {
  console.log(`check-reviews-fresh: ${checked} reviewed page(s), every verdict PASS and current`);
  process.exit(0);
}

console.error(`check-reviews-fresh: ${problems.length} problem(s) in ${checked} reviewed page(s):\n`);
for (const p of problems) console.error(`  ${p}`);
console.error('\nReview the page again, or set its map row back to "drafted".');
process.exit(1);
