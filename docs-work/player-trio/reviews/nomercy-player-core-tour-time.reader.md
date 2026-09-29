# Reader: /nomercy-player-core/tour/time
Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/time.mdx

Reviewed-SHA: 56c32d2cd7d7dee4

## Task: Read position and duration, seek safely, wait for mediaReady

The page opens with the core behavior: "Position and duration on the player are numbers of seconds" with one exception (percentage is 0-100). Each task is then addressed:

**Reading:** `fn time()` returns position in seconds (line 17), `fn duration()` returns length (line 25). Code shows both calls. Caveat: duration is 0 until loaded (line 26-29). Reader knows to guard division by duration.

**Cursor change:** When the item id differs, time/duration reset to 0 before the `str item` event fires. Wait for `str mediaReady` to read the new item's position (lines 36-43). Code example shows listening for mediaReady and then reading time/duration safely.

**Seek:** Pass seconds to `fn time(...)` to seek (line 67). The setter returns a Promise (line 69). Or use `fn seekByPercentage(0-100)` (line 75). Code shows both: `await player.time(82.4)` and `player.seekByPercentage(50)`.

## Consistent snapshots

Section "One consistent snapshot" (lines 45-63) explains `fn timeData` returns all time fields from one moment, avoiding race conditions. The table lists position, duration, buffered, remaining, percentage. A reader who needs multiple time values together now knows to call timeData once instead of calling multiple getters.

## Terminating events and edge cases

Sections on seek cancellation (beforeSeek, seekPrevented), buffering (buffered(), bufferedRanges, seekable), and the itemEndingSoon event with threshold provide complete coverage. Edge cases are stated: "It is a no-op while duration is 0 or non-finite, so scrubbers stay quiet before metadata lands" (line 77).

## Terms and context

"backend" (mentioned as the layer that receives position updates) is a package term but is clear in context (the implementation detail behind the API). "Metadata" and "TimeRanges" are standard HTML5 media APIs; a web developer audience knows these. "mounted" and "item" are explained through usage.

## Code examples

All examples are complete and working:
- Lines 20-23: Position and duration reads
- Lines 39-43: mediaReady listener with time/duration read
- Lines 79-82: Seek with await; seekByPercentage
- Lines 100-102: Setup with itemEndingSoonThreshold

## Why PASS

A reader can accomplish all three stated tasks: read position/duration safely, wait for the right event after a cursor change, and seek with either seconds or percentage. The caveats (guard division by duration; wait for mediaReady) are explicit. All examples are working code.
