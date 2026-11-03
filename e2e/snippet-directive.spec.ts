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
// Keep the fixture build separate from the live snippet gate's dist-e2e.
// Both Playwright commands can run at the same time in this worktree.
const fixtureOutDir = 'dist-e2e-directive';

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
const fixtureHtmlPath = path.join(root, fixtureOutDir, 'nomercy-video-player', FIXTURE_SLUG, 'index.html');
const quickstartSourcePath = path.join(root, 'src', 'examples', 'quickstart.ts');

test.describe('remark snippet directive', () => {
  test.beforeAll(() => {
    test.setTimeout(600_000);
    writeFileSync(
      fixtureContentPath,
      [
        '---',
        "title: 'E2E Snippet Directive Fixture'",
        '---',
        '',
        ':::snippet{file="quickstart" runnable="false"}',
        '',
      ].join('\n'),
      'utf8',
    );
    try {
      execSync(`npx astro build --outDir ${fixtureOutDir}`, { cwd: root, stdio: 'inherit' });
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

    // The directive strips the license header before displaying the raw
    // example. Rehype stores that display source before highlighting.
    const codeBlock = page.locator('pre[data-code-raw]');
    await expect(codeBlock).toHaveCount(1);
    expect(await codeBlock.getAttribute('data-code-raw')).toBe(
      realSource.slice(realSource.indexOf('import type { VideoPlayerConfig }')),
    );

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
