# Fact check: /nomercy-player-core/plugins-adapters/adapter-preload-strategy
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-preload-strategy.mdx
Reviewed-SHA: bfb55a42638bd8c5
Previous verdict: FAIL; fixes verified: finding 1 (`shouldPreload` is now asked on every `time` event and `nextItem` can be `null`, page lines 33-34; true per `lifecycle.ts:828-837`), finding 2 (`mode` is now stated as unread, with a link to #18, page line 65; `lifecycle.ts:1014-1039` reads only `url` and `category`)

Source: nomercy-player-core `src` at `e3d2de5`. Example `src/examples/core-adapter-preload-strategy.ts` (unchanged since the previous review).

Method: re-read the whole page and `src/core/mixins/lifecycle.ts:798-855,1010-1064`, `src/adapters/preload/default.ts`. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo): `tsc` exit 0. Snippet ranges `16-22`, `24-30`, `32-44`, `46-59`, `67-78` match the lock and the example (5 of 5 OK). Orchestration traced, not run.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 13 | `src/core/mixins/lifecycle.ts:837-839` (`shouldPreload` per `time` event, then `_runPreload` once); `lifecycle.ts:1011` (`assetsToPreload` called once, inside `_runPreload`) | "The strategy answers two questions on each `str time` event." Only `fn shouldPreload` is asked per `time` event, and not at all after a yes that started a preload. `fn assetsToPreload` is asked once per preload. Page line 36 says so itself, so line 13 contradicts it. | Replace line 13 with: "The strategy answers two questions: is it time yet, and what should load." |
| 2 | 34-35 | `lifecycle.ts:837-838` (`if (!self._preloadFired && self._preloadStrategy.shouldPreload(context) && nextItem !== null) { self._preloadFired = true; ...`) | Line 33 says "until the first yes" and line 35 "After the first yes, it stops asking". When `nextItem` is `null`, a yes does not set `_preloadFired`, so the player keeps asking on every `time` event. Only a yes with a next item queued stops the asking. A custom strategy that says yes without a next item hits this; the default never does (`default.ts:231-232`). | Replace lines 33-35 with: "The player asks `fn shouldPreload` on every `str time` event. `key nextItem` is `null` when nothing is queued, and a yes then starts nothing. After a yes with a next item queued, it stops asking until the current item changes." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 strategy decides when the next item warms and which assets | `src/adapters/preload/default.ts` `IPreloadStrategy` (`shouldPreload`, `assetsToPreload`, `cancel`) | Supported |
| L13 two questions on each `time` event | see finding 1 | FAIL |
| L14 `setup({ preloadStrategy })` or `setPreloadStrategy` | `src/types/config.ts:455`; `lifecycle.ts:799-801`; `src/core/mixins/preload-strategy-mixin.ts:42-46` | Supported |
| L16 imports | `package.json:84` `./adapters/preload`; `adapters/preload/index.ts` | Supported |
| L21 default `DefaultPreloadStrategy(preloadLeadSeconds)`, 10 by default | `lifecycle.ts:806-808`; `config.ts:410` | Supported |
| L22-23 yes within lead seconds; no without next item or duration | `default.ts` `shouldPreload` (`nextItem === null` false, `duration <= 0` false, `currentTime >= duration - lead`) | Supported |
| L25-26 empty assets; `preloadStart` then `preloadComplete` at once | `default.ts` `assetsToPreload` returns `[]`; `lifecycle.ts:1013-1028` | Supported |
| L33 asked on every `time` event | `lifecycle.ts:828-837,851` | Supported (fix verified) |
| L34 `nextItem` is `null` when nothing queued, a yes starts nothing | `lifecycle.ts:830,837` | Supported (fix verified) |
| L33 "until the first yes" / L35 "After the first yes, it stops asking" | see finding 2 | FAIL |
| L35 asking resumes when the current item changes | `lifecycle.ts:811-812,823` (`_preloadFired = false` on `item`) | Supported |
| L36 `assetsToPreload` once, then request each asset | `lifecycle.ts:1011,1030-1064` | Supported |
| Event table (4 rows) | `src/types/events.ts:490-499` | Supported |
| L50 `HEAD`, `no-cors`, global `fetch` | `lifecycle.ts:1035-1039` (issue #19) | Supported |
| L51 on item change: `cancel`, in-flight results dropped | `lifecycle.ts:811-816` (epoch bump); epoch checks `:1031,1043,1057` | Supported |
| Interface table (3 members); `cancel` on item change and on replace | `default.ts` `IPreloadStrategy`; `lifecycle.ts:814`; `preload-strategy-mixin.ts:43` | Supported |
| L63 `PreloadContext` fields | `default.ts` `PreloadContext` (`currentTime`, `duration`, `nextItem: BasePlaylistItem | null`) | Supported |
| L64 `PreloadAsset` `url`, `category` string, optional `mode` | `default.ts` `PreloadAsset` (`category` is a string union with `string & {}`) | Supported |
| L65 player does not read `mode` yet (#18) | `lifecycle.ts:1014-1020,1035-1038`; issue #18 exists (`gh issue list`: "fix(preload): asset fetch skips auth and urlResolver, ...") | Supported (fix verified) |
| L69-70 extend the default; constructor takes the lead in seconds | `default.ts` `constructor(private readonly _leadSeconds: number = 10)` | Supported |
| L75-77 implement the interface | example `:46-59`; type check exit 0 | Supported |
| See also: Quality | `src/content/nomercy-player-core/en/plugins-adapters/adapter-quality.mdx` exists (`ls`) | Supported |

## Notes

- Carried: example `:69` has `// ...` inside the `setup` call, no complete `setup` earlier on this page; for the reader reviewer.
