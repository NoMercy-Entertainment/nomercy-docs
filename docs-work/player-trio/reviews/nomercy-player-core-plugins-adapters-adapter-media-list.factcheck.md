# Fact check: /nomercy-player-core/plugins-adapters/adapter-media-list
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-media-list.mdx
Reviewed-SHA: c0aabd617dfccd4c

Source (nomercy-player-core `e3d2de5`): `src/adapters/media-list/IMediaList.ts`, `default.ts`, `index.ts`; `src/core/state.ts`; `src/types/config.ts`; `src/adapters/event-bus/default.ts`; `src/adapters/shuffle-strategy/default.ts`; `package.json` exports. Example: `src/examples/core-adapter-media-list.ts`.

Method: read the page, the example and the sources above. Type check of the example against the package SOURCE (scratch tsconfig outside the repo, `paths` mapped to `packages/player-web/*/src`, compiler options of `tsconfig.examples.json`): exit 0, 0 errors. Example values traced by hand through `default.ts` (not executed). No URLs.

## Findings

1. **Page line 27: "Each change fires its own event, then `change`" is false for `set`.**
   `set` emits only `change`: `default.ts:67-84` (the only emit is `this.emitChange()` at `:83`). The example calls `set` first (example `:30-40`), so a reader expects a second event that never comes.
   Fix: after line 27 add "`fn set` fires only `str change`."

2. **Page lines 40-41: "The cursor keeps its index, so the next item becomes current" is false when the removed item was the last one.**
   `default.ts:283-286`: when `index === cursor` and the cursor is now past the end, it clamps to `items.length - 1`, so the previous item becomes current. `default.ts:277-278`: an emptied list sets the cursor to `-1`.
   Fix: replace line 41 with "The cursor keeps its index, so the next item becomes current. When the removed item was the last one, the new last item becomes current."

3. **Page line 67: "`fn shuffle`, `fn sort` | Reorder in place" is false for `shuffle`.**
   `default.ts:371` assigns a new array (`this.items = this.shuffleStrategy.order(this.items, this.cursor)`); the default strategy copies first (`shuffle-strategy/default.ts:21-31`, `const result = [...items]`). Only `sort` is in place (`default.ts:393`).
   The same fact limits page line 56 ("The array is live"): the array from `get` is replaced, not updated, by `set` (`default.ts:70`), `clear` (`:344`), `shuffle` (`:371`) and `dispose` (`:409`).
   Fix: line 67 "Reorder the items and keep the cursor on its item." Line 56: "The items in order. This is the list's own array: do not change it, and call `fn get` again after `fn set`, `fn clear` or `fn shuffle`."

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12-13 ordered list with a cursor that survives changes | `default.ts:36-42` | Supported |
| L15 player keeps queue and backlog in two `MediaList` | `core/state.ts:462-463` | Supported |
| L16 no `mediaList` option in `setup` | `types/config.ts` has no such key (grep `-i list`: only `playlist`, `transformPlaylistItem`) | Supported |
| L18 snippet imports | `package.json` exports `"./adapters/media-list"`; `media-list/index.ts:9-10`; root exports `BasePlaylistItem` (type check exit 0) | Supported |
| L23 `MediaList` is an event emitter | `default.ts:44` (`extends EventEmitter`) | Supported |
| L24 cursor `-1` empty, `0` once items arrive | `default.ts:46,80,192-193,216,237-238` | Supported |
| L25 position shifts move the cursor with its item | `default.ts:214-215,235-236,280-281,318-326` | Supported (exception stated at L40-41, see Finding 2) |
| L27 each change fires own event then `change` with `items` | see Finding 1; `default.ts:415-417` payload | **Unsupported for `set`** |
| L28 `setCurrent` fires `item` with `item`, `index` | `default.ts:147-150` | Supported |
| L30-38 event payload table | `default.ts:16-27` | Supported (all 7 rows) |
| L40 removing current fires `remove`, not `item` | `default.ts:269-294` (no `item` emit) | Supported |
| L41 next item becomes current | see Finding 2 | **Unsupported at the end of the list** |
| L52 table lists every member | `IMediaList.ts:33-53` (19 members; table covers 19) | Supported |
| L56 `get` returns a live array | `default.ts:55-57`; see Finding 3 | **Partly unsupported** |
| L57 `set` follows old current by `id`, or resets to first | `default.ts:67-81` | Supported |
| L58-59 `length`, `current`, `currentIndex` | `default.ts:87-101` | Supported |
| L60 `replaceItem` swaps by `id`, fires no event | `default.ts:108-112` | Supported |
| L61 `setCurrent` item, ID, index, predicate first match | `default.ts:126-140` | Supported |
| L62 `peekNext`, `peekPrevious` | `default.ts:160-176` | Supported |
| L63 add one or array; `insert` clamps | `default.ts:184-245` (`:232` clamp) | Supported |
| L64 remove by `id` or index | `default.ts:253-294` | Supported |
| L65 `move` | `default.ts:304-333` | Supported |
| L66 `clear` | `default.ts:339-349` | Supported |
| L67 `shuffle`, `sort` reorder in place, keep cursor | see Finding 3; cursor follow `default.ts:373-377,395-399` | **Unsupported for `shuffle`** |
| L68 `dispose` empties and removes every listener | `default.ts:408-413`; `event-bus/default.ts:162-177` | Supported |
| L70-71 integer is index, other number is `id`; integer id reached by item or predicate | `default.ts:129-140` | Supported |
| L73 `setShuffleStrategy` not on the interface | `default.ts:356-358`; absent in `IMediaList.ts` | Supported |
| Example `:43` `1`, `:48` `2`, `:50` `'chapter-2'`, `:53` `'chapter-2'` with no `item` event | traced: `default.ts:132-133,214-215,164,283-293` | Supported |
| L79 helper typed against `IMediaList` | type check exit 0 | Supported |
