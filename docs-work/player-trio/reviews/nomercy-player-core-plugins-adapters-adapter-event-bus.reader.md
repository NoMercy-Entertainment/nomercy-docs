# Reader: /nomercy-player-core/plugins-adapters/adapter-event-bus

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-event-bus.mdx

Reviewed-SHA: d8cf097eaf7cef80

## Same-voice comparison

Skipped. Per review instructions, same-voice comparison was not performed.

## Snippet

Expands to `src/examples/core-adapter-event-bus.ts`. Imports match the page: `EventEmitter` from `@nomercy-entertainment/nomercy-player-core`, `IEventBus` as a type from `@nomercy-entertainment/nomercy-player-core/adapters/event-bus`. The sample constructs `new EventEmitter<DemoEvents>()`, types `listenReady` against `IEventBus`, and exercises `on`, `once`, `all`, `emit`, `hasListeners`, `listenerCount`, and `off`. The file header comment repeats that there is no `eventBus` setup slot and that players inherit `EventEmitter`.

## Reader notes (JavaScript background, first visit)

The page leads with the contract (`IEventBus` and its `on` / `emit` surface) and immediately states what is not supported: no `eventBus` key in `setup`, and no passing a replacement bus in. It tells me to listen on the player I already have. That answers the wiring question without implying I should hunt for a hidden setup option.

A copy-paste import block near the top names both paths: implementation from the package root (or the event-bus subpath), interface type only from `@nomercy-entertainment/nomercy-player-core/adapters/event-bus`. The custom implementation section repeats the type import. I do not need to guess exports.

Built-in adapter behavior, the full interface block, and the custom `RecordingBus` example separate typing and fakes from player integration. Custom implementations are for tests or forwarding; the page states again that you still cannot pass that object into `setup`.

There is no prose that assumes I arrived from another doc page (only a See also link to Testing).

## Rubric (imports and setup)

| Question | Answer from this page alone |
| --- | --- |
| What do I import for a concrete bus? | `EventEmitter` from `@nomercy-entertainment/nomercy-player-core` or the event-bus subpath. |
| What do I import for typing? | `import type { IEventBus } from '.../adapters/event-bus'`. |
| Can I replace or inject the bus in `setup`? | No. Stated explicitly in the opening and in Custom implementation. |

Under the stated bar (fail if imports stay unclear, if setup replacement stays unclear, or if the page says you came from elsewhere), this page passes.

## Why PASS

Import paths and the no-setup-slot rule are visible early and reinforced in the snippet and custom-bus section. A newcomer can start typing helpers or building a standalone emitter without opening source first.
