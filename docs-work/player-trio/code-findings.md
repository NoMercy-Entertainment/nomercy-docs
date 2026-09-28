# Code findings

These are places a written lead disagreed with the source. The source is what the pages state. They are not player bugs to file, unless a later page shows a name that promises something else.

## Queue selection event

Lead in `3-player-trio-facts.md`: `current` is the one event for a new queue item.

Source: `nomercy-player-core/src/core/mixins/queue.ts` emits `item`. `current` is the `beforeMutation` method name, and an old event name that warns the caller toward `item`.

## Time after the cursor moves

Lead: after `item`, `time()` and `duration()` still belong to the outgoing item until `mediaReady`.

Source: on cursor change the queue mixin zeroes internal time and duration before it emits `item`. The cursor still moves before the media element switches, but an `item` listener does not observe the outgoing end position.
