# Fact check: /nomercy-player-core/plugins-adapters/adapter-media-element
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-media-element.mdx
Reviewed-SHA: 706d5c66572bb389
Previous verdict: FAIL (Reviewed-SHA d29b4d45fe9e0919); fixes verified: finding 1 (old line 50 replaced by lines 50-54 with the text the previous verdict asked for: the ID labels the backend in the error `scope`; the six IDs; built-ins use `html5`, `audio-element`, `webaudio`; `mse` and `webcodecs` have no built-in backend; no built-in uses `video`. Each part checked against source below). The fresh review of the whole page found no new gap.

Source: nomercy-player-core `src` at `e3d2de5` (working tree clean; same `src` as the pinned `5ed4538`), plus nomercy-video-player and nomercy-music-player `src` for the built-in backends. Example `src/examples/core-adapter-media-element.ts`.

Method: re-read the whole page; `git diff 26055e2~1 26055e2` for it; read `src/adapters/media-element/MediaElementBackend.ts:1-321` in full, `helpers.ts:19,175-230,345-440`, `backend-state.ts`, `index.ts`, `src/errors/code.ts:10-25`, `src/core/volume-curve.ts` (`perceptualGain`), `src/adapters/event-bus/default.ts:160-178`; searched `super(..., '<id>')` and `extends MediaElementBackend` and `'video'` over the three packages' `src/adapters` (tests excluded). Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo: `tsc` exit 0. Snippet ranges `17-24`, `65-66`, `26-38`, `26`, `40-57` match `src/examples/snippet-ranges.lock.json` (read-only script: "ranges ok=5 bad=0"). Hand-written ts/js blocks: 0. The example was traced, not run.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 for a backend that plays through `<audio>` or `<video>` | `MediaElementBackend.ts:96-99` (`TEl extends HTMLMediaElement`) | Supported |
| L13 abstract class, not an interface | `MediaElementBackend.ts:96` `export abstract class` | Supported |
| L15 video and music players build their own backends on it | video `src/adapters/video-backend/html5.ts:151`; music `src/adapters/audio-backend/html5-audio.ts:42`, `web-audio.ts:88` | Supported |
| L17 snippet imports | `package.json:40-42` `./adapters/media-element`; `src/adapters/media-element/index.ts` exports `BackendState`, `MinimalBackendEventPayload` (types), `BACKEND_STATE`, `MediaElementBackend`; tsc exit 0 | Supported |
| Table: Transport `play`, `pause`, `stop` | `MediaElementBackend.ts:184,189,193` | Supported |
| Table: Time members | `:207,219,224,228,234` | Supported |
| Table: Volume members | `:255,267,271` | Supported |
| Table: Loader members | `:282,287,292` | Supported |
| Table: Devices members | `:298,302,306,310,314,318` | Supported |
| Table: Auth `setAuthHeaderProvider` | `:125` | Supported |
| L33 `play` always returns a promise | `:185-186` | Supported |
| L34 `stop` pauses and seeks to 0 | `:194-196` | Supported |
| L35 `duration` returns 0 until the element knows the length | `:220-221` (`Number.isFinite(raw) ? raw : 0`) | Supported (see note) |
| L37 setter clamps to 0..1 and writes its square | `:259-260`; `volume-curve.ts` `perceptualGain` returns `clamped ** 2` | Supported |
| L38 getter returns the element value, the squared number | `:256-257` | Supported |
| L40 snippet 65-66: `volume(0.5)` reads back `0.25` | example `:65-66`; `perceptualGain(0.5) = 0.25` | Supported |
| L43 `pauseLoader`/`resumeLoader` stop and start the HLS loader when attached | `:282-290` (`this.hlsInstance?.stopLoad()` / `startLoad()`) | Supported |
| L47 `super(element, ownsElement, backendId)` | `:111` | Supported |
| L48 `attachDomBridges` turns element events into backend events and state | `:147-158`; `helpers.ts:191-225` | Supported |
| L50 the ID labels the backend in the error `scope` | the ID is read only at `MediaElementBackend.ts:299,303,315` into `helpers.ts:363-366,389-392,434-437` (`scope: { kind: 'backend', id: backendId }`) | Supported (fix verified; see note) |
| L51 the six IDs | `src/errors/code.ts:16`; `helpers.ts:19` (`BackendId` is that union) | Supported |
| L53 built-ins use `html5` (video `<video>`), `audio-element` (music `<audio>`), `webaudio` (music Web Audio) | video `html5.ts:273-285` (finds or creates a `video` element, `super(..., 'html5')`); music `html5-audio.ts:61` `'audio-element'`; `web-audio.ts:112` `'webaudio'` | Supported (fix verified) |
| L54 `mse`, `webcodecs` have no built-in backend; no built-in uses `video` | only three `super(..., '<id>')` calls in the three `src` trees (above); no `'video'` backend ID in any `src/adapters` (only `helpers.ts:271` element tag type) | Supported (fix verified) |
| L56 snippet 26-38 | example `:26-38`; tsc exit 0 | Supported |
| L59 six states | `backend-state.ts` `BACKEND_STATE` | Supported |
| L67 base has no `load`, `unload`, `state`, `dispose` | `MediaElementBackend.ts:96-321` (none declared); comment `:92-94` | Supported |
| L68 base implements no player backend interface | `:96-99` (no `implements`); comment `:78-80` | Supported |
| L69 override `play`, `volume`, `mute` when extra work comes first | `:86-91` | Supported |
| L71-72 `detachDomBridges` removes the listeners; pass the old element when swapping | `:160-170` (`el: HTMLMediaElement = this.element`) | Supported |
| L76-78 subclass loads a URL, reports state, cleans up | example `:26,40-57`; `off('all')` with no handler clears all listeners (`event-bus/default.ts:163-177`) | Supported |
| Example `:62` state is `'playing'` in the `playing` handler | `helpers.ts:213-215` (`play` sets `PLAYING`; the DOM fires `play` before `playing`) | Supported (traced) |
| See also: Media List | `plugins-adapters/adapter-media-list.mdx` exists | Supported |

## Notes

- L50: the DOM `error` event is forwarded as the raw event (`helpers.ts:203`), with no `scope`, so the ID appears only on the three errors the base throws (`captureStream`, `setSinkId`, `setMediaKeys`). The page says what the ID does, not that every error carries it; no finding.
- L35: `Number.isFinite` also maps `Infinity` (a live stream) to 0. The page describes the not-yet-known case only; no finding.
