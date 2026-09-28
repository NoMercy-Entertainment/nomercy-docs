# Fact check: /nomercy-player-core/reference/testing
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/reference/testing.mdx
Reviewed-SHA: e82f928a5e2a36d7

Source: `packages/player-web/nomercy-player-core` (`src/testing/*`, `package.json` `exports["./testing"]`, `src/index.ts`). Method: read page and source; no site build. Em dash / en dash scan (U+2013, U+2014) over the page: none. Word `kit`: none on the page. Lead-in sentences before tables are accurate framing; no signature drift.

## Gate checks

| Gate | Result |
| --- | --- |
| Testing symbols only on `./testing`, not package root | Pass (`package.json:188-191`; no matches in `src/index.ts`) |
| Documented import list matches `src/testing/index.ts` re-exports | Pass |
| Every table signature matches source | Pass |
| Table lead-ins match section intent | Pass |
| `listenerCount` on `IEventBus` (EventEmitter implements it) | Pass (`IEventBus.ts:35`; `leak-harness.ts:30-44`) |
| No `kit` on page | Pass |
| No em dash / en dash on page | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Helpers live on `/testing` only; root does not re-export them | `package.json:188-191`; `src/index.ts` (no testing symbols) | Supported |
| Import path `@nomercy-entertainment/nomercy-player-core/testing` | `package.json:2` (`name`); `testing/index.ts:17-22` | Supported |
| Listed named imports are exported from `testing/index.ts` | `testing/index.ts:26-45` | Supported |
| `describePlugin` / `describePluginAgainst` / `runIPlayerContract` read Vitest globals from `globalThis`; contract also needs `expect`; needs `test.globals: true` | `describe-plugin.ts:34-46`; `describe-plugin-against.ts:29-41`; `contract.ts:43-55` | Supported |
| `StubPlayer` class signature and constructor opts | `stub-player.ts:89,108` | Supported |
| `createStubPlayer` factory signature | `stub-player.ts:935-938` | Supported |
| Stub methods: `setPhase`, `pushDispatch`, `popDispatch`, `setAudioContext`, `cueParsers`, `reset` | `stub-player.ts:130-136,173-179,195-196,428-429,897-924` | Supported |
| No plugin registration; `getPlugin` / `getPluginById` always `undefined`; `addPlugin` no-op returns `this` | `stub-player.ts:459-466,725-729` | Supported |
| `describePlugin` signature; `PluginTestContext`; `DescribePluginOptions` | `describe-plugin.ts:53-78,102-106` | Supported |
| Per-test `initialize`, static translations, `use()`, teardown `dispose` + leak assert unless skipped | `describe-plugin.ts:120-181` | Supported |
| `describePluginAgainst` signature; contexts and options (required `player` factory) | `describe-plugin-against.ts:44-61,92-96` | Supported |
| Real player: `addPlugin`, `getPlugin`, `removePlugin`, dispose unless custom `teardown` | `describe-plugin-against.ts:115-161` | Supported |
| `runIPlayerContract` opts signature | `contract.ts:92-96` | Supported |
| Contract covers identity, events, phase/`dispatching`, `baseUrl`, `audioContext`, experimental, i18n, cue parsers | `contract.ts:117-325` | Supported |
| Leak harness uses `player.listenerCount()`; missing method throws `TypeError` | `leak-harness.ts:30-44`; declared on `IEventBus.ts:35` | Supported |
| `countAllListeners`, `assertNoListenerLeak`, `assertNoListenerLeakOverCycles` (default cycles `5`), `LeakAssertionResult` | `leak-harness.ts:16-22,30,76-82,130-138` | Supported |
| `mockFetch`, `MockFetch`, `MockFetchCall`, `MockFetchResponse`; empty queue resolves `undefined as T` | `mock-fetch.ts:26-51,71-94` | Supported |
| `PlayerTestInternals` fields; cast via `as unknown as`, never `as any` | `player-test-internals.ts:20-35` | Supported |
