# Fact check: /nomercy-player-core/plugins-adapters/adapter-platform
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-platform.mdx
Reviewed-SHA: 6e1437b319e129b3
Previous verdict: FAIL; fixes verified: finding 1 (SSR lines 27-28 now name the safe calls and say `type`, `downlinkMbps`, `rttMs` throw without `navigator`; true per `browser.ts:103-115`; code defect filed as nomercy-player-core #23), finding 2 (`network:slow` lines 67-68 now carry the online, on-change and `ignore` conditions; true per `lifecycle.ts:520-549`)

Source: nomercy-player-core `src` at `e3d2de5`. Example `src/examples/core-adapter-platform.ts` (unchanged since the previous review).

Method: re-read the whole page. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo): `tsc` exit 0. Snippet ranges `16-18`, `20-31`, `33-68` match the lock and the example (3 of 3 OK). The previous run that proved the `navigator` throw was not repeated; `browser.ts:103-115` is unchanged at `e3d2de5`.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 69 (new with the fix) | `src/core/mixins/player-state.ts:209-212` (`const monitor = this._platform?.network; if (!monitor) return NetworkState.ONLINE;`); `src/core/state.ts:476` (`_platform = undefined` at construction); set only in `setup` at `src/core/mixins/lifecycle.ts:486` | "`fn networkState` returns slow on the same rule at any time." Before `fn setup`, `_platform` is `undefined`, so `networkState` returns online whatever the network is. Unlike `fn platform` (`lifecycle.ts:315`) and `fn canPlay`/`fn device`, it does not fall back to `browserPlatform`. "At any time" is false before setup. | Replace page line 69 with: "After `fn setup`, `fn networkState` returns slow on the same rule whenever you call it. Before `fn setup` it always returns online." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L13 bundle covers wake lock, network, visibility, decode support | `src/adapters/platform/IPlatform.ts:31-40` | Supported |
| L15 pass as `platform` to `setup` | `src/core/mixins/lifecycle.ts:486` | Supported |
| L16 `platform()` returns the bundle, or `browserPlatform` before setup | `lifecycle.ts:314-316` | Supported |
| L23 `browserPlatform` is the default | `lifecycle.ts:486` | Supported |
| L24-25 each read builds a new controller; a spread holds one per field | `browser.ts:359-366` (getters) | Supported (issue #17) |
| L27 without `window`/`document`, `isOnline`, `isVisible`, each `subscribe` are safe | `browser.ts:104` (navigator guard), `:117-118` (window guard), `:141-146` (document guards), fullscreen `subscribe` and pip `subscribe` document guards (`browser.ts:270-272,332-334`) | Supported (fix verified) |
| L28 `type`, `downlinkMbps`, `rttMs` read `navigator` directly and throw where missing | `browser.ts:106-115`; previous run output `ReferenceError navigator is not defined` | Supported (fix verified) |
| L30-31 `acquire`, fullscreen/pip `enter` throw `core:policy/` errors | `browser.ts:66-75`; fullscreen and pip `enter` as in previous review | Supported |
| Table L37 `wakeLock` read by the `wakeLock` option, `never` default | `lifecycle.ts:562` | Supported |
| Table L38 `network` read by `onOffline` and `networkState` | `lifecycle.ts:520-549`; `player-state.ts:209-219` | Supported |
| Table L39 `visibility` read by `pauseWhenHidden` and `visibilityState` | `lifecycle.ts:493-500`; `player-state.ts:239-241` | Supported |
| Table L40 `capabilities` read by `canPlay` via `canDecode` | `src/core/mixins/abr.ts:72-74` | Supported |
| Table L41 `fullscreen`, `pip` read by `device` flags and the video player | `src/core/mixins/device.ts:126-128`; video as in previous review | Supported |
| L45 read the default bundle before the player exists | `browser.ts:359` (module constant) | Supported |
| L52-62 interface: four required, two optional, members | `IPlatform.ts` as in previous review | Supported |
| L64-65 `subscribe` returns a remover; five network types | `browser.ts:127-131,148,334-337`; `IPlatform.ts:67-73` | Supported |
| L67 on a change while online, emits `network:slow` once if downlink in (0, 1.5) | `lifecycle.ts:528-537` (emits on the step from not slow to slow, `isSlowNow && !wasNetworkSlow`) | Supported (fix verified) |
| L68 never with `onOffline: 'ignore'` | `lifecycle.ts:521-523` | Supported (fix verified) |
| L69 `networkState` returns slow on the same rule at any time | `player-state.ts:209-212` | FAIL (finding 1) |
| L73-76 spread `browserPlatform` and replace one controller | example `:33-68`; type check exit 0 | Supported |

## Notes

- Page line 67, "once": the code emits on each step from not slow to slow, so it can fire again after the connection recovers and slows again. "Once" read as "once per slow period" is true; not a claim failure.
- Carried from the previous review: example `:61` has `// ...` inside the `setup` call with no complete `setup` earlier on this page; for the reader reviewer.
