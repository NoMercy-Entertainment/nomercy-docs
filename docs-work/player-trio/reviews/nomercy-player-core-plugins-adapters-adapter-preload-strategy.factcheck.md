# Fact check: /nomercy-player-core/plugins-adapters/adapter-preload-strategy
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-preload-strategy.mdx
Reviewed-SHA: f2db4e6528cda09d
Previous verdict: FAIL (Reviewed-SHA e32a0e574c3a3577); fixes verified: finding 1 (line 35 now says the player stops asking "until the current item changes or `fn setPreloadStrategy` installs a new strategy"; true per `src/core/mixins/preload-strategy-mixin.ts:42-45` (`cancel()`, `_preloadFired = false`, swap) and `src/core/mixins/lifecycle.ts:837` (asks only while `!_preloadFired`)). The fresh review found no new gap.

Source: nomercy-player-core `src` at `e3d2de5` (working tree clean; `git diff --stat 5ed4538 HEAD -- src` is empty, so the pinned `5ed4538` src is the same). Example `src/examples/core-adapter-preload-strategy.ts`.

Method: re-read the whole page; `git diff 26055e2~1 26055e2` for it (one line, line 35); read `src/core/mixins/lifecycle.ts:798-855,1000-1066`, `src/core/mixins/preload-strategy-mixin.ts:37-46`, `src/adapters/preload/default.ts:30-125,220-245`, `src/adapters/preload/index.ts`, `src/types/config.ts:410,455`, `src/types/events.ts:487-499`, `package.json:84-86`. Type-checked the three examples (this one, `core-adapter-media-element.ts`, `core-build-add-a-plugin.ts`) against the package SOURCE with a scratch tsconfig outside the repo (same `paths` as `tsconfig.examples.json`): `tsc` exit 0. Snippet ranges `16-22`, `24-30`, `32-44`, `46-59`, `67-78` match `src/examples/snippet-ranges.lock.json` and the example (read-only script: "ranges ok=5 bad=0"). Hand-written ts/js blocks on the page: 0. Orchestration traced, not run.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 strategy decides when the next item warms and which assets are requested | `default.ts:99-121` (`shouldPreload`, `assetsToPreload`, `cancel`); `lifecycle.ts:1011,1030-1039` | Supported |
| L13 two questions: is it time yet, and what should load | `default.ts:107,114` | Supported |
| L14 `setup({ preloadStrategy })` or `setPreloadStrategy` | `src/types/config.ts:455`; `lifecycle.ts:799-801`; `preload-strategy-mixin.ts:42-46`; mixin exported and composed `src/core/index.ts:34,128` | Supported |
| L16 snippet imports | `package.json:84-86` `./adapters/preload`; `src/adapters/preload/index.ts` exports `IPreloadStrategy`, `PreloadAsset`, `PreloadContext` (types), `DefaultPreloadStrategy`; tsc exit 0 | Supported |
| L21 default `DefaultPreloadStrategy(preloadLeadSeconds)`, 10 by default | `lifecycle.ts:806-808` (`?? 10`); `config.ts:410` | Supported |
| L22 yes within lead seconds of the end | `default.ts` `return currentTime >= duration - this._leadSeconds` | Supported |
| L23 no without next item or when duration not known | `default.ts` `nextItem === null` / `duration <= 0` return false; `default.ts:38` ("`0` when not yet known") | Supported |
| L25 default `assetsToPreload` returns `[]` | `default.ts` `assetsToPreload(_item) { return []; }` | Supported |
| L26 no assets: `preloadStart` then `preloadComplete` at once | `lifecycle.ts:1014-1028` | Supported |
| L33 asked on every `time` event | `lifecycle.ts:828,837,851` | Supported |
| L34 `nextItem` `null` when nothing queued; a yes then starts nothing | `lifecycle.ts:830,837` (`&& nextItem !== null`) | Supported |
| L35 stops asking until the item changes or `setPreloadStrategy` installs a new strategy | `lifecycle.ts:811-812,837-838`; `preload-strategy-mixin.ts:44` | Supported (fix verified) |
| L36 `assetsToPreload` once, then each asset requested | `lifecycle.ts:839`, `:1011`, `:1066` | Supported |
| Event table, 4 rows and payloads | `src/types/events.ts:490,493,496,499`; emits `lifecycle.ts:1014,1026,1046,1053,1059` | Supported |
| L50 `HEAD`, `no-cors`, global `fetch` | `lifecycle.ts:1035-1039` | Supported |
| L51 on item change: `cancel`, in-flight results dropped | `lifecycle.ts:814,816` (epoch bump); epoch checks `:1031,1043,1059` | Supported |
| Interface table, 3 members | `default.ts:99-121` | Supported |
| L61 `cancel` on item change and on replace | `lifecycle.ts:814`; `preload-strategy-mixin.ts:43` | Supported |
| L63 `PreloadContext` fields, seconds, `nextItem` or `null` | `default.ts:35-42` | Supported |
| L64 `PreloadAsset` `url`, `category` string, optional `mode` | `default.ts:67-86` | Supported |
| L65 player does not read `mode` yet (#18) | `lifecycle.ts:1014-1020,1035-1038` (only `url`, `category` read) | Supported |
| L69-70 extend the default; constructor takes the lead in seconds | `default.ts:226` `constructor(private readonly _leadSeconds: number = 10)` | Supported |
| L72 snippet 32-44 extends the default and names a poster asset | example `:32-44`; tsc exit 0 | Supported |
| L75-77 implement the interface when the moment changes | example `:46-59`; tsc exit 0 | Supported |
| L38 snippet 67-78 setup, `preloadStart` listener, swap | example `:67-78`; tsc exit 0 | Supported |
| See also: Quality | `src/content/nomercy-player-core/en/plugins-adapters/adapter-quality.mdx` exists (in the review set) | Supported |

## Notes

- `setPreloadStrategy` does not bump `_preloadEpoch` (`preload-strategy-mixin.ts:42-46`), so requests started by the old strategy still emit progress. Settled: filed as nomercy-player-core #18. The page makes no claim that results are dropped on replace.
- `fetch(request).catch(() => {})` (`lifecycle.ts:1039`) swallows network errors, so `preloadError` fires only when `new Request` throws. The page does not claim when `preloadError` fires; no finding.
- Carried for the reader reviewer: example `:69` has `// ...` inside the `setup` call; no complete `setup` earlier on this page.
