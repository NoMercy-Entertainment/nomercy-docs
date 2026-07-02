// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// Contract lint for the player trio (core + video + music). These three packages
// share one architecture — core owns everything medium-agnostic, video and music
// each own only what makes their medium hard — and the docs are supposed to mirror
// that split. This script is the gate that keeps them from drifting apart:
//   1. every page carries a `title` and resolves an `order` (its sidebar position)
//   2. each collection covers the full onboarding arc, not just scattered reference
//   3. video and music pages never claim ownership of the other medium's exclusive
//      surface (core is exempt — it legitimately talks about both)
//   4. no page balloons past a sane size budget
// Then it hands off to the Playwright snippet gate, which proves the live examples
// on every built page actually work. Any failure here exits non-zero.
//
// Frontmatter `order` is deliberately NOT required as literal YAML: nav-structure.ts
// is this repo's single source of truth for position (see the comment at its top —
// pages "no longer need `category`/`order` in frontmatter"). A page satisfies the
// order contract either by setting `order` explicitly or by being placed in
// nav-structure.ts, exactly like `check-nav.js` already expects. A page missing both
// has no defined position anywhere and fails.
//
// The cross-medium deny-lists are deliberately narrow. Obvious-looking candidates
// like `equalizer`, `crossfade`, and `HLS` are NOT included: the audio-graph plugin
// family (equalizer, spectrum, visualizers) is re-exported into the video player,
// crossfade is a real video config option (`crossfadeEnabled`), and HLS is used by
// the music player's own streaming backend. Only tokens verified to have zero
// legitimate use on the other side are listed; a generic feature-name scan would
// flag correct, deliberately cross-linked documentation.

import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { glob } from 'glob';
import matter from 'gray-matter';
import { readNavLookup } from './_nav-manifest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'src', 'content');

export const CORE_COLLECTION = 'nomercy-player-core';
export const TRIO_COLLECTIONS = [CORE_COLLECTION, 'nomercy-video-player', 'nomercy-music-player'];

export const WORD_BUDGET = 8000;
export const LINE_BUDGET = 1500;

// The 7-stage onboarding arc every trio collection must eventually cover, in this
// order. Real pages rarely carry these exact slugs, so each stage is matched by the
// existing page(s) that already serve that role rather than by literal renaming.
export const ARC_SECTIONS = [
  { name: 'introduction', exact: ['index', 'overview', 'introduction'] },
  { name: 'quickstart', exact: ['quickstart'] },
  { name: 'tour', exact: ['architecture', 'overview'], prefix: ['tour'] },
  {
    name: 'build',
    exact: [
      'setup',
      'lifecycle',
      'installation',
      'configuration',
      'framework-integration',
      'framework-vue',
      'framework-react',
      'framework-svelte',
      'framework-angular',
      'framework-vanilla',
      'plugin-development',
    ],
    prefix: ['guides/build', 'build'],
  },
  { name: 'recipes', prefix: ['recipes'] },
  { name: 'plugins-adapters', prefix: ['plugins', 'plugin-', 'adapters', 'backends'] },
  { name: 'reference', exact: ['events', 'errors', 'faq', 'changelog'], prefix: ['api', 'types', 'reference'] },
];

// Verified zero-occurrence on the opposite collection as of the last audit pass —
// see the file header for why generic feature names are excluded.
const MUSIC_ONLY_TOKENS = [
  'scrobbl',
  'similarity-engine',
  'playlist-generator',
  'now-playing-art',
  'lyric-source',
];
const VIDEO_ONLY_TOKENS = [
  'chapter-source',
  'thumbnail-source',
  'subtitle-style-store',
  'subtitle-overlay',
  'octopusplugin',
  'skipperplugin',
  'desktopuiplugin',
  'tvkeyhandlerplugin',
];

export const CROSS_CHECK = {
  'nomercy-video-player': { deny: MUSIC_ONLY_TOKENS, label: 'music-only' },
  'nomercy-music-player': { deny: VIDEO_ONLY_TOKENS, label: 'video-only' },
};

// A collection's own landing page has no sibling to be ordered against, so it
// carries no position in nav-structure.ts by design (mirrors check-nav.js).
export function isOrderExemptSlug(slug) {
  return slug === '' || slug === 'index' || slug.endsWith('/index');
}

