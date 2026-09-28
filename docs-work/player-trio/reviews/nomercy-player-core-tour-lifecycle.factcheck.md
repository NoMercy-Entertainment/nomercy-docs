# Fact check: /nomercy-player-core/tour/lifecycle
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/lifecycle.mdx
Reviewed-SHA: 41304943aa3f79e0

Source: `packages/player-web/nomercy-player-core/src/core/mixins/lifecycle.ts`, `activity.ts`; `PlayState` / `SetupState` in `types/state.ts`; `_setupCalled` init in `core/state.ts`; example `src/examples/core-tour-lifecycle.ts`. Method: read page, example, and those sources; SHA via python `hashlib.sha256` of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`. Focus re-check: second setup after dispose → `already-setup`; hide only while `playState` is `playing`; `mediaReady` is a prose sentence that the stage work body is empty (not a table row).

## Gate checks

| Gate | Result |
| --- | --- |
| setup / ready / dispose match `lifecycle.ts` | Pass |
| Second setup → `core:lifecycle/already-setup` including after dispose | Pass (`_guardSetup` checks `_setupCalled` first; dispose never clears it) |
| `ready()` rejects with `core:player/disposed` when phase is disposing/disposed | Pass (`lifecycle.ts:168-170`) |
| Stage order and stage events match `_runSetupPipeline` / `_resolvePlaylistUrl` | Pass |
| `mediaReady` work body is empty (sentence, not table) | Pass (`lifecycle.ts:983` `() => {}`; page L72) |
| Hide only while `playState === playing`; other play states leave controls up | Pass (`activity.ts:74-79`) |
| Em dash / en dash on page or example | none |
| Old library nickname (the old nickname) on page or example | none |
| Snippet `live="false"` | Pass |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass (max sentence 17; max paragraph 42) |
| Table data rows ≤ 6 non-separator lines | Pass (6 lines: header + 5 stages) |
| Example imports match package exports | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `setup` returns at once; async pipeline ends at `ready` | `lifecycle.ts:115-143,903-994` | Supported |
| Snapshots config onto `options`; seeds slots; adds `nomercyplayer` | `lifecycle.ts:119-122,347-388` | Supported |
| Emits `beforeSetup`, phase `setup`, then pipeline | `lifecycle.ts:139-141` | Supported |
| Second `setup` throws `core:lifecycle/already-setup`, including after dispose | `lifecycle.ts:117,337-343`; `_setupCalled` never cleared in `dispose` (`207-256`); only reset in `initPlayerCoreState` (`state.ts:444`) | Supported |
| Dispose does not make this instance accept setup again; build a new instance | `lifecycle.ts:199-200,337-339` | Supported |
| `ready` resolves at `ready`; memoised; immediate if already ready | `lifecycle.ts:161-181` | Supported |
| Disposing/disposed → `ready` rejects `core:player/disposed` | `lifecycle.ts:168-170` | Supported |
| `ready` waits on post-setup `_pendingPluginRegistrations` | `lifecycle.ts:154-181,326-329` | Supported |
| Stage throw → `<stage>Error` + `error` or `fatal`, then rejects `ready` | `lifecycle.ts:1165-1214,989-991` | Supported |
| Stage order `setupStart` → … → `mediaReady` → `ready` | `lifecycle.ts:895-898,906-986` | Supported |
| `configResolved`: `options` snapshot | `lifecycle.ts:907` | Supported |
| `pluginsRegistered` after queue drained in `pluginsRegistering` | `lifecycle.ts:908-915` | Supported |
| `streamsReady`: register native/hls when missing | `lifecycle.ts:943-955` | Supported |
| `authReady` empty stage body | `lifecycle.ts:956` | Supported |
| `playlistReady`: seeded queue or `length: 0` | `lifecycle.ts:958-981,50-84` | Supported |
| `mediaReady` fires when stage runs; work body empty | `lifecycle.ts:983`; page sentence L72 | Supported |
| `setupStart` carries `container` | `lifecycle.ts:906` | Supported |
| Playlist URL → `playlistResolving` between `authReady` and `playlistReady` | `lifecycle.ts:51,961-963` | Supported |
| Fetch failure → `playlistError` + `playlistReady` `{ length: 0 }`, continues to `ready` | `lifecycle.ts:77-84,983-987` | Supported |
| `plugins` / pre-setup register drain in `pluginsRegistering`; `pluginInitTimeoutMs` default `30000` | `lifecycle.ts:360-368,908-912` | Supported |
| `phase` fine-grained; `setupState` → `not-setup` / `setup` / `ready` / `disposed` | `lifecycle.ts:265-281`; `types/state.ts:14-22` | Supported |
| Activity: pointer/touch/key; `activity` `{ active }`; setup bumps once; default `inactivityMs` `4000` | `activity.ts:40-44,107-163` | Supported |
| While playing, inactivity after `inactivityMs` emits `active: false` | `activity.ts:73-94` | Supported |
| Leave container while playing hides at once | `activity.ts:123-135,74-79` | Supported |
| Hide only while `playState` is `playing`; any other play state leaves controls up | `activity.ts:74-79`; `playState()` `state-mutators.ts:86-87` | Supported |
| `bumpActivity`; `activityTracking()` / `(false)`; `inactivityMs: 0` skips wire | `activity.ts:166-194,107-114` | Supported |
| `dispose` idempotent; `beforeDispose` / `preventDefault` → `disposePrevented` | `lifecycle.ts:207-218` | Supported |
| Plugins reverse order, then policy cleanup, then `dispose`, then `disposed`, then `off('all')` | `lifecycle.ts:220-256` | Supported |
| In-flight `ready` rejected with `core:player/disposed`; new instance for re-setup | `lifecycle.ts:248-253,199-200` | Supported |
| Example: compose + setup/ready/activity/dispose; imports from package root | `core-tour-lifecycle.ts`; `src/index.ts` | Supported |

## Notes (not failures)

- `_guardSetup` still has a disposed-phase branch (`lifecycle.ts:341-343`), but after a normal `setup` → `dispose` the sticky `_setupCalled` flag makes `core:lifecycle/already-setup` win. Setup JSDoc still implies dispose clears re-entry; runtime and the page follow the sticky flag.
- Dispose rejects unresolved `ready` before `emit('dispose')` (`lifecycle.ts:251-254`). The page states the reject after the dispose / disposed paragraphs; consequence is correct, order is slightly compressed.
- `playlistReady` is not run through `_runStage`; it still emits as documented.
- JSDoc on `_maybeHide` still names buffering/ended (`activity.ts:73`); the page correctly follows the runtime check, not that comment.
