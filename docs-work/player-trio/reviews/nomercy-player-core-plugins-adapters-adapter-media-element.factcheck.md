# Fact check: /nomercy-player-core/plugins-adapters/adapter-media-element
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-media-element.mdx
Reviewed-SHA: c7ebb979a7cb0770
Previous verdict: FAIL; fixes verified: finding 1 (page line 22 now reads "The base class implements these calls."; true for every row, including `setAuthHeaderProvider`, which stores a field, and the loader calls, which go to the HLS instance)

Source: nomercy-player-core `src` at `e3d2de5`; nomercy-video-player and nomercy-music-player `src` next to it (read only). Example `src/examples/core-adapter-media-element.ts` (unchanged since the previous review).

Method: re-read the whole page, including the frontmatter description. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo): `tsc` exit 0. Snippet ranges `17-24`, `65-66`, `26-38`, `26`, `40-57` checked against `snippet-ranges.lock.json` and the example: 4 OK, `26` is locked as `26-26` (line 90 of the lock), same line. The example was not run (it needs a real media element); behaviour traced in source.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L3 description: forwards transport, time, volume, loader and device calls | `MediaElementBackend.ts:184-320` (loader calls go to `hlsInstance`, `:282-290`) | Supported |
| L12-13 abstract class over an HTML media element | `MediaElementBackend.ts:96-99` | Supported |
| L15 video and music backends extend it | video `html5.ts:151`; music `html5-audio.ts:42`, `web-audio.ts:88` | Supported |
| L17 imports from `adapters/media-element` | `package.json:40` | Supported |
| L22 base implements the table's calls | transport `:184-201`, time `:205-239`, volume `:253-273`, loader `:282-294`, devices `:298-320`, auth `:125-127` | Supported (fix verified) |
| L33-35 `play` promise; `stop` pauses + seeks 0; `duration` 0 until known | `MediaElementBackend.ts:184-187,193-201,219-222` | Supported |
| L37-38 setter clamps and writes the square; getter returns element value | `MediaElementBackend.ts:256-260`; `src/core/volume-curve.ts:63-66` (known issue #21) | Supported |
| L43 loader calls stop/start the HLS loader when attached | `MediaElementBackend.ts:282-290` (`this.hlsInstance?.stopLoad()` / `startLoad()`) | Supported |
| L47-48 `super(element, ownsElement, backendId)`; six IDs | `MediaElementBackend.ts:111`; `src/errors/code.ts:16`; `helpers.ts:19` | Supported |
| L49 `attachDomBridges` turns element events into backend events and state | `MediaElementBackend.ts:145-156` | Supported |
| L54 six states | `backend-state.ts:10-15` | Supported |
| L62-64 base lacks `load`, `unload`, `state`, `dispose`; implements no backend interface; override points | `MediaElementBackend.ts:96-321` (no such members, no `implements`); overrides as in previous review | Supported |
| L66-67 `detachDomBridges` removes the listeners; pass old element on swap | `MediaElementBackend.ts:163-168` | Supported |
| L71-73 example subclass loads a URL, reports state, cleans up | example `:40-56` | Supported |
| See also: Media List | `adapter-media-list.mdx` exists | Supported |