export function slugOf(collection, filePath) {
  const rel = path.relative(path.join(contentDir, collection), filePath).split(path.sep).join('/');
  return rel
    .replace(/\.(mdx|md)$/, '')
    .replace(/^[a-z]{2}\//, '')
    .replace(/^[a-z]{2}$/, '');
}

export function resolveOrder(navLookupForCollection, slug, frontmatterOrder) {
  if (typeof frontmatterOrder === 'number') return frontmatterOrder;
  const placement = navLookupForCollection?.get(slug);
  return placement ? placement.order : undefined;
}

export function checkFrontmatterViolations(page, navLookupForCollection) {
  if (page.draft) return [];
  const violations = [];
  const title = page.frontmatter.title;
  if (typeof title !== 'string' || title.trim() === '') {
    violations.push({
      rule: 'MISSING-TITLE',
      file: page.relFile,
      detail: 'frontmatter is missing `title`',
    });
  }
  if (isOrderExemptSlug(page.slug)) return violations;
  const order = resolveOrder(navLookupForCollection, page.slug, page.frontmatter.order);
  if (order === undefined) {
    violations.push({
      rule: 'MISSING-ORDER',
      file: page.relFile,
      detail: `no \`order\` in frontmatter and no nav-structure.ts entry for '${page.slug}' — every page needs an explicit position`,
    });
  }
  return violations;
}

export function checkBudgetViolation(page) {
  if (page.draft) return null;
  const words = page.body.split(/\s+/).filter(Boolean).length;
  const lines = page.body.split(/\r\n|\n/).length;
  if (words > WORD_BUDGET || lines > LINE_BUDGET) {
    return {
      rule: 'OVER-BUDGET',
      file: page.relFile,
      detail: `${words} words / ${lines} lines exceeds the ${WORD_BUDGET}-word / ${LINE_BUDGET}-line page budget`,
    };
  }
  return null;
}

export function checkCrossTokenViolations(page) {
  if (page.draft) return [];
  const rule = CROSS_CHECK[page.collection];
  if (!rule) return [];
  const haystack = page.body.toLowerCase();
  const violations = [];
  for (const token of rule.deny) {
    if (haystack.includes(token.toLowerCase())) {
      violations.push({
        rule: 'CROSS-MEDIUM-TOKEN',
        file: page.relFile,
        detail: `references ${rule.label} token '${token}'`,
      });
    }
  }
  return violations;
}

export function matchesArcSection(slug, section) {
  if (section.exact?.includes(slug)) return true;
  if (section.prefix?.some((prefix) => slug.startsWith(prefix))) return true;
  return false;
}

export function checkArcSectionViolations(collection, pages) {
  const liveSlugs = pages.filter((page) => !page.draft).map((page) => page.slug);
  if (liveSlugs.length === 0) {
    return {
      violations: [],
      notice: `${collection} has no content yet — skipping the 7-arc-section check`,
    };
  }
  const missing = ARC_SECTIONS.filter(
    (section) => !liveSlugs.some((slug) => matchesArcSection(slug, section)),
  ).map((section) => section.name);
  if (missing.length === 0) return { violations: [], notice: null };
  return {
    violations: [
      {
        rule: 'ARC-SECTION-MISSING',
        file: collection,
        detail: `missing arc section(s): ${missing.join(', ')} (see ARC_SECTIONS in scripts/check-docs.mjs)`,
      },
    ],
    notice: null,
  };
}

function walkCollection(collection) {
  const dir = path.join(contentDir, collection);
  const files = glob.sync('**/*.{md,mdx}', { cwd: dir });
  return files.map((file) => {
    const filePath = path.join(dir, file);
    const raw = readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);
    return {
      collection,
      slug: slugOf(collection, filePath),
      relFile: path.relative(root, filePath).split(path.sep).join('/'),
      draft: data.draft === true,
      frontmatter: data,
      body: content,
    };
  });
}

function runLint() {
  const navLookup = readNavLookup();
  const violations = [];
  const notices = [];

  for (const collection of TRIO_COLLECTIONS) {
    const pages = walkCollection(collection);
    const collectionNavLookup = navLookup[collection];

    for (const page of pages) {
      violations.push(...checkFrontmatterViolations(page, collectionNavLookup));
      violations.push(...checkCrossTokenViolations(page));
      const budgetViolation = checkBudgetViolation(page);
      if (budgetViolation) violations.push(budgetViolation);
    }

    const arcResult = checkArcSectionViolations(collection, pages);
    violations.push(...arcResult.violations);
    if (arcResult.notice) notices.push(arcResult.notice);
  }

  return { violations, notices };
}

function runSnippetGate() {
  console.log('\nContract lint passed — running the Playwright snippet gate...');
  const result = spawnSync('npx', ['playwright', 'test', 'e2e/snippets.spec.ts'], {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    console.error('\nPlaywright snippet gate failed.');
    return result.status ?? 1;
  }
  return 0;
}

function main() {
  const { violations, notices } = runLint();

  for (const notice of notices) {
    console.log(`NOTICE  ${notice}`);
  }

  if (violations.length > 0) {
    for (const violation of violations) {
      console.error(`${violation.rule}  ${violation.file}  ${violation.detail}`);
    }
    console.error(
      `\n${violations.length} contract violation(s). See scripts/check-docs.mjs for the rules.`,
    );
    process.exit(1);
  }

  console.log(`Contract OK — ${TRIO_COLLECTIONS.length} trio collection(s) checked.`);
  process.exit(runSnippetGate());
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main();
}
