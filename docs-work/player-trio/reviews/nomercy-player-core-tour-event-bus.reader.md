# Reader: /nomercy-player-core/tour/event-bus

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/event-bus.mdx

Reviewed-SHA: d7b92d456e7e5442

## Same-voice comparison (approved: tour/queue)

Both pages assume a **`player` you already built** and teach behavior in short sections with the same doc typography (`fn`, `str`, `key`). Queue connects list edits to **`fn on`** in the first **`fn queue`** call; event-bus opens by stating that **`fn on`**, **`fn once`**, **`fn off`**, and **`fn emit`** live on that instance with no separate bus object—same “on your instance, not a new subsystem” rhythm.

Queue’s **What you can listen for** names events beside the mutations that emit them; event-bus splits subscribe, stop, **`str item`** vs **`str current`**, emit semantics, **`str all`**, and **`fn hasListeners`** into focused sections with inline **`player.on` / `player.off`** blocks, matching queue’s pattern of prose plus one or two runnable lines. **Next** on both pages is a single forward link after the snippet, not a recap of the page.

## Snippet

`core-tour-event-bus.ts` (via `:::snippet{file="core-tour-event-bus" live="false"}` before **Next**). It builds an **`EventBusTourPlayer`** with **`composeMixins`**, **`setup`**, and **`await player.ready()`**, then registers **`on('item')`**, **`once('item')`**, and **`on('all', logAll)`**, loads the queue, selects an item, logs **`hasListeners('item')`** and **`listenerCount()`**, and removes listeners with **`off('all', logAll)`** and **`off('item')`** before dispose. The MDX does not name **`composeMixins`**, **`ready`**, or class boilerplate; judgment below is for the MDX page only.

## Reader notes (JavaScript background, player already composed)

I read the page in order without opening player source, assuming I already have a composed player from earlier tour or build docs.

The opening states where the API lives: listen on the player instance; no separate event-bus object to construct or inject.

**Subscribe** explains **`fn on`** (every matching emit), **`fn once`** (next emit only, then removed), and keeping the same function reference for **`fn off`**. The duplicate-registration rule and typed vs bare string names are clear. I know to call **`player.on('item', handler)`** or **`player.once(...)`**.

**Stop listening** explains **`fn off(event, handler)`** for one registration (including a **`once`** that has not fired yet), **`fn off(event)`** to drop all handlers for that name, and **`fn off('all')`** with no handler to clear everything. That is enough to remove listeners even before the firehose section names **`str all`** again in listener form.

**Hear a new item** ties **`str item`** to the active entry and index and warns that **`str current`** never fires (with a console warning toward **`str item`**).

**What emit delivers** describes ordering, empty-listener short-circuit, snapshotting, deferred **`off`** inside handlers, and error isolation—useful if I emit from my own code or debug library emits, not required to subscribe.

**The firehose** defines **`fn on('all', (event, data) => …)`** and removing it with **`fn off('all', sameFn)`**.

**Check before you build a payload** covers **`fn hasListeners`**, **`fn listenerCount`**, and **`str listeners-changed`** on a microtask with **`key name`** and **`key count`**.

Doc typography matches queue and other tour pages. The prose stays on player behavior; it does not describe the doc site or this page as an artifact.

## Friction (does not fail the rubric)

The word **firehose** appears in **Stop listening** and **What emit delivers** before **The firehose** section, but **`str all`** and the drop-all **`fn off`** behavior are already stated, so I am not blocked on listen or remove. **Event map** is named once for typed handlers without a mini-lesson on generics. **`fn emit`** is listed in the intro and detailed later; I only need **`on` / `once` / `off`** to integrate. The snippet’s **`queue`**, **`item`**, and lifecycle calls assume prior queue tour material, which matches series order.

## Why PASS

I can subscribe with **`player.on`** and **`player.once`**, keep handler references for **`player.off(name, fn)`**, clear a name with **`player.off(name)`**, and clear or remove the catch-all path with **`off('all', fn)`** or **`off('all')`**. Under the stated fail conditions (must know how to listen and remove; no API name used before it is explained on this page for terms I need to act), this passes.
