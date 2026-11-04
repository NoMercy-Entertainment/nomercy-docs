import { defineConfig } from '@playwright/test';

// This test opens its generated HTML directly. It does not need the live
// snippet gate's preview server or a second build into dist-e2e.
export default defineConfig({
  testDir: './e2e',
  testMatch: 'snippet-directive.spec.ts',
  workers: 1,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  timeout: 600_000,
  use: { trace: 'retain-on-failure' },
});
