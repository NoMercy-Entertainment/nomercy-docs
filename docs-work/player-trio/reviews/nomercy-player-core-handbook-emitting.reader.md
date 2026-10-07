# Reader: /nomercy-player-core/handbook/emitting
Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/handbook/emitting.mdx

Reviewed-SHA: 518851e4414ed8fa

## Primary task clarity: cancel or reshape actions

The opening task is clear: "Use this page when you need to cancel or reshape an action before it runs." The code example shows `player.on('beforePlay', (e) => { e.preventDefault(); })`. A reader understands how to cancel. The flow section (lines 15-48) explains the mechanics: listeners receive a mutable event, can call preventDefault, stopImmediatePropagation, or delay on a promise. This section passes.

## Secondary section: unexplained terms and density

Lines 59-72 list class mappings for emitted events. Multiple terms are undefined:

1. **"container"** — used as "player container" (line 59) without introduction. Is this an HTML element? A div? Which element?

2. **"mapped events"** — introduced on line 59 but never defined. What makes an event "mapped"? All events, or a subset?

3. **"payload"** — used on line 67 ("toggle from a boolean field on the payload") but not explained. What payload? The event data?

4. **Event type names** — `fatal`, `error`, `warning`, `info` mentioned on line 13 but not defined until the table on lines 42-46. A reader hitting line 55 ("fatal sets play state to error first") has already seen "fatal" used without introduction.

## Density: parallel facts that should be a table

Lines 59-72 describe event-to-class mappings in flowing prose:

> Mapped events also update classes on the player container. Playback swaps among playing, paused, stopped, ended, loading, and buffering. play and playing add playing. pause, stop, and ended add their matching class. waiting and stalled add buffering and drop playing. canplay and time drop buffering. mute, fullscreen, pip, and theater toggle from a boolean field on the payload. activity swaps active and inactive. phase with to of ready rests on paused, or stays playing when play state is already playing. After that first ready, a later loading phase leaves the resting class alone.

This is 10 sentences describing a mapping. The pattern is: "Event X adds/removes/swaps class Y." This belongs in a table, not prose. A reader cannot scan or look up a mapping quickly.

## Incomplete snippet

Line 76 references a snippet with `lines="76-80"`. This is a 5-line snippet, shown as rendered output. The snippet is not shown in full here (HTML extraction failed), so the reader sees an incomplete example.

## Why FAIL

The primary task (cancel/reshape with preventDefault) is clear and usable. But the secondary content violates density rules, uses undefined terms, and incompletely shows the example. A reader seeking to understand what emit does to classes (which the page claims to teach) will struggle with "container", "mapped events", and the unmappable prose-to-class reference.
