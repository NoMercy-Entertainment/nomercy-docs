# Fact check: /nomercy-player-core/plugins-adapters/adapter-preload-strategy
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-preload-strategy.mdx
Reviewed-SHA: e32a0e574c3a3577
Previous verdict: FAIL (Reviewed-SHA bfb55a42638bd8c5); fixes verified: finding 1 (line 13 no longer ties both questions to each `time` event; true per `src/core/mixins/lifecycle.ts:837-839` and `:1011`), finding 2 (lines 33-35 now say a yes without a next item starts nothing and only a yes with a next item stops the asking; true per `lifecycle.ts:837-838`). The fresh review found one gap in the fixed line 35 (finding 1).

Source: nomercy-player-core `src` at `e3d2de5`. Example `src/examples/core-adapter-preload-strategy.ts` (no change since `7f53a5d`: `git diff 7f53a5d --stat -- src/examples` is empty).

Method: re-read the whole page, `git diff 7f53a5d` for it, `src/core/mixins/lifecycle.ts:798-855,1005-1066`, `src/core/mixins/preload-strategy-mixin.ts:37-46`, `src/adapters/preload/default.ts`, `src/adapters/preload/index.ts`. Searched every writer of `_preloadFired` (`grep -rn "_preloadFired\s*=" src`): `lifecycle.ts:812`, `lifecycle.ts:838`, `preload-strategy-mixin.ts:44`, `state.ts:502`. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo: `tsc` exit 0. Snippet ranges `16-22`, `24-30`, `32-44`, `46-59`, `67-78` match the lock and the example ("5 OK, 0 bad"). Orchestration traced, not run.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 35 | `src/core/mixins/preload-strategy-mixin.ts:42-45` (`setPreloadStrategy`: `this._preloadStrategy.cancel(); this._preloadFired = false; this._preloadStrategy = strategy;`); `lifecycle.ts:837` (asks while `!_preloadFired`) | "After a yes with a next item queued, it stops asking until the current item changes." A call to `fn setPreloadStrategy` also clears `_preloadFired`, so the player asks the new strategy on the next `time` event, before the item changes, and can start a second preload of the same next item. Page line 14 tells the reader to use `fn setPreloadStrategy`, so the case is reachable. | Replace line 35 with: "After a yes with a next item queued, it stops asking until the current item changes or `fn setPreloadStrategy` installs a new strategy." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 strategy decides when the next item warms and which assets | `default.ts:99-121` (`shouldPreload`, `assetsToPreload`, `cancel`) | Supported |
| L13 two questions: is it time yet, and what should load | `default.ts:107,114` | Supported (fix verified) |
| L14 `setup({ preloadStrategy })` or `setPreloadStrategy` | `src/types/config.ts:455`; `lifecycle.ts:799-801`; `preload-strategy-mixin.ts:42-46` | Supported |
| L16 imports | `package.json:84` `./adapters/preload`; `adapters/preload/index.ts` exports | Supported |
| L21 default `DefaultPreloadStrategy(preloadLeadSeconds)`, 10 by default | `lifecycle.ts:806-808`; `config.ts:410` | Supported |
| L22-23 yes within lead seconds; no without next item or duration | `default.ts:231-236` | Supported |
| L25-26 empty assets; `preloadStart` then `preloadComplete` at once | `default.ts:239`; `lifecycle.ts:1013-1028` | Supported |
| L33 asked on every `time` event | `lifecycle.ts:828,837,851` | Supported |
| L34 `nextItem` is `null` when nothing queued, a yes then starts nothing | `lifecycle.ts:830,837` | Supported |
| L35 after a yes with a next item, stops asking until the item changes | see finding 1 | FAIL |
| L36 `assetsToPreload` once, then request each asset | `lifecycle.ts:1011,1030-1066` | Supported |
| Event table (4 rows) | `src/types/events.ts:490-499` | Supported |
| L50 `HEAD`, `no-cors`, global `fetch` | `lifecycle.ts:1035-1039` | Supported (issue #19) |
| L51 on item change: `cancel`, in-flight results dropped | `lifecycle.ts:811-816` (epoch bump); epoch checks `:1031,1043,1057` | Supported |
| Interface table (3 members); `cancel` on item change and on replace | `default.ts:99-121`; `lifecycle.ts:814`; `preload-strategy-mixin.ts:43` | Supported |
| L63 `PreloadContext` fields, seconds, `nextItem` or `null` | `default.ts:35-41` | Supported |
| L64 `PreloadAsset` `url`, `category` string, optional `mode` | `default.ts:67-85` | Supported |
| L65 player does not read `mode` yet (#18) | `lifecycle.ts:1014-1020,1035-1038` | Supported |
| L69-70 extend the default; constructor takes the lead in seconds | `default.ts:226` | Supported |
| L75-77 implement the interface | example `:46-59`; type check exit 0 | Supported |
| See also: Quality | `adapter-quality.mdx` exists | Supported |

## Notes

- `setPreloadStrategy` does not bump `_preloadEpoch` (`preload-strategy-mixin.ts:42-46`), so requests started by the old strategy still emit `preloadProgress` and `preloadComplete`. The doc comment at `preload-strategy-mixin.ts:40` ("Cancels any in-flight prefetch first") only holds for the strategy's own `cancel`. The page does not claim the results are dropped on replace; no page finding. Possible code issue for the owner; not filed by this review.
- Carried: example `:69` has `// ...` inside the `setup` call, no complete `setup` earlier on this page; for the reader reviewer.
