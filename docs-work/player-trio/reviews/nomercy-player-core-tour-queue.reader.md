# Reader: /nomercy-player-core/tour/queue

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/queue.mdx

Reviewed-SHA: 47b95350b418818e

## Same-voice comparison

Skipped. There is no approved reference page yet for this section.

## Snippet

`core-tour-queue.ts` (via `:::snippet{file="core-tour-queue" live="false"}` under **See the safe play path**). Comments and calls mirror the race story: avoid bare `item()` then `play()`, use `item(1, { autoplay: true })`, plus `playItem` and `playNow`. The sample also wires an `item` listener, replaces the list, and uses `queueAppend`, `peekNext`, and `queueLength`. It does not demonstrate `seekToIndex`, backlog APIs, ingest hooks, or the list event handlers shown in inline blocks on the page. Judgment below is for the MDX page only.

## Reader notes (JavaScript background, Quick Start completed)

I read the page in order without opening player source, treating Quick Start as done because the prose says so.

The intro states the goal (move the playlist and cursor without racing `play` ahead of load), then defines **mixin** immediately after naming `composeMixins`, and glosses **`queueMethods`** and **`playQueueMethods`** on first use. That order works for a tour reader who already composed a class.

List read and mutate APIs are grouped in one section. The note that the first `queue()` call wires list events onto the **player event emitter**, the same surface **`on`** uses, replaces vague bus language and ties events to something Quick Start already uses.

**Ingest** is defined in plain language before the optional normalizer, config transform, and title token registry. **The cursor** section explains `item`, `index`, `beforeMutation`, the `item` event, internal time reset, pending selection during **setup**, and when writes load versus park.

**Play after the source is set** explains why a separate `play()` line races `load`, and when `autoplay`, `playItem`, and `playNow` are safe. **Move by ordinal without loading** separates `seekToIndex` from load and play.

**What the list announces** is a short prose list of queue and cursor event names, not a table. Each sentence ties one emit to a mutation or cursor change, which is easier to scan than a grid for a first read.

**The backlog** is clearly a side list with its own events and no cursor or ingest behavior.

Doc typography (`fn`, `key`, `str`, `cls`) matches other tour pages.

## Friction (does not fail the rubric)

**Wire format** on the normalizer hook is informal with no one-line definition. **`source`** and **`startAt`** on options are deferred to behaving like on `item` without defining them here. **`mounted`**, **ready pipeline**, and lifecycle substates **`idle`**, **`disposing`**, and **`disposed`** assume vocabulary from setup or other docs. **`cursor`** appears in the opening before the dedicated section; context and neighbor helpers make the meaning clear. **`load`** is named as what `item` starts but not fully specified on this page; Quick Start and earlier tour pages carry that weight.

## Why PASS

Under the rubric (fail when a library or doc name is used before it is explained on this page, with Quick Start as the stated prerequisite), first mentions of mixin, the two queue bundles, ingest, and the event surface are explained at or right after introduction. The sentence-style event list does not introduce new unexplained names. I can follow list mutation, cursor moves, the safe autoplay path, ordinal seek, events, and backlog without guessing those composition terms.
