# Fact check: /nomercy-player-core/plugins-adapters/adapter-platform
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-platform.mdx
Reviewed-SHA: 4d0d2f93dbbf4b8f
Previous verdict: FAIL (Reviewed-SHA 6e1437b319e129b3); fixes verified: finding 1 (page lines 69-70 now say `networkState` follows the slow rule after `setup` and always returns online before `setup`; true per `src/core/mixins/player-state.ts:209-212` (`const monitor = this._platform?.network; if (!monitor) return NetworkState.ONLINE;`), `src/core/state.ts:476` (`_platform = undefined`), and the only writer `src/core/mixins/lifecycle.ts:486`, called synchronously from `setup` at `lifecycle.ts:126`)

Source: nomercy-player-core `src` at `e3d2de5` (`git log -1` in the package: `e3d2de5`). Example `src/examples/core-adapter-platform.ts` (no change since `7f53a5d`: `git diff 7f53a5d --stat -- src/examples` is empty).

Method: re-read the whole page and `git diff 7f53a5d` for it (two changes: the PiP gloss at line 31, and lines 69-70). Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo: `tsc` exit 0. Snippet ranges `16-18`, `20-31`, `33-68` match `src/examples/snippet-ranges.lock.json` and the example (read-only scratch script: "3 OK, 0 bad").

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L13 bundle covers wake lock, network, visibility, decode support | `src/adapters/platform/IPlatform.ts:31-40` | Supported |
| L15 pass as `platform` to `setup` | `lifecycle.ts:486` (`self.options.platform ?? browserPlatform`) | Supported |
| L16 `platform()` returns the bundle, or `browserPlatform` before setup | `lifecycle.ts:315` (`return this._platform ?? browserPlatform`) | Supported |
| L23 `browserPlatform` is the default | `lifecycle.ts:486` | Supported |
| L24-25 each read builds a new controller; a spread holds one per field | `browser.ts:359-366` (getters that call `browser*()` factories) | Supported (issue #17) |
| L27 without `window`/`document`, `isOnline`, `isVisible`, each `subscribe` safe | `browser.ts:104`, `:117-118`, `:141-146`; fullscreen and pip `subscribe` guards as in the previous review | Supported |
| L28 `type`, `downlinkMbps`, `rttMs` read `navigator` directly and throw where missing | `browser.ts:106-115` (no `typeof navigator` guard) | Supported (issue #23) |
| L30 `acquire` throws `core:policy/wakeLockUnsupported` | `browser.ts:70` | Supported |
| L31 fullscreen and PiP `enter` throw the matching `core:policy/` error | `browser.ts:246` (`fullscreenUnsupported`), `:302` (`pipUnsupported`, thrown when `requestPictureInPicture` is missing, `:299-307`) | Supported |
| L31 (new) PiP gloss: the browser feature that floats a video in a small window | `browser.ts:299-308` calls `requestPictureInPicture`, the browser Picture-in-Picture API | Supported (general definition of the named browser API) |
| Table L37 `wakeLock` read by the `wakeLock` option, `never` default | `lifecycle.ts:562` (`self.options.wakeLock ?? 'never'`) | Supported |
| Table L38 `network` read by `onOffline` and `networkState` | `lifecycle.ts:520-549`; `player-state.ts:209-219` | Supported |
| Table L39 `visibility` read by `pauseWhenHidden` and `visibilityState` | `lifecycle.ts:494-510`; `player-state.ts:239-241` | Supported |
| Table L40 `capabilities` read by `canPlay` via `canDecode` | `src/core/mixins/abr.ts:73-74` | Supported |
| Table L41 `fullscreen`, `pip` read by `device` flags and the video player | `src/core/mixins/device.ts:126-128`; video as in the previous review | Supported |
| L45 read the default bundle before the player exists | `browser.ts:359` (module constant) | Supported |
| L52-62 interface: four required, two optional, members | `IPlatform.ts` as in the previous review (file unchanged at `e3d2de5`) | Supported |
| L64-65 `subscribe` returns a remover; five network types | `browser.ts:127-131,148`; `browser.ts:97-99` (`wifi`, `ethernet`, `cellular`, `none`, else `unknown`) | Supported |
| L67 on a change while online, `network:slow` if downlink in (0, 1.5) | `lifecycle.ts:528-537` | Supported |
| L68 never with `onOffline: 'ignore'` | `lifecycle.ts:521-523` (returns before subscribing) | Supported |
| L69 after `setup`, `networkState` returns slow on the same rule | `player-state.ts:213-218` (offline first, then `downlink > 0 && downlink < 1.5`) | Supported (fix verified) |
| L70 before `setup` it always returns online | `player-state.ts:210-212`; `state.ts:476`; `lifecycle.ts:126,486` | Supported (fix verified) |
| L74-76 spread `browserPlatform` and replace one controller | example `:33-68`; type check exit 0 | Supported |

## Notes

- Page line 67 "once": the code emits on each step from not slow to slow (`lifecycle.ts:535`), so it fires again after a recovery and a new slow period. Read as "once per slow period", true.
- Page line 69 "the same rule" is the downlink rule of line 67. `networkState` does not read `onOffline`, so with `ignore` it still returns slow. The page does not claim otherwise; no finding.
- The doc comment at `browser.ts:355-357` ("SSR environments ... never throw") disagrees with `browser.ts:106-115`; the code is the truth and the page follows the code. Already filed as #23.
- Carried: example `:61` has `// ...` inside the `setup` call with no complete `setup` earlier on this page; for the reader reviewer.
