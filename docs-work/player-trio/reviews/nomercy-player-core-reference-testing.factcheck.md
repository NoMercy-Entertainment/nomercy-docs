# Fact check: /nomercy-player-core/reference/testing
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/reference/testing.mdx
Reviewed-SHA: e96d03d025edfd34

Full review. Previous verdict: PASS (Reviewed-SHA `b6f10bb62fb780ab`, the page at `cc9b94c`), no findings. The page changed since (`git diff cc9b94c c844686`): only pseudo-tags were added to names that were plain code before; no signature, table value or sentence changed meaning. The source under `src/testing/` and `src/types/player.ts` has no commit after 2026-09-07 (`git log -3 -- src/testing src/types/player.ts`: newest `79d0e52`, 2026-09-07), older than the previous review's page commit `cc9b94c` (2026-09-28), so the previous claim rows still stand; each was re-read below where the tag changed its meaning.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5` (read only): `src/testing/*.ts`, `src/types/player.ts`, `src/adapters/event-bus/default.ts`, `package.json`. Tag meanings: `src/lib/mdx/rehype.ts:110` (`var` = a value), `:121-125` (`fn` = a function or method), `:126-128` (`key` = an object key).

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 54 | `src/testing/stub-player.ts:428` (`cueParsers(): ReadonlyArray<ICueParser>`), a method; the row's own signature is `() => ReadonlyArray<ICueParser>`; `rehype.ts:126-128` | `cueParsers` is a method, like every other row of this table, which the page tags `fn`. The tag `key cueParsers` renders it as an object key. | Line 54: change `` `key cueParsers` `` to `` `fn cueParsers` ``. |
| 2 | 101 | `src/types/player.ts:341-342` (`baseUrl(): string \| undefined; baseUrl(url: string): void;`), `:349` (`audioContext(): AudioContext \| undefined`); `stub-player.ts:145` (`dispatching(): ReadonlyArray<string>`); the contract calls them as methods: `contract.ts:197-199,212-225,229-231` | `dispatching`, `baseUrl` and `audioContext` are `IPlayer` methods, and the contract suite tests them by calling them. The page tags them `key`, which renders them as object keys. | Line 101: change `` `key dispatching` ``, `` `key baseUrl` ``, `` `key audioContext` `` to `` `fn dispatching` ``, `` `fn baseUrl` ``, `` `fn audioContext` ``. |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L13-14 import from `/testing`; not on the package root | `package.json:188-191` (`"./testing"`); `grep -n testing src/index.ts`: no output | Supported |
| L16-28 the nine named imports | `testing/index.ts:26-45` | Supported |
| L30-31 `describePlugin`, `describePluginAgainst`, `runIPlayerContract` read Vitest globals from `globalThis`; the contract also needs `expect`; `test.globals: true` (`var globalThis` is a value; tag correct) | `describe-plugin.ts:35-36`; `describe-plugin-against.ts:30-31`; `contract.ts:44-45` | Supported |
| L35-37 `StubPlayer` is an `IPlayer` double; `createStubPlayer` is its factory | `stub-player.ts:89,935-940` | Supported |
| L43 `StubPlayer` class line and constructor opts | `stub-player.ts:89,108` | Supported |
| L44 `createStubPlayer` signature; same as `new StubPlayer(opts)` | `stub-player.ts:935-940` | Supported |
| L50 `setPhase(next)`, emits `phase` (`str phase` is an event name; tag correct) | `stub-player.ts:130-139` | Supported |
| L51-52 `pushDispatch`, `popDispatch` | `stub-player.ts:172-179` | Supported |
| L53 `setAudioContext` | `stub-player.ts:195` | Supported |
| L54 `cueParsers` `() => ReadonlyArray<ICueParser>` | `stub-player.ts:428` | Supported as a fact; tag wrong (finding 1) |
| L55 `reset` restores defaults and clears listeners | `stub-player.ts:897-924` (`off('all')`, fields reset) | Supported (settled by the previous review) |
| L57-59 no plugin tracking; `getPlugin` / `getPluginById` return `undefined`; `addPlugin` no-op returning `this` | `stub-player.ts:459-466,725-729` | Supported |
| L60 `describePlugin` wires the plugin itself | `stub-player.ts:79-81` | Supported |
| L64-65 fresh stub and plugin per test; `initialize`, translations, `use()`, then `dispose` and leak assertion unless skipped | `describe-plugin.ts:120-181` (previous review; source unchanged) | Supported |
| L71-73 `describePlugin` signature, `PluginTestContext`, `DescribePluginOptions` (`var fn` names the positional parameter `fn`; tag correct) | `describe-plugin.ts:53-78,102-106` | Supported |
| L77-78 real player from a required factory; `addPlugin`, `getPlugin`, removal, dispose unless `teardown` (`fn teardown` is an option holding a function) | `describe-plugin-against.ts:49-61,92-96,115-161` | Supported |
| L84-86 `describePluginAgainst` signature, context, options | `describe-plugin-against.ts:44-61,92-96` | Supported |
| L90-93 one concrete `IPlayer`; label, create factory, optional teardown | `contract.ts:92-96` | Supported |
| L99 `runIPlayerContract` signature | `contract.ts:92-96` | Supported |
| L101 suite covers identity, event surface, phase and `dispatching`, `baseUrl`, `audioContext`, experimental, i18n, cue parsers | `contract.ts:117,132,192-209,212,229,235,258,306` | Supported as a fact; tags wrong (finding 2) |
| L106-107 snapshots before setup, after setup, after teardown; depends on `listenerCount()`; `EventEmitter` exposes it | `leak-harness.ts:30-44`; `event-bus/default.ts:276` | Supported |
| L108 Adapter: Event Bus link | `plugins-adapters/adapter-event-bus.mdx` exists | Supported |
| L114 `countAllListeners` returns `listenerCount()` or throws `TypeError` | `leak-harness.ts:30-44` | Supported |
| L115-117 `assertNoListenerLeak`, `assertNoListenerLeakOverCycles` (default `cycles` 5; `key cycles` is an option key), `LeakAssertionResult` | `leak-harness.ts:16-22,76-82,130-138` (previous review; source unchanged) | Supported |
| L121-122 `mockFetch` replaces `Plugin.fetch`; assign `mock.fetch` | `mock-fetch.ts:35-51,71-94` | Supported |
| L128-133 `mockFetch`, `MockFetch`, `MockFetchCall`, `MockFetchResponse`; empty queue resolves `undefined` as `T` | `mock-fetch.ts:26-51,71-94` | Supported |
| L137-147 `PlayerTestInternals` fields; cast `as unknown as`, never `as any` (`key _phase` is a field; tag correct) | `player-test-internals.ts:20-35` | Supported |

## Notes

- `key` tag audit: `key cueParsers` (L54) and `key dispatching`, `key baseUrl`, `key audioContext` (L101) name methods (findings 1-2). `key cycles` (L116) and `key _phase` (L139) name an option key and a field; correct. No positional parameter is tagged `key`; `fn` is tagged `var` at L72 and L85, correct for a positional parameter.
- Source comment drift, not a page defect: the docblock at `leak-harness.ts:24-29` says `countAllListeners` "returns `0`" when `listenerCount` is missing; the code at `:33-43` throws a `TypeError`. The page follows the code.
