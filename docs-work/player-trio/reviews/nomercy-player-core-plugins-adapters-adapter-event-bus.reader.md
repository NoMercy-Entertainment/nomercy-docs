# Reader: /nomercy-player-core/plugins-adapters/adapter-event-bus

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-event-bus.mdx

Reviewed-SHA: 6d194c441c87bb7c

## Same-voice comparison

Skipped. There is no approved reference page yet for this section.

## Snippet

Expands to `src/examples/core-adapter-event-bus.ts`. The example matches the import block on the page: `EventEmitter` from the package root, `IEventBus` as a type from `@nomercy-entertainment/nomercy-player-core/adapters/event-bus`. It builds a standalone `new EventEmitter<DemoEvents>()`, types a helper with `IEventBus`, and uses `on`, `once`, `all`, `emit`, `hasListeners`, `listenerCount`, and `off`. The file comment states that players inherit `EventEmitter` and there is no `eventBus` setup slot, which aligns with the prose.

## Reader notes (JavaScript background, first visit)

The opening paragraphs set expectations before any API detail: `IEventBus` is the listening contract, not something you pass into player setup. The page says explicitly that there is no `eventBus` option and nothing in setup constructs a bus to inject. Instead, player-related classes inherit `EventEmitter` themselves. After one read I know I do not wire a separate bus through config; I listen on the player (or plugin) instance because it already is the bus surface.

Import paths are spelled out in a copy-paste block near the top and reinforced in the custom-implementation section for the type-only import. I learn that `EventEmitter` can come from the root or the `./adapters/event-bus` subpath, while `IEventBus` is only on the subpath. That is enough to start typing helpers or fakes without guessing package exports.

The **Built-in adapter** section separates interface from class extras (`all`, `listeners-changed`, `current`) and gives dispatch rules (snapshot on emit, duplicate handler deduped, `once`/`off` pairing). The full **Interface** block reads like normal TypeScript overloads for typed events plus string events for dynamic names.

**Usage** points at the snippet for a minimal standalone bus. **Custom implementation** shows a small fake when tests need one, and repeats that you cannot pass a custom bus through setup.

## Rubric (imports and wiring)

| Question | Answer from this page alone |
| --- | --- |
| What do I import for the real implementation? | `EventEmitter` from `@nomercy-entertainment/nomercy-player-core` (or the event-bus subpath). |
| What do I import for typing only? | `import type { IEventBus } from '.../adapters/event-bus'`. |
| Does the player wire an event bus for me? | Yes, by inheritance: no setup slot; the player object is the emitter surface. |
| Do I create and inject my own bus in setup? | No, stated multiple times. |

Under the stated bar (fail if imports or wiring stay unclear), this page passes. Terminology like `cls` and `fn` in prose is doc styling; the code blocks use ordinary JavaScript/TypeScript.

## Minor friction (not FAIL)

I still do not know from this page alone which concrete player class I will hold in app code (that likely lives on Quickstart or player-specific docs). The see-also link to Testing mentions `StubPlayer` as another `EventEmitter` subclass, which helps orientation for tests but not for production wiring.
