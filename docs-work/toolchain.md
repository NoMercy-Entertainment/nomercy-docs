# Toolchain answers (Phase 1, partial, written before scope is settled)

Docs site: nomercy-docs @ 9e6de6f. Source of truth for server pages: nomercy-media-server `dev` @ d99a43f.

## Docs site (MDX)
1. Reachable page: a file under `src/content/<collection>/en/` plus a slug in `src/lib/nav-structure.ts` (CLAUDE.md, `scripts/check-nav.js`).
2. Page metadata defaults: frontmatter only (`src/content.config.ts` pageSchema); structure only from nav-structure.ts.
3. Tests: `scripts/check-*.mjs|js`, `scripts/check-docs.test.mjs`, Playwright `e2e/`.
4. House prose rules, checked: `scripts/check-prose.mjs` (change-history phrases at :76-92; em dash rule stated in DOCS-CONTRACT.md:32).
5. Formatter: `.prettierrc.json`.
6. Cheapest proof for a page: `npm run check:prose && npm run check:nav && npm run check:links` (not yet run; node_modules not installed).
7. Drift found (checked this turn):
   - `nomercy-media-server/en/cli/update.mdx` says `nomercy update` only downloads and stages, and `nomercy restart` applies it.
     Code: `src/NoMercy.Cli/Commands/UpdateCommand.cs:53-176` downloads, stops the server, swaps the binary (keeps `.previous`),
     starts it, waits up to 2 minutes for the new version, and rolls back if it does not come back. Containers and installer
     installs print an instruction and stop (:71-84). The page is WRONG.
   - `maintenance/upgrade.mdx` "takes a snapshot of the databases" before a schema change: no code found yet. NOT VERIFIED.
   - Docker volume `nomercy-data` exists in every compose file (docker-compose*.yml). TRUE.

## Media server (C#)
Answered after scope is settled.
