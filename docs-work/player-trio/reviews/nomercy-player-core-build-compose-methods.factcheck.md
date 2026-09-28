# Fact check: /nomercy-player-core/build/compose-methods
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/build/compose-methods.mdx
Reviewed-SHA: a19b03f824aed51d

Source: `packages/player-web/nomercy-player-core/src` (`core/compose.ts`, `core/constructor.ts`, `core/index.ts` `playerCoreMethods` order, `core/state.ts` `initPlayerCoreState`). Example: `src/examples/core-build-compose.ts`. Method: read page, example, and source; no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Word `kit`: none on the page or in the example.

## Gate checks

| Gate | Result |
| --- | --- |
| Mount sentence: `initPlayerCoreState` with `{ className }` equal to the string passed to `resolvePlayerConstructor` | Pass (page `:51`; `state.ts:439` opts `{ className: string }`; `constructor.ts:58` third arg `className`; example `'ComposedPlayer'` in both places) |
| `playerCoreMethods` order matches `core/index.ts` | Pass (25 entries, same order) |
| Error codes match `resolvePlayerConstructor` | Pass |
| No `kit` on page or example | Pass |
| No em dash / en dash on page or example | Pass |
| Example `dispose` typed `() => Promise<void>` | Pass (`core-build-compose.ts:44`) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `composeMixins(prototype, ...modules): void` | `compose.ts:38` | Supported |
| Copies own property descriptors via `getOwnPropertyDescriptors` + `defineProperty` | `compose.ts:40-43` | Supported |
| Getters/setters land as accessors; not triggered during copy | `compose.ts:26-28,40-43` | Supported |
| Later modules win on key collisions; list specific after general | `compose.ts:22-24` | Supported |
| Calling the same module twice is safe | `compose.ts:30-31` | Supported |
| `resolvePlayerConstructor` signature and `PlayerCtorResolution` | `constructor.ts:22-24,55-59` | Supported |
| Three forms: string id, numeric index, `undefined` | `constructor.ts:33-36,55-56` | Supported |
| `undefined`: first registered; throws `core:player/no-element` if empty | `constructor.ts:60-71` | Supported |
| Number: insertion-order index; throws `core:player/not-found` if out of range | `constructor.ts:74-82` | Supported |
| String: `existing` if registered; else DOM lookup requiring `<div>` | `constructor.ts:89-109` | Supported |
| String miss: `core:player/element-missing` or `core:player/element-not-div` | `constructor.ts:98-102` | Supported |
| Invalid id type: `core:player/invalid-id-type` | `constructor.ts:85-87` | Supported |
| `document` lookup guarded for SSR | `constructor.ts:52-53,97` | Supported |
| On `mount`: `initPlayerCoreState(this, { className })` with same string as `resolvePlayerConstructor` third arg; bind `playerId`/`container`; register | Page `:51-52`; `state.ts:439-441`; example `:49,54-57` | Supported |
| On `existing`: return registered instance | Example `:50-52`; `constructor.ts:90-94` | Supported |
| `playerCoreMethods` exported from package; `as const` tuple for compose | `index.ts:103-129` | Supported |
| Listed mixin order matches source tuple | Page `:59` vs `index.ts:104-128` | Supported |
| Example stamps `...playerCoreMethods` after class | Example `:63` | Supported |
| Example `dispose: () => Promise<void>` | Example `:44` | Supported |
| Next link Auth Fetch path | Path shape only; not re-verified against nav | Supported (path as written) |
