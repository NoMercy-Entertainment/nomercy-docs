# Fact check: /nomercy-player-core/build/compose-methods
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/build/compose-methods.mdx
Reviewed-SHA: a807aaf9a3c8cf11

Source: `packages/player-web/nomercy-player-core/src` (`core/compose.ts`, `core/constructor.ts`, `core/index.ts` `playerCoreMethods`, `core/state.ts` `initPlayerCoreState`). Example: `src/examples/core-build-compose.ts`. Cross-check: music/video players pass the same `className` string to `resolvePlayerConstructor` and `initPlayerCoreState`. Method: read page, example, and source; no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example.

## Gate checks

| Gate | Result |
| --- | --- |
| Mount sentence: `initPlayerCoreState` with `{ className }` equal to the string passed to `resolvePlayerConstructor` | Pass (page `:53`; `state.ts:439` opts `{ className: string }`; `constructor.ts:58` third arg `className`; example `'ComposedPlayer'` in both places; music/video same pattern) |
| Error codes match `resolvePlayerConstructor` | Pass (`no-element`, `not-found`, `element-missing`, `element-not-div`, `invalid-id-type`) |
| `playerCoreMethods` exists and is what you spread into `composeMixins` | Pass (`core/index.ts:103-129`; example `:63`) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Example `dispose` typed `() => Promise<void>` | Pass (`core-build-compose.ts:44`) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `composeMixins(prototype, ...modules): void` | `compose.ts:38` | Supported |
| Getters/setters copied as accessors; not triggered during copy | `compose.ts:26-28,40-43` | Supported |
| Later bundles win on key collisions; list specific after general | `compose.ts:22-24` | Supported |
| Calling the same bundle twice is safe | `compose.ts:30-31` | Supported |
| `resolvePlayerConstructor` signature and `PlayerCtorResolution` | `constructor.ts:22-24,55-59` | Supported |
| Three forms: string id, numeric index, or nothing (`undefined`) | `constructor.ts:33-36,55-56` | Supported |
| Nothing: first registered; empty registry throws `core:player/no-element` | `constructor.ts:60-71` | Supported |
| Number: insertion-order index; out of range throws `core:player/not-found` | `constructor.ts:74-82` | Supported |
| Known string returns that player | `constructor.ts:89-94` | Supported |
| New string: `document.getElementById`, requires a `div` | `constructor.ts:97-109` | Supported |
| Missing element: `core:player/element-missing` | `constructor.ts:98-99` | Supported |
| Non-div: `core:player/element-not-div` | `constructor.ts:101-102` | Supported |
| Other id type: `core:player/invalid-id-type` | `constructor.ts:85-87` | Supported |
| Document lookup skipped when no `document` (SSR) | `constructor.ts:52-53,97` | Supported |
| On mount: `initPlayerCoreState(this, { className })` with same string as `resolvePlayerConstructor` third arg; store id/`div`; register | Page `:53-54`; `state.ts:439-441`; example `:49,54-57` | Supported |
| If id already registered, return existing player | Example `:50-52`; `constructor.ts:89-94` | Supported |
| `playerCoreMethods` is the set spread into `composeMixins` | `core/index.ts:97-98,103-129`; example `:63` | Supported |
| Shared behavior includes lifecycle, queue, transport, time, volume, plugins, auth | Those mixins present in `playerCoreMethods` (`core/index.ts:104-117`); page lists categories, not full tuple order | Supported |
| Example stamps `...playerCoreMethods` after class; no media backend of its own | Example `:14-17,63-66` | Supported |
| Same path used by video and music players | music `index.ts:325,330,773`; video `index.ts:371,376,1276` | Supported |
| Next link Auth Fetch path | Path shape only; not re-verified against nav | Supported (path as written) |
