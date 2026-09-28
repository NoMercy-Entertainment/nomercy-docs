# Fact check: /nomercy-player-core/handbook/emitting
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/emitting.mdx
Reviewed-SHA: 7a936914d00cc123

Source: `packages/player-web/nomercy-player-core/src/core/dispatch.ts` (`runDispatchBefore`); `core/mixins/container-class-emit.ts` (`containerClassEmitMethods.emit`, `CONTAINER_CLASS_RULES`); `Plugin.dispatchBefore` → `runDispatchBefore` in `core/plugin/base.ts`; transport mixins via `_dispatchBefore` in `core/mixins/player-state.ts`. Example: `src/examples/core-handbook-emitting.ts`. Method: read page, example, and those sources; SHA256 of the mdx bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`. Sentence and paragraph word gates: all sentences ≤30 words, all paragraphs ≤60 words. Table: 4 non-separator lines (header + 3 data). British spelling: none.

## Gate checks

| Gate | Result |
| --- | --- |
| Shared `before*` runner used by transport mixins and `Plugin.dispatchBefore` | Pass (`dispatch.ts`; `player-state.ts:171-184`; `plugin/base.ts:555-560`) |
| Claims match `runDispatchBefore` + container-class emit | Pass |
| Old library nickname (the old nickname) on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:76`) |
| Sentence ≤30 words / paragraph ≤60 words | Pass (max sentence 17; max paragraph 32) |
| Table ≤6 non-separator lines | Pass (4) |
| British spelling | none |
| Example imports from package root | Pass (`index.ts` exports named imports) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Shared `before*` pass for transport and plugins before state change | `dispatch.ts:10-22,110-115`; transport `_dispatchBefore`; `Plugin.dispatchBefore` | Supported |
| Mutable event; reshape `data`; `preventDefault`; stop later listeners; `delay(promise)` | `dispatch.ts:13-17,124-136` | Supported |
| Listeners in subscription/insertion order; `stopImmediatePropagation` skips rest; throw logged, others continue | `dispatch.ts:88-92,143-154` | Supported |
| `delay` waits for all delayed promises together; rejection or timeout (> default 10 000 ms) prevents | `dispatch.ts:94-98,156-195`; `DEFAULT_TIMEOUT_MS = 10_000` | Supported |
| Outcome `data` is authoritative; `prevented` → abort, no success emit | `dispatch.ts:28-36,198-208` | Supported |
| Prevented reasons: `listener-prevented`, `delay-rejected`, `delay-timeout` | `dispatch.ts:181-203`; `PreventedReason` in `types/player.ts` | Supported |
| Event name on dispatch stack for whole pass including delayed wait | `dispatch.ts:100-102,138,211-213` | Supported |
| `emit` still delivers; pre-listener sync: `fatal` → play state `error`; `error`/`warning`/`info` do not | `container-class-emit.ts:233-241,216-224`; `PlayState.ERROR = 'error'` | Supported |
| Mapped events update container classes; play-state set `playing`/`paused`/`stopped`/`ended`/`loading`/`buffering` | `PLAY_STATE_CLASSES` + `CONTAINER_CLASS_RULES` | Supported |
| `play`/`playing` → `playing`; `pause`/`stop`/`ended` matching; `waiting`/`stalled` → `buffering`, drop `playing`; `canplay`/`time` drop `buffering` | `container-class-emit.ts:45-92` | Supported |
| `mute`/`fullscreen`/`pip`/`theater` toggle from boolean payload field; `activity` swaps `active`/`inactive` | `container-class-emit.ts:93-119,156-168` | Supported |
| `phase` `to: ready` → `paused`, or stay `playing` if play state already playing; later `loading` after first ready leaves resting class | `container-class-emit.ts:170-194` | Supported |
| No container → class step no-op; listeners still run | `container-class-emit.ts:141-143,241` | Supported |
| Example: reshape via `runDispatchBefore`, then `preventDefault`, `emit('play')` class, `emit('fatal')` → `playState()` | `core-handbook-emitting.ts:62-80` | Supported |
| Next: Errors and State path | `/nomercy-player-core/handbook/errors-state` exists | Supported |

## Example alignment

- Package-root imports including `runDispatchBefore`; compose seed; `beforePlay` reshape then prevent; `emit('play')` / `emit('fatal')` side effects.
- Matches handbook: cancel/reshape shared pass, then emit container class and fatal play-state sync.
