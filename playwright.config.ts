// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import { defineConfig } from '@playwright/test';

// NOT 4321: that's the `astro dev` port (docs-dev tunnels it). With
// `reuseExistingServer` the gate would silently ride the dev server —
// dev-mode per-page compiles blow the per-example time budget and the dev
// toolbar pollutes snapshots. A port of its own means the gate always
// asserts against the production preview it spawned itself.
const PORT = 4323;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  // `e2e/snippet-directive.spec.ts` rebuilds `dist/` itself (its own
  // `astro build`, independent of the webServer's) and `e2e/snippets.spec.ts`
  // reads `dist/` directly — running spec files in parallel workers races
  // one file's rebuild against the other's read of the same directory
  // (ENOENT on a file astro's build deletes mid-rewrite). Every spec here
  // already bottlenecks on one shared, expensive build anyway, so forcing
  // one worker costs nothing real and makes that race impossible.
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  // Scanning every built page's HTML for a `data-player-example` marker
  // (see e2e/snippets.spec.ts) reads several hundred files synchronously
  // before the per-test `test.setTimeout` override below even runs, so the
  // default has to already be generous enough to survive that scan.
  timeout: 180_000,
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },
  // `preview` (not a bare `astro preview`) runs the same production build the
  // real site ships from — build:search then `astro build` then `astro
  // preview` — so the gate below asserts against actual build output, not a
  // dev-mode approximation of it.
  webServer: {
    command: `node scripts/preview-foreground.mjs --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
