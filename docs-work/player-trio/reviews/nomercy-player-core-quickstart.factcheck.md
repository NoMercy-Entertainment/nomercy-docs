# Fact check: /nomercy-player-core/quickstart
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/quickstart.mdx
Reviewed-SHA: 9d52cbdf5e8b9797

Delta review since cc9b94c; the full review before it passed.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5`. Method: `git diff cc9b94c -- src/content/nomercy-player-core/en/quickstart.mdx`; every added or changed line checked; the section around each hunk re-read. The pseudo-tags used (`fn`, `var`, `str`, `el`, `attr`, `key`, `cls`, inline `ts`) are all defined in `src/lib/mdx/rehype.ts:102-126` and `:184`.

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 32, 39 | `var playerCoreMethods` is a value (const tuple) | `src/core/index.ts:103` `export const playerCoreMethods = [...] as const` | Supported |
| 45, 47, 49 | `fn document.getElementById`, `el div` (tags only, wording unchanged) | unchanged claims, carried | Supported |

## Findings

None.

## Carried from the full review at cc9b94c


Source: `packages/player-web/nomercy-player-core/src` (`index.ts`, `core/compose.ts`, `core/constructor.ts`, `core/state.ts`, `core/index.ts`, `core/mixins/lifecycle.ts`, `adapters/event-bus/default.ts`). Example: `src/examples/core-quickstart.ts`. Cross-check: `nomercy-music-player/src/index.ts`, `nomercy-video-player/src/index.ts`. Method: read page, example, and source; recompute SHA; no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example. `hls.js`: dependency of the core package (`package.json:228`), not a separate install on this page. Snippet: `live="false"` present.

### Gate checks

| Gate | Result |
| --- | --- |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Page does not add `hls.js` as an extra install | Pass (only `@nomercy-entertainment/nomercy-player-core`; `hls.js` is a package dependency, not a peer) |
| Snippet uses `live="false"` | Pass (page `:34`) |
| Example `dispose` typed `() => Promise<void>` | Pass (`core-quickstart.ts:44`; `lifecycle.ts:207`) |
| Named APIs exported from package root | Pass (`index.ts:41`, `186-210`, `226`) |

### Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Compose a player from `@nomercy-entertainment/nomercy-player-core` | `package.json:2`; example `:19-28` | Supported |
| Install only that package on this page | Page `:16-20`; no second install; `hls.js` not peer | Supported |
| Core already brings streaming (no second package) | `package.json:228` (`hls.js` dependency) | Supported |
| Package-root exports used: `EventEmitter`, `resolvePlayerConstructor`, `initPlayerCoreState`, `composeMixins`, `playerCoreMethods` | `index.ts:41,186-210,226`; example `:19-28,49,54,61` | Supported |
| Extend `EventEmitter` for `.on()` / `.emit()` | `event-bus/default.ts:61,108,222` | Supported |
| Resolve with `resolvePlayerConstructor`, seed with `initPlayerCoreState` using the same class name | `constructor.ts:55-59`; `state.ts:439`; example `:49,54` (`'CorePlayer'`) | Supported |
| Stamp `playerCoreMethods` with `composeMixins` | `compose.ts:38`; `core/index.ts:103-129`; example `:61` | Supported |
| `composeMixins` copies own property descriptors, including getters/setters | `compose.ts:26-28,40-43` | Supported |
| Later modules override earlier ones on key collision | `compose.ts:22-24` | Supported |
| `playerCoreMethods` is what `NMVideoPlayer` and `NMMusicPlayer` spread into `composeMixins` | `core/index.ts:97-98,103-129`; music `index.ts:773`; video `index.ts:1276` | Supported |
| Composed surface includes queue, transport, time, volume, plugins, and auth | `core/index.ts:109-117` (`queueMethods`, `transportMethods`, `timeMethods`, `volumeMethods`, `pluginRegistrationMethods`, `authMethods`) | Supported |
| `resolvePlayerConstructor` takes string id, numeric index, or `undefined` | `constructor.ts:33-36,55-56` | Supported |
| Unregistered string: `document.getElementById(id)`, requires `<div>` | `constructor.ts:46-50,97-109` | Supported |
| Missing element: `core:player/element-missing` | `constructor.ts:98-99` | Supported |
| Non-div: `core:player/element-not-div` | `constructor.ts:101-102` | Supported |
| Sample creates labeled `<div>` and passes its id to `corePlayer` | Example `:68-73` (`aria-label`, `corePlayer('player')`) | Supported |
| No media backend; transport has nothing to drive | Example `:15-16,32-58` (no `backend`); page `:50-51` | Supported |
| `setup()`, `ready()`, and `dispose()` run without a backend | `lifecycle.ts:115-143,161,207`; example `:74-77` | Supported |
| `dispose(): Promise<void>` | `lifecycle.ts:207`; example `:44,77` | Supported |
| Next link queue path | Path as written: `/nomercy-player-core/tour/queue` | Supported (path as written) |
