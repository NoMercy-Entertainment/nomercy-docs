// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { expect, test } from '@playwright/test';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(currentDir, '..');

// A real content-collection entry, built through the exact same
// `[...slug].astro` -> `<Content components={mdxComponents} />` pipeline
// every real docs page goes through (not a hand-wired raw page) — so this
// proves the directive works the way an author will actually use it.
// Written before the build and removed again in afterAll so the fixture
// never lands in git or in a real deploy.
const FIXTURE_SLUG = 'e2e-snippet-directive-fixture';
const fixtureContentPath = path.join(
  root,
  'src',
  'content',
  'nomercy-video-player',
  'en',
  `${FIXTURE_SLUG}.mdx`,
);
const fixtureHtmlPath = path.join(root, 'dist', 'nomercy-video-player', FIXTURE_SLUG, 'index.html');
const quickstartSourcePath = path.join(root, 'src', 'examples', 'quickstart.ts');

test.describe('remark snippet directive', () => {
  test.beforeAll(() => {
    test.setTimeout(300_000);
    writeFileSync(
      fixtureContentPath,
      [
        '---',
        "title: 'E2E Snippet Directive Fixture'",
        '---',
        '',
        ':::snippet{file="quickstart"}',
        '',
      ].join('\n'),
      'utf8',
    );
    try {
      execSync('npx astro build', { cwd: root, stdio: 'inherit' });
    } finally {
      rmSync(fixtureContentPath, { force: true });
    }
  });

  test('binds the rendered code block to the real quickstart.ts source and mounts PlayerExample', async ({
    page,
  }) => {
    expect(existsSync(fixtureHtmlPath), `expected build output at ${fixtureHtmlPath}`).toBe(true);

    const realSource = readFileSync(quickstartSourcePath, 'utf8');
    await page.goto(pathToFileURL(fixtureHtmlPath).href);

    // The fenced code block: rehype stores the untouched source (pre-Shiki)
    // on `data-code-raw`, so this is an exact-equality proof, not a fuzzy
    // substring match against tokenized spans. mdast-to-hast appends exactly
    // one trailing newline to every code block's text (its own long-standing
    // convention, independent of this directive), which is why remark-snippet
    // strips exactly one from the source before building the `code` node —
    // the two cancel out and this compares against the file's real bytes.
    const codeBlock = page.locator('pre[data-code-raw]');
    await expect(codeBlock).toHaveCount(1);
    expect(await codeBlock.getAttribute('data-code-raw')).toBe(realSource);

    // Also prove the source is genuinely visible in the rendered page, not
    // just carried in a hidden attribute.
    const distinctiveLine = "baseImageUrl: 'https://image.tmdb.org/t/p',";
    expect(realSource).toContain(distinctiveLine);
    await expect(page.locator('body')).toContainText(distinctiveLine);

    // The live player island, bound to the same file the code block came from.
    const playerExample = page.locator('[data-player-example="quickstart"]');
    await expect(playerExample).toHaveCount(1);
  });
});
