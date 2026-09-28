# Reader: /nomercy-player-core/tour/state

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/state.mdx

Reviewed-SHA: bb03d0e98d74c3aa

## Same-voice comparison

Reference: `src/content/nomercy-player-core/en/tour/queue.mdx`. Both pages open with behavior you need before API detail, use `fn` / `key` / `str` / `cls` the same way, split read vs write paths in dedicated sections, call out cancellable listener hooks in prose, warn about timing surprises before media switches, and place a non-live snippet before **Next**. State matches that direct, player-first tone and does not describe the doc site.

## Snippet

`core-tour-state.ts` (via `:::snippet{file="core-tour-state" live="false"}` before **Next**). It logs every reader named on the page, registers a `beforeMutation` handler that blocks `method === 'current'`, and awaits `repeatState(RepeatState.ALL)`. The file comment states that repeat/shuffle writes return a promise because they run the cancellable `before*` cycle. It does not subscribe to the playback or volume events the page lists, does not demonstrate `beforeRepeat` / `beforeShuffle` listeners, and does not call `qualityMode` or `audioTrackMode` writes. Judgment below is for the MDX page only.

## Reader notes (JavaScript background, player already composed)

I read the page in order without opening player source, assuming a composed class from Quick Start.

The opening states that Core exposes typed tokens, reads are non-reactive snapshots, and I should pair each read with the event that changed it. That matches the example header comment and sets expectations before the API tour.

**Playback and volume** names `playState` and `volumeState`, their token sets, fresh defaults, and which events to subscribe to when the UI must stay current. Both are clearly read-only here.

**Repeat and shuffle** is where dedicated write cancellation lives: no argument reads; with an argument, a promise runs `beforeRepeat` / `beforeShuffle`, `repeatPrevented` / `shufflePrevented` when blocked, then storage and `repeat` / `shuffle` events. Defaults and shuffle on/off semantics (including leaving order in place when turning off) are spelled out.

**Coarse readers** table lists `bufferState`, `networkState`, `streamState`, and `visibilityState` with return tokens and safe fallbacks when nothing is wired. The intro already flagged `streamState` as a raw string exception.

**Selection mode** covers `qualityMode` and `audioTrackMode` as reads of *how* choice was made, plus writes (level index or `'auto'`; track index with no path back to `default`). Emitted events are named. The closing lines state explicitly that those two writes apply immediately and do not emit a before-event I can cancel.

**Cancel a mutation** describes the shared `beforeMutation` guard, `preventDefault`, `mutationPrevented`, `mutationGuards` on `setup`, hot-method skips, and cursor `method` as `current`. That is general mutation plumbing for other methods on the player, separate from repeat/shuffle’s dedicated before-events and separate from the immediate selection-mode writers.

**Snapshots that surprise** cross-links to Playback Time for item-change timing, consistent with queue’s cursor section.

## Writable modes and cancellation (rubric)

From this page alone I can classify every write it teaches:

| Write | Cancellable? | Mechanism on this page |
| --- | --- | --- |
| `repeatState(state)` | Yes | `beforeRepeat` → `repeatPrevented` |
| `shuffleState(state \| boolean)` | Yes | `beforeShuffle` → `shufflePrevented` |
| `qualityMode(...)` | No | Applies immediately; no before-event |
| `audioTrackMode(...)` | No | Applies immediately; no before-event |

Other player methods may use `beforeMutation` (described in **Cancel a mutation**), but the page does not claim that guard for quality or audio track mode, and it explicitly excludes cancellation for those two.

## Friction (does not fail the rubric)

Enum import in the repeat example assumes I know `@nomercy-entertainment/nomercy-player-core` exports. Plugin advisories (`info`, `warning`, `error`) during the mutation pass are mentioned once without a listener example. `fn delay` is named only to say it has no effect on the synchronous guard. The snippet illustrates `beforeMutation` on `current`, not repeat/shuffle prevention, so I rely on prose for the dedicated before-events.

## Why PASS

I can list every state reader the page teaches and which events to pair with snapshots. For writes taught on this page, repeat and shuffle are cancellable via their before-events; quality and audio track mode are explicitly non-cancellable immediate writes. The rubric ask (“which writes can be cancelled”) is satisfied.
