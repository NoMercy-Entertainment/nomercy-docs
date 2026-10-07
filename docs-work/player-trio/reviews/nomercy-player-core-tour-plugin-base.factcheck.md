# Fact check: /nomercy-player-core/tour/plugin-base
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/plugin-base.mdx
Reviewed-SHA: 3674cbdd7dc14518

Delta review since 2e9c15c; the full review before it passed.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5`. Method: `git diff 2e9c15c -- src/content/nomercy-player-core/en/tour/plugin-base.mdx`; every added or changed line checked; the section around each hunk re-read. The pseudo-tags used (`fn`, `var`, `str`, `el`, `attr`, `key`, `cls`, inline `ts`) are all defined in `src/lib/mdx/rehype.ts:102-126` and `:184`.

Snippet type-check: `tsc -p` on a scratch tsconfig outside the repo (paths to the core package SOURCE, as in `tsconfig.examples.json`) over `core-tour-adapters.ts`, `core-tour-i18n.ts`, `core-tour-plugin-base.ts`, `core-handbook-emitting.ts`: `EXIT 0`. Ranges match `src/examples/snippet-ranges.lock.json` (read).

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 40 | Snippet `lines="37-60,107,111-113,119-120"`: class with static `id`/`description`, `use`, `getRuntimeState`; `addPlugin` with options; `getPlugin`, `enabled()` true, `state().runtime` `{ plays: 0 }`; `removePlugin` then `getPlugin` is `undefined` | example `core-tour-plugin-base.ts:37-60,107,111-113,119-120`; `src/core/plugin/base.ts:331` `enabled()`, `:365-372` `state()` with `runtime: this.getRuntimeState()`, `:377` hook | Supported |
| 25-38 | Range shows exactly the section subjects (add, enabled, remove, getPlugin, state) | page lines 25-38 re-read against the ranges | Supported |

## Findings

None.

## Carried from the full review at 2e9c15c


Source: `packages/player-web/nomercy-player-core/src/core/plugin/base.ts`, `lifecycle.ts`, `index.ts`; `core/mixins/plugin-registration.ts`; `core/mixins/lifecycle.ts` (`_disposeAllPlugins`). Example: `src/examples/core-tour-plugin-base.ts`. Method: read page, example, plugin class, and registration mixin; SHA256 of page bytes (first 16 hex); no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example. Snippet: `live="false"`.

### Gate checks

| Gate | Result |
| --- | --- |
| Lifecycle hooks named on page exist on `Plugin` | Pass (`use`, `enable`, `disable`, `dispose`, `state`; no invented hooks) |
| `addPlugin` / `removePlugin` behavior | Pass (`plugin-registration.ts`: construct → `use` → `plugin:installed`; `dispose` then `plugin:disposed`) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:40`) |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass |
| Table data rows ≤ 6 on page | Pass (no tables) |
| Example imports match package root exports | Pass (`index.ts` Plugin, composeMixins, EventEmitter, initPlayerCoreState, playerCoreMethods, resolvePlayerConstructor, types) |

### Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Subclass `Plugin`; static `id` and `description` | `base.ts:126-167,152-156` | Supported |
| Pass class to `addPlugin` with options; consumer does not `new` the plugin | `plugin-registration.ts:508,385-388`; example `:107` | Supported |
| Install path: construct, call `use` once, emit `plugin:installed` | `plugin-registration.ts:375-475` | Supported |
| New plugin starts enabled; `enable` / `disable` flip flag, emit, idempotent | `base.ts:279,330-362` | Supported |
| `removePlugin(Class)` runs `dispose`, then emits `plugin:disposed` | `plugin-registration.ts:650-698,294-335` | Supported |
| Player `dispose` tears down every registered plugin the same way | `lifecycle.ts:223`; `plugin-registration.ts:719-734` | Supported |
| Override `dispose` only for untracked resources | `base.ts:314-325` | Supported |
| `getPlugin` returns live instance or `undefined` | `plugin-registration.ts:626-628` | Supported |
| `state()` reports `id`, `version`, enabled, opts, `runtime` | `base.ts:365-374`; `lifecycle.ts:13-19` | Supported |
| Example: `PlayCounterPlugin`, `addPlugin` before `setup`, milestone event, `removePlugin` | `core-tour-plugin-base.ts:37-120`; emit namespace `base.ts:496-500` | Supported |
| Next: Queue tour path | Path as written: `/nomercy-player-core/tour/queue` | Supported |
