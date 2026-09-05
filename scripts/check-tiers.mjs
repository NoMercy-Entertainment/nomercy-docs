// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tier discipline for the player trio docs.
 *
 * Every page does exactly one job:
 *
 *   Tier 1 INTRODUCE  introduction, quickstart, tour/    what it is, why, when
 *   Tier 2 EXAMPLES   build/, recipes/, handbook/         how you do it, with code
 *   Tier 3 SPEC       reference/, plugins-adapters/, native/   the full catalogue
 *
 * Two failures are worth catching mechanically, because both grew back once already:
 *
 *   LEAK       a Tier 1 page enumerating an API instead of linking to the spec. That
 *              is what put an error-code table on tour/errors while reference/errors
 *              already had one, and left the two pages sharing 88% of their symbols.
 *   COLLISION  two pages in the SAME tier covering one topic. The reader has no way
 *              to know which is the real one.
 *
 * Both budgets ratchet: the build fails when the number goes UP, never when it drops.
 * Lower them whenever the report says you can.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.join(HERE, '..', 'src', 'content');
const COLLECTIONS = ['nomercy-player-core', 'nomercy-video-player', 'nomercy-music-player'];

const BUDGET = {
	leakRows: 0,        // Tier 1 table rows beyond MAX_INTRO_TABLE_ROWS, summed
	collisions: 0,      // same-tier page pairs over SYMBOL_OVERLAP
	specFirst: 0,       // catalogue pages that open on a spec table with no purpose
};

/** A small orienting table is fine on an intro page. A catalogue is not. */
const MAX_INTRO_TABLE_ROWS = 6;
/** Share of the smaller page's API symbols the other page also names. */
const SYMBOL_OVERLAP = 0.5;
/** Below this a page has too few symbols for the overlap number to mean anything. */
const MIN_SYMBOLS = 8;
/**
 * Words of lead prose a catalogue page owes the reader before its first `##`.
 * A plugin or adapter page carries all three tiers as sections, so its purpose is the
 * opening paragraph. Landing on an options table with no idea what the thing is for is
 * the same overwhelm as a topic split across pages, just in one file.
 */
const MIN_LEAD_WORDS = 25;

/**
 * `native/` is the KMP track: its own platform, its own arc, and it documents Kotlin
 * signatures rather than the web ones. A native page and a web page on the same topic
 * are two audiences, not a duplicate, so native gets a tier of its own and only ever
 * collides with itself.
 */
