# Fact check: /nomercy-player-core/tour/errors
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/errors.mdx
Reviewed-SHA: d2337e70e298e940

Source: `packages/player-web/nomercy-player-core/src/errors/` (`player.ts`, `auth.ts`, `network.ts`, `media.ts`, `plugin.ts`, `policy.ts`, `drm.ts`, `not-implemented.ts`, `code.ts`, `severity.ts`, `index.ts`); severity emit via `EventEmitter.emit` in `adapters/event-bus/default.ts`; 401 refresh in `core/auth-fetch/attempt.ts` / `orchestrator.ts` / `prepare.ts`. Example: `src/examples/core-tour-errors.ts`. Method: read page, example, and source; SHA via python `hashlib.sha256` first 16 hex; no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. British spelling: none. Snippet: `live="false"`. Fields described in prose (no field table). Class table: five data rows. `PluginError` is one sentence outside the table.

## Gate checks

| Gate | Result |
| --- | --- |
| `markHandled` / `stopImmediatePropagation` / `preventDefault` only set flags; standard emit does not read them | Pass (`player.ts:115-135`; `default.ts:222-241` calls every listener, never checks flags) |
| Page does not claim `preventDefault` suppresses auto-retry | Pass (page:22-24; source JSDoc still says that — page correctly does not) |
| Class hierarchy (`AuthError` → `NetworkError` → `PlayerError`) | Pass (`auth.ts:17`; `network.ts:16`) |
| 401 may refresh before `AuthError`; 403 raises at once | Pass (`attempt.ts:141-172`; `orchestrator.ts:23-24`; `prepare.ts:160`) |
| Example imports match package exports | Pass (`core-tour-errors.ts:16-21`; `src/index.ts` exports those symbols) |
| Em dash / en dash on page or example | none |
| Old library nickname (the old nickname) on page or example | none |
| British spelling on page or example | none |
| Snippet `live="false"` | Pass (page:82) |
| Sentence ≤30 words / paragraph ≤60 words | Pass (prose counted with typography tokens) |
| Table ≤6 non-separator lines | Pass (1 header + 5 class rows = 6) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Import error classes from `@nomercy-entertainment/nomercy-player-core` | `src/index.ts` error exports | Supported |
| Typed failure is `PlayerError`; catch by class, `code`, or both | `player.ts:46-65`; `code` always present | Supported |
| Some sites throw subclasses; others emit `PlayerErrorEvent` on `fatal` / `error` / `warning` / `info` | `types/events.ts:257-260`; `makePlayerErrorEvent` | Supported |
| Event wraps the same `PlayerError` for `instanceof` on both paths | `PlayerErrorEvent.error` in `player.ts:91-92` | Supported |
| Flag mutators / readers only flip closure flags | `player.ts:121-134` | Supported |
| Standard severity emit does not honor those flags; all listeners still run | `default.ts:228-241` | Supported |
| `PlayerError` extends `Error`; severity defaults to `error` | `player.ts:46,60` | Supported |
| Fields in prose: `code`, `severity`, `scope`, `context`, `suggestion`, `cause`; optional `id` | `player.ts:12-34,48-54` | Supported |
| `isHttp(century)` from `context.httpStatus` | `player.ts:67-71` | Supported |
| Display fallback `suggestion ?? message` | `suggestion` / `message` on class; example uses it | Supported |
| Scope kinds without id: `core`, `network`, `auth`; with id: `plugin`, `backend`, `stream`, `cue` | `code.ts:14-21` | Supported |
| `AuthError` extends `NetworkError`; network catch sees auth | `auth.ts:17` | Supported |
| Five-row class table framing | class files + `index.ts` exports | Supported |
| 401 may refresh before `AuthError`; 403 raises at once | `attempt.ts:141-172`; `orchestrator.ts:23-24`; `prepare.ts:160` | Supported |
| `PluginError` sentence: registration or plugin throw | `plugin.ts:13-20` | Supported |
| Remaining: `DrmError`, `StreamError`, `ResourceError`, `BrowserPolicyError`, `NotImplementedError` | class files; `index.ts` | Supported |
| Factories stamp scope and default severity | `stateError`, `pluginError`, `mediaFormatError`, `resourceError`, `browserPolicyError` | Supported |
| Code patterns `core:state/<reason>`, `core:media/<reason>` | `player.ts:145`; `media.ts:14,47` | Supported |
| Full catalog / retry policy on errors reference | deferral only | Supported (path as written) |
| `makeCode` / `parseCode` / `formatCode` eight-digit round-trip; `SEVERITY` / `SEVERITY_LEVEL` map to 1–4 | `code.ts:43-73`; `severity.ts:14-30` | Supported |
| Example: narrowest-first `instanceof`; `stateError` + `AuthError` sample | `core-tour-errors.ts:31-56` | Supported |
| Next: event bus for severity channels | Path shape only | Supported (path as written) |

## Notes (settled, not failures)

- `PlayerErrorEvent` JSDoc in `player.ts:87-89` still claims `preventDefault` suppresses default-action auto-retry and that `stopImmediatePropagation` stops other handlers. Runtime `makePlayerErrorEvent` only sets flags, and `EventEmitter.emit` never reads them. The page matches runtime, not that stale comment.
- Class table sits at exactly six non-separator lines (header + five data rows); at the limit, not over.
