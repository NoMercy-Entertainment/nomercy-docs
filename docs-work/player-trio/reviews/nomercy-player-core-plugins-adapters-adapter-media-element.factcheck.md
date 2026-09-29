# Fact check: /nomercy-player-core/plugins-adapters/adapter-media-element
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-media-element.mdx
Reviewed-SHA: fe143edb3111a7d1

Source (nomercy-player-core `e3d2de5`): `src/adapters/media-element/MediaElementBackend.ts`, `index.ts`, `backend-state.ts`, `helpers.ts`; `src/core/volume-curve.ts`; `src/errors/code.ts`; `src/adapters/event-bus/default.ts`; `package.json` exports. Subclasses: nomercy-video-player `afcf8bc` `src/adapters/video-backend/html5.ts`; nomercy-music-player `214a058` `src/adapters/audio-backend/html5-audio.ts`, `web-audio.ts`. Example: `src/examples/core-adapter-media-element.ts`.

Method: read the page, the example and the sources above. Type check of the example against the package SOURCE (scratch tsconfig outside the repo, `paths` mapped to `packages/player-web/*/src`, same compiler options as `tsconfig.examples.json`): `tsc -p <scratch>/tsconfig.json` exit 0, 0 errors. The example was not run in a browser (it needs a real media element and a URL); behavior claims were traced in source. No URLs on the page or in the example.

## Findings

1. **Page line 22 (with table lines 29 and 31): "The base class forwards these calls to the element." is false for two rows.**
   - `setAuthHeaderProvider` does not reach the element. It stores the provider in a field: `MediaElementBackend.ts:125-127` (`this._authHeaderProvider = provider;`).
   - `pauseLoader` / `resumeLoader` call the HLS instance, not the element, and `loaderState` returns a field: `MediaElementBackend.ts:282-294` (`this.hlsInstance?.stopLoad()`, `this.hlsInstance?.startLoad()`, `return this.loaderRunning`).
   - Fix: change line 22 to "The base class implements these calls." (Line 43 already explains the loader correctly.)

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12-13 abstract class for a backend on an `<audio>`/`<video>` element, not an interface | `MediaElementBackend.ts:96-99` (`export abstract class ... TEl extends HTMLMediaElement`) | Supported |
| L15 video and music players build their backends on it | video `html5.ts:151`; music `html5-audio.ts:42`, `web-audio.ts:88` (`extends MediaElementBackend`) | Supported |
| L17 snippet imports from `./adapters/media-element` | `package.json` exports `"./adapters/media-element"`; `index.ts:16-19,21-24,52,54-57` export `BACKEND_STATE`, `BackendState`, `MediaElementBackend`, `MinimalBackendEventPayload` | Supported |
| L22 base "forwards these calls to the element" | see Finding 1 | **Unsupported** |
| L26 Transport `play`, `pause`, `stop` | `MediaElementBackend.ts:184-201` | Supported |
| L27 Time members | `MediaElementBackend.ts:205-239` | Supported |
| L28 Volume members | `MediaElementBackend.ts:253-273` | Supported |
| L29 Loader members exist | `MediaElementBackend.ts:282-294` | Supported (as members) |
| L30 Devices members | `MediaElementBackend.ts:298-320` via `helpers.ts:353-452` | Supported |
| L31 Auth `setAuthHeaderProvider` exists | `MediaElementBackend.ts:125-127` | Supported (as member) |
| L33 `play` always returns a promise | `MediaElementBackend.ts:184-187` | Supported |
| L34 `stop` pauses and seeks to 0 | `MediaElementBackend.ts:193-201` | Supported |
| L35 `duration` returns 0 until the length is known | `MediaElementBackend.ts:219-222` (`Number.isFinite(raw) ? raw : 0`) | Supported |
| L37 setter clamps to 0..1 and writes the square | `MediaElementBackend.ts:259-260`; `volume-curve.ts:63-66` (`clamped ** 2`) | Supported |
| L38 getter returns the element value, the squared number | `MediaElementBackend.ts:256-258` (known issue #21 volume read-back, described as current behavior) | Supported |
| L40 snippet example `:65-66`, comment "0.25" | 0.5 squared = 0.25, `volume-curve.ts:66` | Supported |
| L43 loader stop/start the HLS loader when attached | `MediaElementBackend.ts:282-290` (optional chaining on `hlsInstance`) | Supported |
| L47 `super(element, ownsElement, backendId)` | `MediaElementBackend.ts:111-116` | Supported |
| L48 six backend IDs | `helpers.ts:19`; `errors/code.ts:16` | Supported |
| L49 `attachDomBridges` turns element events into backend events and state | `MediaElementBackend.ts:147-158`; `helpers.ts:175-233` | Supported |
| L54 six states | `backend-state.ts` `BACKEND_STATE` (idle, loading, ready, playing, paused, error) | Supported |
| L62 base has no `load`, `unload`, `state`, `dispose` | not declared in `MediaElementBackend.ts:96-321`; doc `:92-94` | Supported |
| L63 base implements no player backend interface | `MediaElementBackend.ts:78-80,96-99` (no `implements`) | Supported |
| L64 override `play`, `volume`, `mute` for extra work first | `MediaElementBackend.ts:86-91`; `web-audio.ts:306,321,346`; `html5-audio.ts:214,228` | Supported |
| L66-67 `detachDomBridges` removes listeners; pass old element on swap | `MediaElementBackend.ts:160-170` | Supported |
| L73 example subclass: `state`, `load`, `dispose` with `disposed`, `detachDomBridges`, `off('all')` | `MediaElementBackend.ts:107,165`; `event-bus/default.ts:162-177` (`off('all')` clears all) | Supported |
| Example `:61-62` state is `'playing'` inside a `playing` handler | `helpers.ts:206-208` (`play` event sets PLAYING; the element fires `play` before `playing`) | Supported |
| Elided snippet L73 (`lines="26,40-57"`) | complete constructor shown earlier at L51 (`lines="26-38"`) | Supported |
