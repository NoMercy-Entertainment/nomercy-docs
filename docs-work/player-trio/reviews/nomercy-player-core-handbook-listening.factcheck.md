# Fact check: /nomercy-player-core/handbook/listening
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/listening.mdx
Reviewed-SHA: 51ffba5e9ff2c15c

Delta review of the fix for finding 1 of the previous verdict (FAIL, Reviewed-SHA `bb8e8f4561c245cc`): the Next line called the linked page "Network Helpers" and said it covers fetch and websocket calls bound to dispose.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5` (read only): `src/core/plugin/base.ts`, `src/core/plugin/fetch.ts`. Link target: `src/content/nomercy-player-core/en/handbook/network.mdx`. Method: `git -C C:/Projects/worktrees/docs-batch-05 diff HEAD -- src/content/nomercy-player-core/en/handbook/listening.mdx` (one changed line, page line 84); checked against the source and the linked page; the Next section re-read.

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 84 | The link text "Network" matches the target | `handbook/network.mdx:2` (`title: 'Network'`) | Supported |
| 84 | `authFetch` is the pipeline behind a plugin's `fetch` | `base.ts:713-718` (`Plugin.fetch` calls `pluginFetch`); `fetch.ts:55-60,77` (`pluginFetch` "Backs `Plugin.fetch()`" and returns `authFetch<T>(fetchOpts)`) | Supported |
| 84 | The Network page covers how it classifies, decodes, and retries a request | `handbook/network.mdx:3` (description: "how one authenticated fetch attempt is classified, how the body is decoded, and how the retry loop spends its budget"), `:20-24` (attempt), the decoding and retry sections | Supported (finding 1 fixed) |

## Section re-read

- The line no longer mentions websocket or dispose; nothing on it claims coverage the Network page lacks.
- No `key` tag on the changed line.

## Findings

None.

## Carried from the previous review

> Verdict: FAIL
> Reviewed: src/content/nomercy-player-core/en/handbook/listening.mdx
> Reviewed-SHA: bb8e8f4561c245cc

Previous verdict: PASS (Reviewed-SHA 6ae38fde2576c285), no findings raised, so nothing to verify as fixed. The page changed since (16 insertions, 23 deletions), so every claim was checked fresh.

Source: nomercy-player-core `src` at `e3d2de5` (working tree clean): `src/core/plugin/base.ts`, `src/adapters/lifecycle-registry/default.ts`, `src/adapters/event-bus/default.ts`, `src/core/mixins/plugin-registration.ts`, `src/core/plugin/fetch.ts`. Example `src/examples/core-handbook-listening.ts`.

Method: read the whole page, the whole example, and each source line cited. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo (paths to `nomercy-player-core/src/index.ts`): `tsc exit 0`. Read each `lines=` range of the example against the section it sits in. Checked the two link targets and what they cover by grep.

### Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 84 | `handbook/network.mdx:2` (`title: 'Network'`); `handbook/network.mdx` has no `websocket`, no plugin `fetch`, no `dispose` (grep: no hits); plugin `fetch` and `websocket` live at `base.ts:713-719,772-785` | The Next line calls the linked page "Network Helpers" and says it covers "the fetch and websocket calls bound to the same dispose path". The page it links is titled "Network" and documents `authFetch` (attempt classification, decoding, retry). It never mentions `websocket`, the plugin `fetch` helper, or dispose. A reader who follows the link for websocket help finds none. | Replace line 84 with: "[Network](/nomercy-player-core/handbook/network) is how `fn authFetch`, the pipeline behind a plugin's `fn fetch`, classifies, decodes, and retries a request." (`fetch.ts:55-77`: `pluginFetch` backs `Plugin.fetch()` and calls `authFetch` with a lifecycle `abortable()` signal.) |

### Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 plugin helpers clean up on dispose | `base.ts:433-436,450-453,988-989`; `plugin-registration.ts:303-330` (`instance.dispose()` then `lifecycle.dispose()`) | Supported |
| L13 Event Bus page covers raw `on`, `once`, `off`, `emit` | `tour/event-bus.mdx:13,18-20,37-41` | Supported |
| L18 `listen` is the drop-in for `addEventListener` on an `EventTarget` | `base.ts:988-989`; `default.ts:65-74` (calls `target.addEventListener(event, handler, options)`) | Supported |
| L19 records target, event name, handler, options | `default.ts:69-74` | Supported |
| L20 dispose removes each listener with the same options | `default.ts:220-236` (`removeEventListener(event, handler, options)` at `:232`) | Supported |
| L21 after dispose, further `listen` calls do nothing | `default.ts:66-67` (`if (this.disposed) return`) | Supported |
| L23 snippet lines 63-66 (`listen` on `document`) | example `:63-66` | Supported |
| L26-27 raw `addEventListener` not in the registry; dispose will not remove it | only `listen` pushes to `this.listeners` (`default.ts:69`); `dispose` walks only that list (`:226-236`) | Supported |
| L31-34 `on`/`once` two forms; string on the player (`item`, `play`); class form resolves to `plugin:<id>:<event>` | `base.ts:70-84` (`resolveListenerArgs`), `:427-455`; example compiles with `'item'` and `'play'` | Supported |
| L38 table: `on`/`once` player string or plugin class | `base.ts:427-455` | Supported |
| L39 table: `off` same forms, early detach | `base.ts:460-469` | Supported |
| L40 table: `hasListeners` same forms, pure read | `base.ts:474-484`; `event-bus/default.ts:266-269` (reads the set, no write) | Supported |
| L42 both call the player bus, then record cleanup that runs `off` on dispose | `base.ts:435-436,452-453` | Supported |
| L43 no manual unsubscribe unless stopping early | follows from L42 | Supported |
| L44 an unfired `once` is still cleared by dispose | `base.ts:453`; `event-bus/default.ts:138-146` (once wrapper keyed by the original `fn`), `:195-199` (`off` removes the wrapper by the original `fn`) | Supported |
| L46 snippet lines 51-61 (class-form `on`, string `on('item')`, `once('play')`) | example `:51-61` | Supported |
| L49-50 `this.player.on` skips cleanup registration | only the Plugin helpers call `lifecycle.addCleanup` (`base.ts:436,453`); the bus `on` records nothing (`event-bus/default.ts:108-127`) | Supported |
| L54-55 `off` same two forms; same function reference | `base.ts:466-469`; `event-bus/default.ts:162-199` (removal by reference) | Supported |
| L57 dispose already removes what these helpers registered | `base.ts:436,453`; `default.ts:277-287` (cleanups run on dispose) | Supported |
| L59 snippet lines 46-50,68-70 (`onTime` field, `on('time')`, `off` on `ended`) | example `:46-50,68-70` | Supported |
| L64 `hasListeners` reports whether any named listener is present | `base.ts:479-484`; `event-bus/default.ts:266-269` (`set.size > 0`) | Supported |
| L68 snippet lines 32-34 (`hasListeners` gate before `emit`) | example `:32-34` | Supported |
| L73 `priority` defaults to `0` (a static class member; `key` tag names a property, not a positional parameter) | `base.ts:219` | Supported |
| L74-75 `enabledPlugins` returns enabled plugins sorted by priority descending; ties keep registration order | `plugin-registration.ts:752-766` | Supported |
| L76-77 list order does not reorder handlers; handlers run in subscription order | `base.ts:214-217`; `event-bus/default.ts:69` (`Set`), `:228-229` (emit iterates a snapshot in insertion order) | Supported |
| L79 snippet lines 39-40,44,71,133 (`static priority = 5`, `enabledPlugins()` comment) | example `:39-40,44,71,133` | Supported |
| L84 Next: "Network Helpers", fetch and websocket calls bound to dispose | link target exists, but see finding 1 | FAIL (finding 1) |

### Notes

- `key` tag audit: the page has one `key` tag, `key priority` (L73), a static class property (`base.ts:219`). No positional parameter is tagged `key`.
- Example: `tsc exit 0`; no URL in the example besides the imported `FILMS_BASE` from `./media` (not fetched: it is the shared example media base, not a claim of this page).
