# Fact check: /nomercy-player-core/tour/event-bus
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/event-bus.mdx
Reviewed-SHA: d7b92d456e7e5442

Source: `packages/player-web/nomercy-player-core/src/adapters/event-bus/default.ts`, `IEventBus.ts`; queue mixin emit of `item` in `core/mixins/queue.ts`; payload type in `types/events.ts`. Example: `src/examples/core-tour-event-bus.ts`. Method: read page, example, and source; SHA via python sha256 of the mdx bytes (first 16 hex); no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none. Snippet: `live="false"`. Sentence and paragraph word gates: all sentences ≤30 words, all paragraphs ≤60 words. No tables.

## Gate checks

| Gate | Result |
| --- | --- |
| Selection event is `item`, not `current` | Pass (Listen for `item`; `current` warned as never fires) |
| `on('current')` warns and still registers; nothing emits `current` | Pass (`default.ts:37-39,110-126`; no production `emit('current')`; queue emits `item` at `queue.ts:107`) |
| `item` payload shape `{ item, index }` | Pass (`events.ts:266`; page and example destructure match) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:81`) |
| Sentence ≤30 words / paragraph ≤60 words | Pass |
| Table ≤6 rows | Pass (no tables) |
| Example imports from package root | Pass (`index.ts` exports all named imports) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `on` / `once` / `off` / `emit` live on the player instance; no separate bus for setup | `default.ts:42-44,61`; player extends `EventEmitter`; no `eventBus` setup slot | Supported |
| `on` every emit; `once` next emit then remove; same ref for `off` | `default.ts:89-146,151-153` | Supported |
| Same function twice for one event registers once | `default.ts:92-93,124` (`Set`) | Supported |
| Typed map names type the payload; bare string keeps `plugin:<id>:<event>` callable | `default.ts:105-107,97-99`; `IEventBus.ts` string overloads | Supported |
| `off(name, fn)` removes one; works for `on` and `once`; `off(name)` clears that name; `off('all')` clears all including firehose | `default.ts:151-177` | Supported |
| Listen for `item` for active entry and index | `events.ts:266`; `queue.ts:94-107` | Supported |
| `on('current')` never fires; console warn points to `item` | `default.ts:37-39,110-113`; test `event-bus-renamed-events.test.ts:36-74`; still registers under `current` (`default.ts:118-126`) | Supported |
| `emit` named listeners then firehose; early return when neither; snapshot before walk; `off` mid-handler next emit; throw caught, rest run | `default.ts:212-254` | Supported |
| `on('all')` is `(event, data)`; remove with `off('all', fn)` | `default.ts:101-116,155,243-254` | Supported |
| `hasListeners` ignores firehose; true only for named handlers | `default.ts:266-268` | Supported |
| `listenerCount` includes firehose | `default.ts:276-279` | Supported |
| First/last named listener schedules `listeners-changed` with `name` and `count` on a microtask | `default.ts:75-86,125-126` | Supported |
| Example: root imports, `on`/`once` `item`, firehose, `queue`/`item`, `hasListeners`/`listenerCount`, `off` | `core-tour-event-bus.ts:14,71-91`; exports in `index.ts` | Supported |
| Next: i18n path | Path as written: `/nomercy-player-core/tour/i18n` | Supported |

## Notes (settled, not failures)

- `on('current')` still adds the handler to the `current` listener set; production code never `emit`s `current`, so the handler never runs. The page correctly says it never fires and to use `item`.
- `item` in the payload may be `undefined` (`events.ts:266`); the example uses `item?.id`, which matches.
