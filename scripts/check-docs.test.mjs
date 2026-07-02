// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// Proves the check-docs.mjs rule functions actually catch the three violation
// classes named in the contract (missing order, cross-medium token, over-budget
// page) before they ever run against real content. Run with `node --test`.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  checkFrontmatterViolations,
  checkBudgetViolation,
  checkCrossTokenViolations,
  checkArcSectionViolations,
  matchesArcSection,
  isOrderExemptSlug,
  WORD_BUDGET,
  ARC_SECTIONS,
} from './check-docs.mjs';

function page(overrides) {
  return {
    collection: 'nomercy-video-player',
    slug: 'some-page',
    relFile: 'src/content/nomercy-video-player/en/some-page.mdx',
    draft: false,
    frontmatter: { title: 'Some Page' },
    body: 'Ordinary page content.',
    ...overrides,
  };
}

test('fails a page missing order (no frontmatter order, no nav-manifest entry)', () => {
  const violations = checkFrontmatterViolations(page(), new Map());
  const orderViolation = violations.find((v) => v.rule === 'MISSING-ORDER');
  assert.ok(orderViolation, 'expected a MISSING-ORDER violation');
});

test('passes a page whose order comes from the nav manifest', () => {
  const navLookup = new Map([['some-page', { category: 'Getting Started', order: 0 }]]);
  const violations = checkFrontmatterViolations(page(), navLookup);
  assert.deepEqual(violations, []);
});

test('passes a page whose order comes from explicit frontmatter', () => {
  const violations = checkFrontmatterViolations(
    page({ frontmatter: { title: 'Some Page', order: 3 } }),
    new Map(),
  );
  assert.deepEqual(violations, []);
});

test('a collection landing page (index) never needs an order', () => {
  assert.equal(isOrderExemptSlug('index'), true);
  const violations = checkFrontmatterViolations(page({ slug: 'index' }), new Map());
  assert.deepEqual(violations, []);
});

test('fails a page missing title even when order resolves', () => {
  const navLookup = new Map([['some-page', { category: 'x', order: 0 }]]);
  const violations = checkFrontmatterViolations(page({ frontmatter: {} }), navLookup);
  assert.ok(violations.some((v) => v.rule === 'MISSING-TITLE'));
});

test('fails a video page containing a music-only token', () => {
  const violations = checkCrossTokenViolations(
    page({
      collection: 'nomercy-video-player',
      body: 'Register the ScrobblerAdapter to send plays to Last.fm.',
    }),
  );
  assert.ok(
    violations.some((v) => v.rule === 'CROSS-MEDIUM-TOKEN' && v.detail.includes('scrobbl')),
  );
});

test('fails a music page containing a video-only token', () => {
  const violations = checkCrossTokenViolations(
    page({
      collection: 'nomercy-music-player',
      body: 'Wire up the ChapterSource adapter for chapter-source markers.',
    }),
  );
  assert.ok(
    violations.some((v) => v.rule === 'CROSS-MEDIUM-TOKEN' && v.detail.includes('chapter-source')),
  );
});

test('the same token is fine on its own medium', () => {
  const violations = checkCrossTokenViolations(
    page({ collection: 'nomercy-music-player', body: 'The scrobbler adapter reports plays.' }),
  );
  assert.deepEqual(violations, []);
});

test('core is exempt from the cross-medium token check', () => {
  const violations = checkCrossTokenViolations(
    page({
      collection: 'nomercy-player-core',
      body: 'This mentions scrobbler and chapter-source in passing.',
    }),
  );
  assert.deepEqual(violations, []);
});

test('fails a page that exceeds the word/line budget', () => {
  const violation = checkBudgetViolation(page({ body: 'word '.repeat(WORD_BUDGET + 1) }));
  assert.ok(violation, 'expected an OVER-BUDGET violation');
  assert.equal(violation.rule, 'OVER-BUDGET');
});

test('passes a page within the word/line budget', () => {
  const violation = checkBudgetViolation(page({ body: 'A short, ordinary page.' }));
  assert.equal(violation, null);
});

test('draft pages are exempt from the budget check', () => {
  const violation = checkBudgetViolation(
    page({ draft: true, body: 'word '.repeat(WORD_BUDGET + 1) }),
  );
  assert.equal(violation, null);
});

test('arc-section check skips an empty collection with a notice, not a hard fail', () => {
  const result = checkArcSectionViolations('nomercy-video-player', []);
  assert.deepEqual(result.violations, []);
  assert.ok(result.notice && result.notice.includes('no content yet'));
});

test('arc-section check hard-fails a non-empty collection missing a required section', () => {
  const pages = [page({ slug: 'index' }), page({ slug: 'quickstart' })];
  const result = checkArcSectionViolations('nomercy-video-player', pages);
  assert.equal(result.notice, null);
  assert.ok(result.violations.some((v) => v.rule === 'ARC-SECTION-MISSING'));
});

test('arc-section check passes once every stage has a matching page', () => {
  const slugs = [
    'index',
    'quickstart',
    'architecture',
    'setup',
    'recipes/overview',
    'plugins/foo',
    'api-methods',
  ];
  for (const section of ARC_SECTIONS) {
    assert.ok(
      slugs.some((slug) => matchesArcSection(slug, section)),
      `no fixture slug satisfies arc section '${section.name}'`,
    );
  }
  const pages = slugs.map((slug) => page({ slug }));
  const result = checkArcSectionViolations('nomercy-video-player', pages);
  assert.deepEqual(result.violations, []);
});
