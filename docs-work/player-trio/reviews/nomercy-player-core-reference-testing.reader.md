# Reader: /nomercy-player-core/reference/testing

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/reference/testing.mdx

Reviewed-SHA: e82f928a5e2a36d7

## Same-voice comparison

Skipped. There is no approved reference page yet for this section.

## Snippet

No example file is wired to this page. The opening import block is the only inline sample.

## Reader notes (JavaScript background, first visit)

The page states up front that testing helpers live on a separate subpath, not on the package root. It names the exact import: `@nomercy-entertainment/nomercy-player-core/testing`, with a full `import { ... } from '...'` block. That is enough to install the package and pull symbols without guessing paths.

The Vitest note is practical: `describePlugin`, `describePluginAgainst`, and `runIPlayerContract` expect globals on `globalThis`, so `test.globals: true` is required. That matches how many Vitest projects are configured and avoids a silent "describe is not defined" surprise.

Section order walks from the in-memory `StubPlayer` double through plugin harnesses, the shared `IPlayer` contract suite, listener-leak helpers, `mockFetch`, and the internal-only `PlayerTestInternals` cast type. Each major helper gets a short job description before its tables. Stub limitations (`getPlugin` always undefined, `addPlugin` no-op) are spelled out, which matters when writing tests that mirror production registration.

Cross-links to the event bus adapter page for `listenerCount()` give a place to read why leak checks need that method.

As a catalog reference, the "One job" column plus surrounding prose is enough for me to pick the right export without opening TypeScript sources first.

## Why PASS

Under this review's rubric, pass when the import path is clear and every table has a sentence immediately before it that says what that table is for.

The import path passes: root re-export is denied, `./testing` is named, and the sample import matches.

Every table now has a lead-in: construction exports and stub-only methods under StubPlayer; author-facing API lines for `describePlugin` and `describePluginAgainst`; "This table is the function that registers that suite" before `runIPlayerContract`; leak harness and mockFetch intros; and "This table is the shape of that cast" before `PlayerTestInternals`. The earlier gap on the last two sections is closed.
