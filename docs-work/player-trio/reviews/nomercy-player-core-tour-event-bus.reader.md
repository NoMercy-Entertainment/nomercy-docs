# Reader: /nomercy-player-core/tour/event-bus

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/event-bus.mdx

Reviewed-SHA: e87a073a733ede4a

## Terms explained before first use

- “event bus” — explained in opening: “Listen on the player you already built” and “There is no separate bus to create”
- “handler” — used in line 18 (your handler); expected from JavaScript background but not re-explained
- “payload” — line 32, 76, 80, used to mean data passed to handlers; clear from context
- “firehose” — section header at line 64; defined as “fn on with str all receives every emit”; mentioned earlier (lines 42, 57) but with enough context (“fn off with str all”, “every emit”) that readers understand before the dedicated section
- “listeners-changed” — introduced as a named event (line 79); payload shape explained (key name and key count)
- “microtask” — line 81 “on a microtask, not inside your fn on call”; advanced JavaScript term, not explained; queue audience likely familiar

## Reader can do the task

The task: subscribe to events, handle them, and unsubscribe. Page provides:
- How to subscribe: on() for every emit, once() for next emit only (lines 18-19)
- Keep handler references for removal (line 20)
- How to unsubscribe: off(name, handler), off(name), off(‘all’) (lines 37-42)
- Idempotency: duplicate on() is safe (line 29)
- Event names: ‘item’ works, ‘current’ does not (lines 46-53)
- Payload shape: item and index for ‘item’ event (line 49)

A reader can listen and remove listeners.

## Code does not hide needed info

- Lines 23-26: on() and once() calls with named events
- Line 49: on() with ‘item’ event and payload destructuring
- Lines 75-76: hasListeners() check implied
- Snippet will expand to show registration, removal, and lifecycle

## No sentence needs a second read

Lines are short and each action is stated clearly. Line 60-62 packs three behaviors (snapshot, deferred off, error isolation) but each is stated in its own sentence.

## Why PASS

The reader understands how to subscribe with on/once, keep references for off, remove specific listeners or all listeners, and check listener presence. No term contradicts its explanation. API names are used only after they are introduced on this page.
