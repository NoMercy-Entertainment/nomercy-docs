# Fact check: /nomercy-player-core/build/backend-contract
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/build/backend-contract.mdx
Reviewed-SHA: 14df2fd5fa331270
Previous verdict: FAIL; fixes verified: finding 1 (load is required), finding 2 (bridgeBackendPlayState and playing), finding 3 (sample host note)

Source: nomercy-player-core `src/` at `e3d2de5` (equals the pinned `5ed4538` for `src/`). Method: read the previous verdict, the fix diff (`git show b7190ca`), the whole page, its example and the source. `npm run check:examples` (published dist 2.2.1): `Autoplay OK: 127 example files checked.`, exit 0. The example also type-checks against the package source (scratch tsconfig outside the repo, `tsc` exit 0; negative control gave `TS2322`, exit 2).

## Fix verification

| # | Page line | Now says | Source | Status |
| --- | --- | --- | --- | --- |
| 1 | 20-21, 52-54 | `load` is required, else `core:player/backend-missing`; other missing methods are no-ops | `core/mixins/loading.ts:180-182` (throws when `typeof backend.load !== 'function'`); every other call site uses `?.`: `transport.ts:60,149,192,216`, `time.ts:93,114,123,133,217`, `volume.ts:56,62,63,125,133`, `player-state.ts:195,231`; `unload`, `dispose`, `outputProtectionState` have no core caller (grep) | Verified fixed |
| 2 | 65 | copies play and pause onto the flag, calls `onPlaying` on each playing event | `adapters/media-element/backend-lifecycle-bridge.ts:85-91` (play sets), `:93-95` (playing only calls `onPlaying`), `:97-103` (pause clears) | Verified fixed |
| 3 | 85 | "The host in the sample stands for your own API." | example `core-build-backend-contract.ts:89` (`https://api.example.com`, used only as a string prefix test) | Verified fixed |

## Claim table (fresh)

| Claim | Supported by | Status |
| --- | --- | --- |
| Transport, time, volume call what `backend` returns; optional chaining | `player-state.ts:115-117`; call sites above | Supported |
| No setup field installs a backend | `types/config.ts` has no backend field (only `storage`) | Supported |
| `MediaElementBackend` shared base; core does not construct one; `super(element, ownsElement, backendId)` | `MediaElementBackend.ts:83,96,111-116` | Supported |
| Volume clamps 0..1, then square-law gain | `MediaElementBackend.ts:259-260` (`perceptualGain(clamped)`) | Supported |
| Base lacks load, unload, dispose, state, buffered, outputProtectionState | `MediaElementBackend.ts:92-94` | Supported |
| `BACKEND_STATE` six values | `backend-state.ts:9-16` | Supported |
| DOM bridges map loadstart, loadedmetadata, play, pause, ended, error; pause leaves idle and error | `helpers.ts:207-226` | Supported |
| `loadstart` resets by default; `resetEvents`, `pauseGuard` | `backend-lifecycle-bridge.ts:61,67,105-116` | Supported |
| `AuthHeaderProvider` takes URL, returns header or nothing; synchronous; no fetch | `MediaElementBackend.ts:45-58` | Supported |
| `attachHlsOrFallback` attaches hls.js or sets `src`; no default merge | `helpers.ts:83-113` | Supported |
| `isHls`, `supportsNativeHls`, `resolveOrCreateMediaElement`, `resetMediaElement` | `helpers.ts:29,40,241,269` | Supported |
| Link: build/compose-methods | file exists | Supported |

## New findings

None.

## Notes (not failures)

- Page 71 tags `AuthHeaderProvider` with `cls`. It is a type alias (`MediaElementBackend.ts:58`), not a class; the `cls` tag is the class-or-type color (`src/lib/mdx/rehype.ts:117-120`), so this is correct.
