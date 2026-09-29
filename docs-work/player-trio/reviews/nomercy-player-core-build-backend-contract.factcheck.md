# Fact check: /nomercy-player-core/build/backend-contract
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/build/backend-contract.mdx
Reviewed-SHA: b25f8ecfc3a02cee

Source: `nomercy-player-core` at `5ed4538` (toolchain.md). Working tree HEAD is `e3d2de5`; the commits between touch only `.github/workflows/*`, so `src/` was read from the working tree. Example: `src/examples/core-build-backend-contract.ts`.

Method: read page, example and all five Covers files. Type-checked the example against the package source (scratch tsconfig outside the repo): `tsc` exit 0. Ran the example (esbuild bundle against `nomercy-player-core/dist/index.js`, happy-dom): output `paused`, `true`, `running`, which matches the example comments. Ran a scratch probe (outside the repo): a composed player whose `backend()` returns an object without `load`, then `player.load({ id: 1, url: '/a.mp4' })`. Output:

    PROBE load threw: core:player/backend-missing - core:player/backend-missing: No backend wired — backend() returned null/undefined.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 20, 44, 51-52 | `src/core/mixins/loading.ts:180-182`, rethrown at `:254-264`; probe output above | "A missing method is a safe no-op" (line 20) and "A call the base does not have is a no-op from the player" (line 52) are false for `load`, which line 44 lists as a method you supply. `player.load()` throws `core:player/backend-missing` when the backend has no `load`. Every other listed call site uses `?.` (`transport.ts:149,192,216`, `time.ts:93,114,123,133,217`, `volume.ts:56,62,63,125,133`, `player-state.ts:195,231`). | Say that `load` is required: without it `player.load()` throws `core:player/backend-missing`. Keep "no-op" only for the other methods. |
| 2 | 63 | `src/adapters/media-element/backend-lifecycle-bridge.ts:76-94` | "copies play, playing, and pause onto your player's play flag" is wrong for `playing`. Only `play` sets the flag (`:77-80`) and `pause` clears it (`:88-93`). `playing` only calls `onPlaying` (`:84-86`) and never touches the flag. | "`fn bridgeBackendPlayState` copies play and pause onto your player's play flag, and calls your `onPlaying` hook on each playing event." |
| 3 | 83 (snippet) | `src/examples/core-build-backend-contract.ts:89` | The snippet gates the auth header on `https://api.example.com`. Plain GET: no response (curl code `000`, the host does not resolve). The page never says this host stands for the reader's own API, unlike `recipes/custom-url-resolver.mdx:29`. | Add one line after the snippet: "The host in the sample stands for your own API." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Transport, time and volume call whatever `backend` returns | `player-state.ts:114-119`; call sites listed in finding 1 | Supported |
| Add `backend` on your class | `player-state.ts:115-118` (`typeof this.backend === 'function'`) | Supported |
| Shared methods reach it with optional chaining | `player-state.ts:107-113`; call sites | Supported |
| A missing method is a safe no-op | `loading.ts:180-182` | FAIL (finding 1) |
| No setup field installs a backend | `types/config.ts` (only `storage` backend, `:231`) | Supported |
| `MediaElementBackend` is the shared base for an `HTMLMediaElement` backend | `MediaElementBackend.ts:60-99` | Supported |
| Core exports it and does not construct one | `index.ts` via `adapters/media-element/index.ts:52`; class is `abstract` (`:96`); no `extends`/`new MediaElementBackend` in core `src` | Supported |
| `super(element, ownsElement, backendId)` | `MediaElementBackend.ts:83,111-116` | Supported |
| Forwards play, pause, stop, time, rate, mute, volume | `:184-273` | Supported |
| Volume clamps 0..1, then square-law gain | `:259-260`; `core/volume-curve.ts:63-66` (`clamped ** 2`) | Supported |
| Auth provider, DOM bridges, loader pause/resume, capability helpers | `:109,125-170,282-294,298-320` | Supported |
| Table rows Transport / Time / Level / Element | `:184-273,298-320` | Supported |
| Base does not implement load, unload, dispose, state, buffered, outputProtectionState | `:92-94`; none defined in `:96-321` | Supported |
| A call the base does not have is a no-op from the player | `loading.ts:180-182` | FAIL (finding 1) |
| `attachDomBridges`, or a custom set that fills the handler list | `:84-85,147-158` | Supported |
| Override play, volume or mute only for extra work | `:86-91` | Supported |
| `BACKEND_STATE` values | `backend-state.ts:8-15` | Supported |
| DOM bridges map loadstart, loadedmetadata, play, pause, ended, error | `helpers.ts:207-226` | Supported |
| Pause bridge leaves idle and error alone | `helpers.ts:216-219` | Supported |
| `bridgeBackendPlayState` copies play, playing, pause onto the flag | `backend-lifecycle-bridge.ts:76-94` | FAIL (finding 2) |
| `loadstart` resets by default; `resetEvents`, `pauseGuard` | `backend-lifecycle-bridge.ts:61-70,88-89,105-116` | Supported |
| `AuthHeaderProvider` takes the URL, returns a header value or nothing; synchronous; do not fetch | `MediaElementBackend.ts:45-58` | Supported |
| `isHls`, `supportsNativeHls` | `helpers.ts:29-45` | Supported |
| `attachHlsOrFallback` attaches hls.js or sets `src`; does not merge defaults | `helpers.ts:83-113` | Supported |
| `resolveOrCreateMediaElement` finds or creates the tag | `helpers.ts:262-298` | Supported |
| `resetMediaElement` clears a previous source | `helpers.ts:236-259` | Supported |
| Example outputs `paused`, `true`, `running` | run output | Supported |
| Placeholder host in the snippet | example `:89`; GET no response | FAIL (finding 3) |
| Link: build/compose-methods | file exists | Supported |
