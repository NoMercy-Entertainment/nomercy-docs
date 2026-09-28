# Fact check: /nomercy-player-core/handbook/errors-state
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/errors-state.mdx
Reviewed-SHA: 993d15b2ae56df1b

Source: `packages/player-web/nomercy-player-core/src/core/plugin/base.ts` (`throw`, `report`, `buildError`, `surfaceError`, `_applyRecoveryAction`, `enable`/`disable`, `state`/`options`, logger/storage init); `core/plugin/throw.ts` (`ThrowPayload`, `PluginRecoveryAction`; `PluginThrow` exported but unused by `throw()`); `adapters/logger/default.ts` (`child`); `core/mixins/plugin-registration.ts` (`dep-failed:<id>` cascade). Example: `src/examples/core-handbook-errors-state.ts`. Method: read page, example, and plugin base; SHA256 of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. British spelling: none. Snippet: `live="false"`. `getRuntimeState` sample is a `Plugin` subclass (valid TypeScript).

## Gate checks

| Gate | Result |
| --- | --- |
| `throw()` raises `PlayerError`, not `PluginThrow` | Pass (`base.ts:569-572,588-601`; `PluginThrow` only re-exported) |
| `Logger.child(id)` prefixes the id | Pass (`base.ts:301`; `default.ts:104-107`) |
| Storage keys use `nmplayer-<id>-` | Pass (`base.ts:276,304`) |
| `getRuntimeState` sample extends `Plugin` | Pass (page `:85-89`; example `:67-69`) |
| Em dash / en dash on page or example | none |
| Old library nickname (the old nickname) on page or example | none |
| British spelling on page or example | none |
| Snippet `live="false"` | Pass (page `:105`) |
| Sentence ≤30 words / paragraph ≤60 words | Pass (prose counted with typography tokens) |
| Table ≤6 non-separator lines | Pass (1 header + 4 action rows = 5) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Helpers stamp `scope.kind` as `plugin` with plugin id | `base.ts:593-596` | Supported |
| `throw` builds `PlayerError`, surfaces it, throws that value | `base.ts:569-572` | Supported |
| Throw severity defaults to `error` | `base.ts:592` | Supported |
| `report` surfaces and returns; severity defaults to `warning` | `base.ts:580-586` | Supported |
| `ThrowPayload`: `code` plus optional message/cause/context/suggestion/severity/id | `throw.ts:20-31` | Supported |
| Emits severity channel; `error`/`warning` also emit `plugin:error` / `plugin:warning` | `base.ts:612-618` | Supported |
| Payload shape `{ error, severity, scope, timestamp }` | `base.ts:605-610` | Supported |
| Raw `throw new Error(...)` skips stamp and those events | only `buildError`/`surfaceError` stamp and emit | Supported |
| `onError` maps code → recovery; runs after surface | `base.ts:620-623,641-681` | Supported |
| Actions: ignore / disable(`onError:<code>`) / retry-once / fallback | `base.ts:645-679` | Supported |
| Missing retry/fallback hooks only log a warning | `base.ts:661-662,676-677` | Supported |
| New plugin starts enabled; `enable`/`disable` idempotent; reason on disable | `base.ts:279,339-362` | Supported |
| Emit bare and id-namespaced `plugin:enabled` / `plugin:disabled` | `base.ts:344-361` | Supported |
| `on` listeners stay subscribed while disabled | `base.ts:336-337`; no unsubscribe in enable/disable | Supported |
| Failed dependency registration disables with `dep-failed:<id>` | `plugin-registration.ts:127,137-147` | Supported |
| `state()` → id/version/enabled/opts/runtime; `getRuntimeState` default `{}` | `base.ts:365-378` | Supported |
| `options()` frozen shallow copy; partial merge emits three opts channels | `base.ts:394-407` | Supported |
| Hand-writing `this.opts` skips those events | only `options(partial)` emits | Supported |
| Logger child prefixed with id; storage `nmplayer-<id>-`; both before `use` | `base.ts:290-305` | Supported |
| Follow player logger/storage adapters when set | `base.ts:297-304` | Supported |
| Example: throw/report/onError disable/state/options/storage | `core-handbook-errors-state.ts:37-139` | Supported |
| Next: i18n handbook path | Path as written: `/nomercy-player-core/handbook/i18n` | Supported |

## Notes (settled, not failures)

- `PluginThrow` still exists and is exported, and its JSDoc claims `this.throw(...)` raises it, but runtime `throw()` builds and throws `PlayerError`. The page matches runtime.
- Page source comment points at `src/index.ts`; behavior lives in `core/plugin/base.ts`. Not a false API claim.
