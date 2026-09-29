# Fact check: /nomercy-player-core/plugins-adapters/adapter-platform
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-platform.mdx
Reviewed-SHA: edf2ae25fd7780fb

Source (nomercy-player-core `e3d2de5`): `src/adapters/platform/IPlatform.ts`, `browser.ts`, `index.ts`; `src/core/mixins/lifecycle.ts`, `abr.ts`, `device.ts`, `player-state.ts`; `src/core/state.ts`; `src/types/config.ts`; `package.json` exports. Video: nomercy-video-player `afcf8bc` `src/index.ts`. Example: `src/examples/core-adapter-platform.ts`.

Method: read the page, the example and the sources above. Type check of the example against the package SOURCE (scratch tsconfig outside the repo, `paths` mapped to `packages/player-web/*/src`): exit 0, 0 errors. One run to prove the "never throw" claim: a scratch script (outside the repo) deleted `globalThis.navigator` in Node v22.14.0 and imported the worktree's published `dist/adapters/platform/browser.js` (2.2.1), whose network monitor matches source `browser.ts:106-115` line for line (unguarded `navigator.connection`). Output:

```
typeof window undefined typeof document undefined typeof navigator undefined
isOnline -> true
type THREW ReferenceError navigator is not defined
downlinkMbps THREW ReferenceError navigator is not defined
rttMs THREW ReferenceError navigator is not defined
isVisible -> true subscribe -> function
```

No URLs. Known issue #17 (wake lock) is not contradicted by the page.

## Findings

1. **Page line 27: "Without `window` or `document`, the monitors return safe values and never throw." is false where `navigator` is also missing.**
   `browser.ts:106-115`: `type()`, `downlinkMbps()` and `rttMs()` read `navigator.connection` with no `typeof navigator` guard (only `isOnline` at `:104` is guarded). Run output above: all three throw `ReferenceError`. This is also a code defect (the doc comment at `browser.ts:355-357` promises SSR never throws); it is not among issues #17-#21 and should be filed on nomercy-player-core (plus the KMP port check).
   Fix: replace line 27 with "Without `window` or `document`, `fn isOnline`, `fn isVisible` and each `fn subscribe` return safe values. `fn type`, `fn downlinkMbps` and `fn rttMs` read `navigator` directly and throw where it is missing."

2. **Page line 64: "The player emits `network:slow` when `fn downlinkMbps` reports more than 0 and less than 1.5." leaves out three conditions that decide whether it fires.**
   `lifecycle.ts:520-549`: the check runs only inside the `network.subscribe` callback, only while online, only on the change from not slow to slow (`isSlowNow && !wasNetworkSlow`), and there is no subscription at all when `onOffline` is `'ignore'` (`:522-523`). A connection that is slow from the start and never changes fires no event.
   Fix: "When the network monitor reports a change while online, the player emits `str network:slow` once if `fn downlinkMbps` is more than 0 and less than 1.5. With `key onOffline` set to `str ignore`, it never does. `fn networkState` returns slow on the same rule at any time."

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L13 bundle covers wake lock, network, visibility, decode support | `IPlatform.ts:31-40` | Supported |
| L15 passed to `setup` as `platform` | `config.ts:277`; `lifecycle.ts:485-487` | Supported |
| L16 `platform()` returns the bundle in use, or `browserPlatform` before setup | `lifecycle.ts:314-315`; `state.ts:476` (`_platform = undefined` at construction) | Supported |
| L18 snippet imports | `package.json` exports `"./adapters/platform"`; `platform/index.ts:9-21`; root `BasePlayerConfig` (type check exit 0) | Supported |
| L23 `browserPlatform` is the default | `lifecycle.ts:486` | Supported |
| L24 each read builds a new controller | `browser.ts:359-366` (getters call factory) | Supported |
| L25 spread reads every field once, one controller per field | `browser.ts:359-366` (spread invokes each getter once) | Supported |
| L27 no throw without `window`/`document` | see Finding 1 | **Unsupported** |
| L28 `acquire` throws `core:policy/wakeLockUnsupported` without the API | `browser.ts:66-75` | Supported |
| L29 fullscreen / pip `enter` throw the matching `core:policy/` error | `browser.ts:241-251` (`fullscreenUnsupported`), `:297-307` (`pipUnsupported`) | Supported |
| L35 `wakeLock` read by the `wakeLock` option, `'never'` default | `lifecycle.ts:561-591` (`?? 'never'` at `:562`); video/music set no default (grep `wakeLock` in both `src/`: no hits). Note: `config.ts:324` comment says "Video defaults 'auto'", which the code does not do (comment drift, page is right) | Supported |
| L36 `network` read by `onOffline` and `networkState` | `lifecycle.ts:520-549`; `player-state.ts:209-219` | Supported |
| L37 `visibility` read by `pauseWhenHidden` and `visibilityState` | `lifecycle.ts:493-510`; `player-state.ts:239-242` | Supported |
| L38 `capabilities` read by `canPlay` via `canDecode` | `abr.ts:72-80` | Supported |
| L39 `fullscreen`, `pip` read by `device` flags and the video player | `device.ts:126-128`; video `src/index.ts:856-857,887-888` | Supported |
| L43 read the default bundle before the player exists | `browser.ts:359` (module constant) | Supported |
| L50-51 four required, two optional, video only | `IPlatform.ts:27,31-40` | Supported |
| L55 `IWakeLock` members | `IPlatform.ts:56-61` | Supported |
| L56 `INetworkMonitor` members | `IPlatform.ts:88-94` | Supported |
| L57 `IVisibilityMonitor` members | `IPlatform.ts:107-110` | Supported |
| L58 `ICapabilitiesProbe` members | `IPlatform.ts:151-154` | Supported |
| L59-60 fullscreen and PiP members | `IPlatform.ts:171-177,187-193` | Supported |
| L62 each `subscribe` returns a remover | `IPlatform.ts:93,109,176,192`; `browser.ts:127-131,148,277-281,334-337` | Supported |
| L63 five network type values | `IPlatform.ts:67-73`; `browser.ts:94-100` | Supported |
| L64 `network:slow` rule | see Finding 2 | **Unsupported as stated** |
| L68-69 spread and replace one controller; native wake lock | example `:38-67`; type check exit 0 | Supported |
| Example `:23-31` `canDecode` result fields | `IPlatform.ts:137-141`; `browser.ts:174-212` | Supported |

## Notes

- Example `:61` has `// ...` inside the `setup` call. No complete `setup` call appears earlier on this page; reported per the role, for the reader reviewer to judge.
- Page line 31 says "The player reads each field from one place", while the table rows name two readers for `network`, `visibility` and `fullscreen`/`pip`. Each row is true; the lead sentence is loose wording, not a false source claim.
