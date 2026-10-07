# Reader: /nomercy-player-core/tour/queue

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/queue.mdx

Reviewed-SHA: 8c3237cd6c3d8e6d

## Terms explained before first use

- "queue" — defined in opening: "when you have more than one item, or when you want to jump to a specific one"
- "item" — context defines it as a media entry in the queue
- "cursor" — used (line 49, 54) to mean the active item; clear from context
- "autoplay" — line 74 "when key autoplay is not false"; line 83 "leave key autoplay unset"
- "normalizePlaylistItem", "transformPlaylistItem" — line 40-41, functions that adapt item shapes; clear from context

## Reader can do the task

The task: manage a queue and play items. Page provides:
- Read queue: queue() returns array (line 18)
- Edit list: queueAppend, queuePrepend, queueInsert, queueRemove, queueMove, queueClear, queueShuffle, queueSort (lines 27-29)
- Move cursor: item(id/index/picker) (line 54)
- Prevent race: use autoplay: true or playItem or playNow (lines 83-85)
- Avoid silent playback: pass { autoplay: true } to item() (line 83)
- Move without load: seekToIndex (line 95)

A reader can build and navigate a queue.

## Code does not hide needed info

- Lines 23-24: queue() read and replace
- Lines 64-66: item() with different argument types
- Line 100: seekToIndex example
- Snippet will expand to show full patterns

## No sentence needs a second read

Lines 12-14 state the two rules clearly. Lines 79-81 explain the race condition and its fix. Each API section is concise.

## Why PASS

The reader understands how to create, edit, and navigate a queue; how to move the cursor with or without loading; and how to start playback without a silent race by using autoplay or playItem. The critical rule (wait for load before playing) is stated in the opening and reinforced in the autoplay section.
