# Fact check: /nomercy-player-core/tour/state
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/state.mdx
Reviewed-SHA: bb03d0e98d74c3aa

Source: `packages/player-web/nomercy-player-core/src/core/mixins/player-state.ts`, `core/mixins/state-mutators.ts`, `core/state.ts`; cursor zeroing in `core/mixins/queue.ts`. Example: `src/examples/core-tour-state.ts`. Method: read page, example, and those sources; SHA256 of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`.

## Gate checks

| Gate | Result |
| --- | --- |
| On cursor change, time and duration zeroed before `item` when new id ≠ mounted | Pass (`queue.ts:97-107`; page does not claim outgoing end still visible on `item`) |
| Claims supported by `player-state.ts` / `state-mutators.ts` / `state.ts` | Pass |
| Enums match `types/state.ts` | Pass |
| Imports and symbols match package root | Pass (`index.ts`; example `RepeatState` + type imports) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass (max sentence 21; max paragraph 45) |
| Table data rows ≤ 6 on page | Pass (4 data rows) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Most readers return an exported enum; `streamState` returns a backend `string` | `player-state.ts:193-232`; `state-mutators.ts:86-96` | Supported |
| Readers are snapshots, not reactive | `state-mutators.ts:82-84,91-92`; `player-state` getters | Supported |
| `playState`: idle/loading/playing/paused/stopped/error; fresh is idle; subscribe play/pause/stop/phase/mediaReady/fatal | `types/state.ts:122-135`; `state.ts:451`; `state-mutators.ts:82-84` | Supported |
| `volumeState`: unmuted/muted (not level); fresh unmuted; subscribe volume/mute | `types/state.ts:140-145`; `state.ts:452`; `state-mutators.ts:91-92` | Supported |
| `repeatState` / `shuffleState` read or promise write via before* cycle; cancel → prevented; else store + emit | `state-mutators.ts:112-179` | Supported |
| Both start at `off` | `state.ts:453-454`; `types/state.ts:101-116` | Supported |
| Shuffle `on`/true randomizes immediately; `off` keeps shuffled order | `state-mutators.ts:136-147,174-176` | Supported |
| Coarse readers + safe defaults (buffer idle; network online / slow &lt;1.5 Mbps; stream idle; visibility visible) | `player-state.ts:193-242` | Supported |
| Prefer `bufferState` typed token; `streamState` for raw string | `player-state.ts:221-225` | Supported |
| `qualityMode` starts auto; index → manual; `'auto'` restores; emits `qualityState` | `state.ts:474`; `player-state.ts:253-260` | Supported |
| `audioTrackMode` starts default; index → manual + backend; no return to default; emits `audioTrackState` | `state.ts:475`; `player-state.ts:269-276` | Supported |
| Those two writes apply immediately; no cancellable before-event | `player-state.ts:253-276` (set state, call backend, emit; no `_dispatchBefore`) | Supported |
| `beforeMutation` sync guard; `delay` no-op; cancel → `mutationPrevented`; `mutationGuards: false` off; `'all'` includes hot; default skips time/bandwidth/recordMetric | `state-mutators.ts:47,57-71,182-283`; `config.ts:371` | Supported |
| Cursor move reports method `current`; plugins can emit info/warning/error advisories | `queue.ts:292`; `state-mutators.ts:191-273` | Supported |
| When new id ≠ mounted, time/duration already `0` before `item`; listener does not see outgoing end | `queue.ts:97-107` | Supported |
| Example: package-root compose seed; snapshot logs; `beforeMutation` on `current`; `repeatState(RepeatState.ALL)` | `core-tour-state.ts`; `index.ts` exports | Supported |
