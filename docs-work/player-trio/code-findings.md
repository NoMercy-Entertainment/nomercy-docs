# Code findings

These are places a written lead disagreed with the source. The source is what the pages state. They are not player bugs to file, unless a later page shows a name that promises something else.

## Queue selection event

Lead in `3-player-trio-facts.md`: `current` is the one event for a new queue item.

Source: `nomercy-player-core/src/core/mixins/queue.ts` emits `item`. `current` is the `beforeMutation` method name, and an old event name that warns the caller toward `item`.

## Time after the cursor moves

Lead: after `item`, `time()` and `duration()` still belong to the outgoing item until `mediaReady`.

Source: on cursor change the queue mixin zeroes internal time and duration before it emits `item`. The cursor still moves before the media element switches, but an `item` listener does not observe the outgoing end position.

## Activity hide while buffering

Lead in `activity.ts`: paused, stopped, buffering, and ended keep the controls up.

Source: `_maybeHide` returns early only when `playState` is not `playing`. Buffering does not change that state, and there is no `ended` play state. The lifecycle page states the code.

## Setup after dispose

Lead in the `setup` JSDoc: after dispose, `setup` throws `core:player/disposed`.

Source: `_guardSetup` checks `_setupCalled` first and never clears it. A second `setup` after `dispose` throws `core:lifecycle/already-setup`. The disposed branch runs only when the phase is already disposed and setup never set the flag.
