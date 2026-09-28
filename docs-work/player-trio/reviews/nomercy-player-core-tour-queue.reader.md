# Reader: /nomercy-player-core/tour/queue

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/queue.mdx

Reviewed-SHA: 7b4069ed042d2b1d

## Same-voice comparison

Skipped. There is no approved reference page yet for this section.

## Snippet

`core-tour-queue.ts` (via `:::snippet{file="core-tour-queue" live="false"}` before **Next**). It shows the anti-pattern comment (`item` then `play`), then `item(1, { autoplay: true })`, `queueAppend`, `playItem`, and `playNow`, plus an `item` listener and basic list reads. It does not exercise `seekToIndex`, backlog APIs, normalization hooks, shuffle or sort, or the `queue` event handlers from the inline blocks. Judgment below is for the MDX page only.

## Reader notes (JavaScript background, player already composed)

I read the page in order without opening player source, assuming I already have a composed class from Quick Start and compose-methods.

The opening states the split clearly: changing the list does not start playback, and starting playback must wait until the new item has loaded. That frames the rest of the tour.

**Read and replace the list** names read (`queue()`), full replace, append, prepend, insert, remove, move, clear, shuffle, sort, length, index lookup, and peek helpers. The note that the first `queue()` call wires list changes to the same `on` surface I already use connects events to prior setup.

**What happens to each item** walks normalization order: optional `normalizePlaylistItem`, config `transformPlaylistItem`, title tokens via `registerTitleTokens`. Backlog is called out later as skipping that step, which avoids mixing the two lists mentally.

**Move the cursor** covers `item`, `index`, cancellable moves, the `item` event firing before media switches, internal time reset, pending selection when the list is still empty during setup, and lifecycle guards in `idle`, `disposing`, and `disposed`. `autoplay: false` is explicit when I only want the cursor moved.

**Start playback after the load** is the race section: `item` starts load with no promise; a bare `play()` on the next line can run too early and leave the item loaded but silent. The fix paths are `{ autoplay: true }` (or default autoplay), `playItem`, and `playNow`, with empty-list and interrupt behavior spelled out. I know what to call and what not to pair.

**Move by number without loading** separates `seekToIndex` (1-based, no load) from `item`.

**What you can listen for** lists queue and item event names in prose tied to mutations.

**A second list** describes backlog read and write and its events without moving the cursor.

Doc typography (`fn`, `key`, `str`, `cls`) matches other tour pages. The prose stays on player behavior; it does not describe the doc site or this page as an artifact.

## Friction (does not fail the rubric)

`source` and `startAt` on options are said to forward like on `item` without defining them here. Lifecycle substates and the full load pipeline are named but not re-taught. Normalization hooks assume I know my backend item shape. The closing **Next** link points back to compose-methods even though this tour assumes composition is already done; that is navigation, not a gap in queue behavior.

## Why PASS

I can change the list with the named queue helpers and replace API, move the cursor with `item` or `seekToIndex` when I only want selection, and start the new item without a silent race by using autoplay on `item`, `playItem`, or `playNow` instead of `item` followed immediately by `play`. The page does not talk about itself. Under the stated fail conditions, this passes.
