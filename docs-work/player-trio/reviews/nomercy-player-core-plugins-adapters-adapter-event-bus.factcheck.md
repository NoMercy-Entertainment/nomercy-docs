# Fact check: /nomercy-player-core/plugins-adapters/adapter-event-bus
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-event-bus.mdx
Reviewed-SHA: 6d194c441c87bb7c

Source: `nomercy-player-core/src/adapters/event-bus` (`IEventBus.ts`, `default.ts`, `index.ts`), root `src/index.ts`, `package.json` exports, and inheritors `MediaList`, `MediaElementBackend`, `StubPlayer`. Example: `src/examples/core-adapter-event-bus.ts`. Method: read source and example; SHA via the prescribed python one-liner; no site build. Em dash / en dash scan of the page: none. Word `kit` on the page: none.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IEventBus` is a type to write against, not a setup field; no `eventBus` option | `IEventBus.ts:13-16`; no `eventBus` in `types/config.ts` | Supported |
| `EventEmitter` importable from package root | `src/index.ts:41` | Supported |
| `IEventBus` type from `./adapters/event-bus` subpath | `adapters/event-bus/index.ts:10`; `package.json` `./adapters/event-bus` export | Supported |
| `EventEmitter` also from that subpath; `IEventBus` only there (not root) | `adapters/event-bus/index.ts:9-10`; root exports `EventEmitter` only, no `IEventBus` | Supported |
| `EventEmitter` is the shipped implementation; MediaList, MediaElementBackend, StubPlayer extend it | `default.ts:61`; `media-list/default.ts:44`; `MediaElementBackend.ts:99`; `stub-player.ts:89` | Supported |
| Nothing in setup constructs a separate bus to inject; classes inherit `EventEmitter` | No setup slot; inheritance sites above | Supported |
| Extra vs `IEventBus`: `all` firehose as `(event, data)` | `default.ts:70-71,101-116,243-254` | Supported |
| Extra: `listeners-changed` on microtask; payload `name` and `count` | `default.ts:75-86,125-126` | Supported |
| Extra: `on('current', ...)` console.warn pointing to `item` | `default.ts:37-39,110-113` | Supported |
| Throwing handler does not stop the rest; `emit` snapshots first | `default.ts:228-240` | Supported |
| Same function twice for one event registers once | `default.ts:92-93,124` (`Set`) | Supported |
| `once` stores wrapper so `off` with original still removes it | `default.ts:50-53,139-145,195-198` | Supported |
| `listenerCount` totals every event including firehose | `default.ts:276-279` | Supported |
| `hasListeners` ignores the firehose | `default.ts:266-268` (only `listeners` map) | Supported |
| Documented interface members match `IEventBus` | Page :64-82 vs `IEventBus.ts:18-36` (same overloads) | Supported |
| Bare-string overload for dynamic names such as `plugin:<id>:<event>` | `IEventBus.ts` string overloads; `default.ts:11-15,97-99` | Supported |
| Custom impl cannot pass through setup; no replaceable bus instance | Same as no `eventBus` setup | Supported |
| Example: root `EventEmitter`, subpath `IEventBus`, standalone bus, no setup slot | `core-adapter-event-bus.ts:10-11,14-15,28-48` | Supported |
| See also: StubPlayer extends EventEmitter; leak harness uses `listenerCount` | `stub-player.ts:89`; `leak-harness.ts:27-41` | Supported |

## Notes (settled, not failures)

- `EventEmitter` also exposes `listenersOf` (internal for plugins). Page correctly treats it as a class-only extra it does not list; no claim that the listed extras are exhaustive beyond the three named behaviors.
- Page `off(event: 'all')` overload matches `IEventBus` (no optional `fn` on that overload). Runtime `EventEmitter.off('all', fn)` can remove one firehose listener; that is class surface beyond the interface block.
