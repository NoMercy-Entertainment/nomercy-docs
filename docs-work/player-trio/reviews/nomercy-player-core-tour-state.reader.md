# Reader: /nomercy-player-core/tour/state

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/state.mdx

Reviewed-SHA: 68fc6b409e87a926

## Terms explained before first use

- “snapshot” — line 19 “Each call is a snapshot at that moment”; line 20 explains why: pair with events to know when to read again
- “reactive” — line 18 “No reader is reactive”; readers return snapshots, not updates
- “token” — line 12 “typed tokens for how the player is playing”; enum values (idle, playing, etc.)
- “enum” — line 15 “exported enum”; readers return these
- “mutation” — line 92 “beforeMutation guard”; used to mean write/state change

## Reader can do the task

The task: read and write player state, know which writes are cancellable. Page provides:
- Read playback: playState() returns idle|loading|playing|paused|stopped|error (line 26)
- Read volume: volumeState() returns unmuted|muted (line 30)
- Write repeat: await repeatState(mode) with beforeRepeat/repeatPrevented (lines 40-42)
- Write shuffle: await shuffleState(mode) with beforeShuffle/shufflePrevented (lines 40-42)
- Write quality/audio: qualityMode() and audioTrackMode() apply immediately, not cancellable (lines 87-88)
- Guard mutations: register beforeMutation listener to call preventDefault (lines 92-96)

A reader can read all state and write repeat/shuffle with cancellation support; quality/audio writes are immediate.

## Code does not hide needed info

- Line 45-47: repeatState import and write example
- Table (lines 63-68): all readers with return types and defaults
- Snippet will expand to show concrete usage

## No sentence needs a second read

Lines 18-20 state the snapshot pattern clearly. Lines 40-42 distinguish repeat/shuffle writes from immediate writes. Lines 87-88 explicitly state that quality/audio writes apply immediately.

## Why PASS

The reader understands which state methods are readable, which events to subscribe to for updates, which writes are cancellable (repeat/shuffle via beforeRepeat/beforeShuffle), and which writes are immediate (quality/audio). Snapshots and the reason to pair them with events is explained up front.
