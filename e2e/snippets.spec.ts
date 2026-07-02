// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import type { Locator } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import { expect, test } from '@playwright/test';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(currentDir, '..', 'dist');

const PLAYER_EXAMPLE_TIMEOUT_MS = 20_000;
const CONCURRENCY = 5;

/**
 * `dist/**\/*.html` is the build this suite's `playwright.config.ts` webServer
 * just produced (`npm run preview` runs `astro build` first) — reading it
 * directly is the one enumeration that can never drift from what's actually
 * served, unlike a route list re-derived from content collections (which
 * would also have to reimplement every redirect/slug rule already baked into
 * the build) or a sitemap (this site has no `@astrojs/sitemap` integration).
 */
function builtRoutes(): string[] {
  return globSync('**/*.html', { cwd: distDir }).map(distFileToRoute);
}

function distFileToRoute(relativePath: string): string {
  const posixPath = relativePath.split(path.sep).join('/');
  if (posixPath === 'index.html') return '/';
  if (posixPath.endsWith('/index.html')) return `/${posixPath.slice(0, -'index.html'.length)}`;
  return `/${posixPath.replace(/\.html$/, '')}`;
}

/**
 * `data-player-example` is set server-side (present in the static HTML the
 * moment `PlayerExample` renders); `data-player-ready`/`data-player-error`
 * only appear once client JS actually mounts and the player resolves. Grepping
 * the built file for the static marker first — instead of opening every one
 * of the site's several hundred pages in a browser — means the cost of this
 * gate scales with the number of pages that actually carry a live player, not
 * with total site size.
 */
function routesWithPlayerExamples(): string[] {
  return globSync('**/*.html', { cwd: distDir })
    .filter((relativePath) =>
      readFileSync(path.join(distDir, relativePath), 'utf8').includes('data-player-example'),
    )
    .map(distFileToRoute);
}

async function waitForPlayerExample(
  locator: Locator,
  context: { route: string; name: string },
): Promise<void> {
  const deadline = Date.now() + PLAYER_EXAMPLE_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const errorMessage = await locator.getAttribute('data-player-error');
    if (errorMessage) {
      throw new Error(
        `[${context.route}] player example "${context.name}" reported an error: ${errorMessage}`,
      );
    }

    const ready = await locator.getAttribute('data-player-ready');
    if (ready === 'true') return;

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(
    `[${context.route}] player example "${context.name}" never reached data-player-ready within ${PLAYER_EXAMPLE_TIMEOUT_MS}ms`,
  );
}

async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  const queue = [...items];

  async function drain(): Promise<void> {
    for (let next = queue.shift(); next !== undefined; next = queue.shift()) {
      await worker(next);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, drain));
}

test.describe('live snippet gate', () => {
  test('every built doc page with a player example reaches data-player-ready', async ({
    browser,
  }) => {
    const candidateRoutes = routesWithPlayerExamples();
    test.setTimeout(Math.max(180_000, candidateRoutes.length * PLAYER_EXAMPLE_TIMEOUT_MS));

    const failures: string[] = [];

    await runWithConcurrency(candidateRoutes, CONCURRENCY, async (route) => {
      await test.step(route, async () => {
        const page = await browser.newPage();
        try {
          await page.goto(route, { waitUntil: 'domcontentloaded' });

          const examples = page.locator('[data-player-example]');
          const exampleCount = await examples.count();

          for (let index = 0; index < exampleCount; index += 1) {
            const exampleLocator = examples.nth(index);
            const name = (await exampleLocator.getAttribute('data-player-example')) ?? `#${index}`;
            // `data-player-ready`/`data-player-error` live on `PlayerExample`'s
            // inner `role="region"` mount target, not on the `[data-player-example]`
            // wrapper itself (see PlayerExample.tsx) — checking the wrapper's own
            // attributes would silently never see either state.
            const statusLocator = exampleLocator.locator('[role="region"]');
            try {
              await waitForPlayerExample(statusLocator, { route, name });
            } catch (error) {
              failures.push(error instanceof Error ? error.message : String(error));
            }
          }
        } finally {
          await page.close();
        }
      });
    });

    expect(failures, `player examples failed on ${failures.length} route(s)`).toEqual([]);
  });

  test('the built site has doc pages to gate', () => {
    // A regression in `builtRoutes()`/`distDir` (wrong path, empty build)
    // would otherwise make the gate above pass vacuously for the wrong
    // reason — zero candidate routes rather than zero broken examples.
    expect(builtRoutes().length, `expected built HTML pages under ${distDir}`).toBeGreaterThan(0);
  });
});
