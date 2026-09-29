# Fact check: /nomercy-player-core/plugins-adapters/adapter-preload-strategy
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-preload-strategy.mdx
Reviewed-SHA: b627493f2b572807

Source (nomercy-player-core `e3d2de5`): `src/adapters/preload/default.ts`, `index.ts`; `src/core/mixins/preload-strategy-mixin.ts`, `lifecycle.ts`; `src/core/index.ts`; `src/types/config.ts`, `events.ts`; `package.json` exports. Example: `src/examples/core-adapter-preload-strategy.ts`. Issue #18 (read with `gh issue view 18`).

Method: read the page, the example and the sources above. Type check of the example against the package SOURCE (scratch tsconfig outside the repo, `paths` mapped to `packages/player-web/*/src`): exit 0, 0 errors. Example `:26-30` traced by hand: `95 >= 100 - 10` is `true` (`default.ts:236`). Orchestration traced in `lifecycle.ts:798-855,1010-1062`; not run. No URLs.

## Findings

1. **Page line 33: "The player asks `fn shouldPreload` on every `str time` event while a next item is queued." The code asks it on every `time` event, with or without a next item.**
   `lifecycle.ts:830-839`: `nextItem` is `self._queueList.peekNext() ?? null`, and the condition is `!self._preloadFired && self._preloadStrategy.shouldPreload(context) && nextItem !== null`, so `shouldPreload` runs before the null check and receives `nextItem: null` when nothing is queued. (The interface comment at `default.ts:101-102` says "while a next item is queued"; the code is the truth.)
   Fix: "The player asks `fn shouldPreload` on every `str time` event until the first yes. `key nextItem` is `null` when nothing is queued, and a yes then starts nothing."

2. **Page line 63: "a `cls PreloadAsset` holds ... an optional `key mode`." The player never reads `mode`.**
   `default.ts:85` declares `mode?: 'metadata' | 'auto'` (doc: "Default 'metadata'"), but `_runPreload` sends every asset as `new Request(asset.url, { method: 'HEAD', mode: 'no-cors' })` and uses only `url` and `category` (`lifecycle.ts:1014-1020,1035-1039`). A grep for `.mode` reads in `src/` (excluding tests and stream/ABR code) finds no reader. This is known issue #18, point 1; the page may state it, but it must not list the field as if it had an effect.
   Fix: "A `cls PreloadAsset` holds a `key url`, a `key category` string, and an optional `key mode`. The player does not read `key mode` yet ([#18](https://github.com/NoMercy-Entertainment/nomercy-player-core/issues/18))."

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 strategy decides when the next item warms and which assets | `default.ts:99-122` | Supported |
| L13 two questions: is it time, what should load | `default.ts:107,114`; note: only `shouldPreload` is asked per `time` event, `assetsToPreload` once (page L35 says so) | Supported |
| L14 `setup({ preloadStrategy })` or `setPreloadStrategy` | `config.ts:455`; `lifecycle.ts:799-801`; `preload-strategy-mixin.ts:42-46`; mixed in `core/index.ts:128` | Supported |
| L16 snippet imports | `package.json` exports `"./adapters/preload"`; `preload/index.ts:9-15` | Supported |
| L21 default is `DefaultPreloadStrategy(preloadLeadSeconds)`, 10 by default | `lifecycle.ts:806-808`; `config.ts:410` | Supported |
| L22 yes once within lead seconds of the end | `default.ts:236` | Supported |
| L23 no when no next item or duration unknown | `default.ts:231-234`; `default.ts:38` (`0` when not known) | Supported |
| L25 default `assetsToPreload` returns `[]` | `default.ts:239-241` | Supported |
| L26 no assets: `preloadStart` then `preloadComplete` at once | `lifecycle.ts:1014-1028` | Supported |
| L28 example `true` | `default.ts:236` | Supported |
| L33 asked on every `time` event while a next item is queued | see Finding 1 | **Unsupported** |
| L34 after first yes, stops asking until current item changes | `lifecycle.ts:811-816,837-838` (`_preloadFired` reset on `item`) | Supported |
| L35 `assetsToPreload` once, then request each asset | `lifecycle.ts:1010-1062` | Supported |
| L42-47 event payloads | `types/events.ts:490-499`; emits `lifecycle.ts:1014-1020,1026,1046-1053,1059` | Supported |
| L49 `HEAD`, `no-cors`, global `fetch` | `lifecycle.ts:1035-1039` (known #19: fetch not injectable) | Supported |
| L50 on item change: `cancel` and drop in-flight results | `lifecycle.ts:811-816` (`cancel`, `_preloadEpoch += 1`), epoch checks `:1031,1043,1057` | Supported |
| L54 every member of the interface | `default.ts:99-122` (3 members) | Supported |
| L58-59 `shouldPreload(PreloadContext)`, `assetsToPreload(item)` | `default.ts:107,114` | Supported |
| L60 `cancel` on item change and on strategy replace | `lifecycle.ts:814`; `preload-strategy-mixin.ts:43` | Supported |
| L62 `PreloadContext` fields, seconds, `nextItem` or `null` | `default.ts:35-42` | Supported |
| L63 `PreloadAsset` fields | `default.ts:67-86`; see Finding 2 | **`mode` unsupported as an effect** |
| L67-68 extend default; constructor takes lead seconds | `default.ts:221-226` | Supported |
| L70 `PosterPreload` overrides `assetsToPreload` | type check exit 0 | Supported |
| L75 `LastTenPercent implements IPreloadStrategy` | type check exit 0 | Supported |

## Notes

- Example `:69` has `// ...` inside the `setup` call. No complete `setup` call appears earlier on this page; reported per the role, for the reader reviewer to judge.
- Not on the page, seen while tracing: `fetch(request).catch(() => {})` (`lifecycle.ts:1039`) swallows fetch failures, so a failed asset still counts as loaded and `preloadError` fires only when `new Request` throws. The page makes no claim about when `preloadError` fires, so this is not a page finding. Issue #18 does not mention it; worth adding to #18.
