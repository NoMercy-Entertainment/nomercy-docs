# Fact check: /nomercy-player-core/plugins-adapters/adapter-event-bus
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-event-bus.mdx
Reviewed-SHA: 374bdddaa6b8aaa5

Delta review since cc9b94c; the full review before it passed.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5`. Method: `git diff cc9b94c -- src/content/nomercy-player-core/en/plugins-adapters/adapter-event-bus.mdx`; every added or changed line checked; the section around each hunk re-read. The pseudo-tags used (`fn`, `var`, `str`, `el`, `attr`, `key`, `cls`, inline `ts`) are all defined in `src/lib/mdx/rehype.ts:102-126` and `:184`.

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 14, 83 | No `key eventBus` option in `fn setup` (tag only) | unchanged claim, carried | Supported |
| 24 | `str adapters/event-bus` path | `package.json` exports key `./adapters/event-bus` | Supported |
| 40 | `fn on` with a function it already holds adds nothing: handlers for one event are a set | `src/adapters/event-bus/default.ts:69` (`Map<string, Set<AnyHandler>>`), `:118-124` (`set.add(fn)`) | Supported |
| 38-42 | Nearby sentences (snapshot before iterate, `once` wrapper) not contradicted | page lines 36-43 re-read | Supported |

## Findings

None.

## Carried from the full review at cc9b94c


Source: `nomercy-player-core/src/adapters/event-bus` (`IEventBus.ts`, `default.ts`, `index.ts`), root `src/index.ts`, `package.json` exports. Example: `src/examples/core-adapter-event-bus.ts`. Method: read page, example, and adapter source; SHA via the prescribed python one-liner; no site build. Em dash / en dash on the page: none. Old library nickname on the page: none.

### Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IEventBus` types a listener surface; no `eventBus` setup option; do not pass a replacement bus | `IEventBus.ts:13-16`; no `eventBus` under `src/types`; page denies the option rather than advertising it | Supported |
| `EventEmitter` from package root | `src/index.ts:41` | Supported |
| `IEventBus` from `adapters/event-bus` subpath | `adapters/event-bus/index.ts:10`; `package.json` `./adapters/event-bus` | Supported |
| `EventEmitter` also from that subpath; `IEventBus` only on the subpath | `adapters/event-bus/index.ts:9-10`; root exports `EventEmitter` only | Supported |
| `EventEmitter` is the constructible implementation | `default.ts:61` | Supported |
| Extra vs interface: `all` firehose as `(event, data)` | `default.ts:70-71,101-116,243-254` | Supported |
| Extra: `listeners-changed` on microtask with `name` and `count` | `default.ts:75-86,125-126,189-190` | Supported |
| Extra: `on('current', ...)` warns toward `item` | `default.ts:37-39,110-113` | Supported |
| Throwing handler does not stop the rest; `emit` snapshots first | `default.ts:228-254` | Supported |
| Same function twice for one event registers once | `default.ts:92-93,124` (`Set`) | Supported |
| `once` stores a wrapper so `off` with the original still removes it | `default.ts:50-53,139-145,195-198` | Supported |
| `listenerCount` totals every event including firehose | `default.ts:276-279` | Supported |
| `hasListeners` ignores the firehose | `default.ts:266-268` (only `listeners` map) | Supported |
| Documented interface members match `IEventBus` | Page interface block vs `IEventBus.ts:18-36` (same overloads) | Supported |
| Bare-string overload for dynamic names such as `plugin:<id>:<event>` | `IEventBus.ts` string overloads; `default.ts:11-15,97-99` | Supported |
| Custom `IEventBus` impl still cannot enter `setup` | Same as no `eventBus` setup slot | Supported |
| Example: root `EventEmitter`, subpath `IEventBus`, standalone bus, no setup slot | `core-adapter-event-bus.ts:14-15,28-48` | Supported |
| See also: Testing uses `listenerCount` for leftover subscriptions | `testing/leak-harness.ts` uses `listenerCount` | Supported |

### Notes (settled, not failures)

- `EventEmitter` also exposes `listenersOf` for plugin internals. The page correctly limits class-only extras to the three named behaviors; it does not claim that list is every class-only member.
- Interface `off(event: 'all')` matches `IEventBus`. Runtime `EventEmitter.off('all', fn)` can drop one firehose listener; that is class surface beyond the interface block.