function tierOf(slug) {
	if (slug.startsWith('native/')) return 'native';
	if (/^(introduction|quickstart)$/.test(slug) || slug.startsWith('tour/')) return 1;
	if (/^(build|recipes|handbook)\//.test(slug)) return 2;
	return 3;
}

/** Topic key: the last path segment, minus the adapter-/plugin- prefixes and step numbers. */
function topicOf(slug) {
	return slug.split('/').pop()
		.replace(/^adapter-/, '')
		.replace(/^add-/, '')
		.replace(/-\d+$/, '');
}

function readPages() {
	const pages = [];
	for (const collection of COLLECTIONS) {
		const base = path.join(CONTENT, collection, 'en');
		if (!fs.existsSync(base)) continue;
		const walk = (dir) => {
			for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
				const full = path.join(dir, entry.name);
				if (entry.isDirectory()) { walk(full); continue; }
				if (!entry.name.endsWith('.mdx')) continue;
				const source = fs.readFileSync(full, 'utf8');
				if (/^draft:\s*true/m.test(source)) continue;
				const slug = full.replace(/\\/g, '/').split('/en/')[1].replace(/\.mdx$/, '');
				const prose = source.replace(/```[\s\S]*?```/g, '').replace(/^---[\s\S]*?---/, '');
				const lead = (prose.match(/^#\s+.+?$([\s\S]*?)^##\s/m) || [])[1] ?? '';
				// A purpose can be lead prose OR an explicit opening section. Both read the
				// same way to someone landing on the page; only a page that opens straight
				// into a table leaves them guessing.
				const firstHeading = (prose.match(/^##\s+(.+)$/m) || [])[1] ?? '';
				const opensOnPurpose = /^(purpose|what it is|what it does|overview|when to use)/i.test(firstHeading.replace(/`/g, '').trim());
				pages.push({
					collection,
					slug,
					tier: tierOf(slug),
					topic: topicOf(slug),
					tableRows: (prose.match(/^\|(?!\s*[-:| ]+\|)/gm) || []).length,
					leadWords: lead.split(/\s+/).filter(Boolean).length,
					opensOnPurpose,
					symbols: new Set([...source.matchAll(/`([A-Za-z_$][\w$]{3,})`/g)].map(m => m[1])),
				});
			}
		};
		walk(base);
	}
	return pages;
}

const pages = readPages();

// ── Leaks: a Tier 1 page carrying a catalogue ────────────────────────────────
const leaks = [];
for (const page of pages) {
	if (page.tier !== 1) continue;
	const over = page.tableRows - MAX_INTRO_TABLE_ROWS;
	if (over > 0) leaks.push({ page, over });
}
leaks.sort((a, b) => b.over - a.over);
const leakRows = leaks.reduce((total, l) => total + l.over, 0);

// ── Collisions: one topic, two pages, same tier, same collection ─────────────
const collisions = [];
for (let i = 0; i < pages.length; i++) {
	for (let j = i + 1; j < pages.length; j++) {
		const a = pages[i];
		const b = pages[j];
		if (a.collection !== b.collection) continue;
		if (a.tier !== b.tier) continue;
		if (a.topic !== b.topic) continue;
		if (a.symbols.size < MIN_SYMBOLS || b.symbols.size < MIN_SYMBOLS) continue;
		const shared = [...a.symbols].filter(s => b.symbols.has(s)).length;
		const share = shared / Math.min(a.symbols.size, b.symbols.size);
		if (share >= SYMBOL_OVERLAP) collisions.push({ a, b, share });
	}
}
collisions.sort((x, y) => y.share - x.share);

// ── Spec-first: a catalogue page opening on a table with no purpose ──────────
const specFirst = pages.filter(p => p.tier === 3 && p.slug.startsWith('plugins-adapters/') && !p.opensOnPurpose && p.leadWords < MIN_LEAD_WORDS);
specFirst.sort((a, b) => a.leadWords - b.leadWords);

const overLeak = leakRows - BUDGET.leakRows;
const overCollide = collisions.length - BUDGET.collisions;
const overSpecFirst = specFirst.length - BUDGET.specFirst;

if (overLeak <= 0 && overCollide <= 0 && overSpecFirst <= 0) {
	const canLower = leakRows < BUDGET.leakRows || collisions.length < BUDGET.collisions || specFirst.length < BUDGET.specFirst;
	console.log(
		`check-tiers: ${leakRows} intro table row(s) over budget, ${collisions.length} same-tier collision(s), ${specFirst.length} spec-first catalogue page(s) across ${pages.length} pages`
		+ (canLower ? ` — under budget, lower BUDGET in scripts/check-tiers.mjs to ${leakRows} / ${collisions.length} / ${specFirst.length}` : ''),
	);
	process.exit(0);
}

console.error('check-tiers: a page is doing another tier\'s job.\n');
if (overLeak > 0) {
	console.error(`  intro pages enumerating an API: ${leakRows} table row(s) past ${MAX_INTRO_TABLE_ROWS} (budget ${BUDGET.leakRows})\n`);
	for (const { page, over } of leaks.slice(0, 12)) {
		console.error(`    ${page.collection}/${page.slug}  ${page.tableRows} rows (${over} over)`);
	}
	console.error('\n  An intro page explains the idea. The catalogue belongs on its reference page; link to it.\n');
}
if (overCollide > 0) {
	console.error(`  same-tier collisions: ${collisions.length} (budget ${BUDGET.collisions})\n`);
	for (const { a, b, share } of collisions.slice(0, 12)) {
		console.error(`    ${Math.round(share * 100)}%  ${a.slug}  <>  ${b.slug}  (${a.collection})`);
	}
	console.error('\n  One topic gets at most one page per tier. Merge them, or split them by audience.\n');
}
if (overSpecFirst > 0) {
	console.error(`  catalogue pages opening on spec: ${specFirst.length} (budget ${BUDGET.specFirst})\n`);
	for (const page of specFirst.slice(0, 12)) {
		console.error(`    ${page.leadWords} lead word(s)  ${page.collection}/${page.slug}`);
	}
	console.error(`\n  A plugin or adapter page carries its own purpose. Open with a paragraph of at least ${MIN_LEAD_WORDS} words saying what it is for and when you reach for it, then the tables.\n`);
}
process.exit(1);
