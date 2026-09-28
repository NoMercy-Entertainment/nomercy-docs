# Reader: /nomercy-player-core/reference/testing

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/reference/testing.mdx

Reviewed-SHA: b6f10bb62fb780ab

Same-voice comparison: skipped (not requested for this review).

## Rubric

**Import path.** The page says helpers are not on the package root and names `@nomercy-entertainment/nomercy-player-core/testing`. The opening block lists the symbols and matches that path. A newcomer can import without guessing.

**Tables.** Each table has a lead-in sentence that states its purpose: construction exports and stub-only methods under StubPlayer; author-facing API for `describePlugin` and `describePluginAgainst`; the suite registration table for `runIPlayerContract`; leak harness exports; mockFetch types; and the cast shape for `PlayerTestInternals`.

**Internal source files.** Nothing in reader-facing prose tells you to open repo paths such as `packages/player-web/...`. Usage stays on the public `/testing` import and the helpers described on the page.

## Reader notes

Section order runs from `StubPlayer` through plugin harnesses, `runIPlayerContract`, listener-leak helpers, `mockFetch`, and `PlayerTestInternals`. Stub limits (`getPlugin` / `addPlugin`) and the Vitest `test.globals: true` requirement are called out before you hit failing tests. The link to the event bus adapter explains why leak checks need `listenerCount()`.

As a first visit, this is enough to choose an export from the tables and wire imports without opening TypeScript sources first.
