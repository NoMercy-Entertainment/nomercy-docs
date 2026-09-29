# Fact check: /nomercy-player-core/plugins-adapters/adapter-media-list
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-media-list.mdx
Reviewed-SHA: 326d9e20b6c5dde2
Previous verdict: FAIL; fixes verified: finding 1 (`set` fires only `change`, page line 28), finding 2 (removing the last item makes the new last item current, page line 43), finding 3 (`shuffle`/`sort` row now "Reorder the items and keep the cursor on its item", line 69; `get` row now says it is the list's own array and to call `get` again after `set`, `clear` or `shuffle`, line 58)

Source: nomercy-player-core `src` at `e3d2de5`. Example `src/examples/core-adapter-media-list.ts` (unchanged since the previous review).

Method: re-read the whole page and all of `src/adapters/media-list/default.ts`. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo): `tsc` exit 0. Snippet ranges `16-18`, `20-53`, `55-59` match the lock and the example (3 of 3 OK). Example values traced by hand through `default.ts` (not executed): after `prepend`, items are trailer, intro, chapter-1, chapter-2 with cursor 2; `removeAt(2)` removes the current item and the cursor stays 2, so `chapter-2` (`default.ts:283-286`), matching example comments `:43,48,50,53`.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L15 queue and backlog are two `MediaList` | `src/core/state.ts:462-463` | Supported |
| L16 no `mediaList` option | grep `mediaList` in `src/types/config.ts`: no hit | Supported |
| L18 imports | `package.json:76`; `adapters/media-list/index.ts` | Supported |
| L23 event emitter | `default.ts:44` | Supported |
| L24 cursor `-1` empty, `0` once items arrive | `default.ts:46,80,192-193,216,237-238` | Supported |
| L25 position shifts move the cursor with its item | `default.ts:214-215,235-236,280-281,318-326` | Supported |
| L27 change events then `change` with `items` | `default.ts:195-199,218-219,240-244,288-293,328-332,347-348,379-380,401-402,415-417` | Supported |
| L28 `set` fires only `change` | `default.ts:67-84` (sole emit `:83`) | Supported (fix verified) |
| L29 `setCurrent` fires `item` with `item`, `index` | `default.ts:147-150` | Supported |
| Event table (7 rows) | `default.ts:16-27` | Supported |
| L41-42 removing current fires `remove`, cursor keeps index | `default.ts:269-294` (no `item` emit) | Supported |
| L43 removed last item: new last item becomes current | `default.ts:283-285` | Supported (fix verified) |
| L54 table lists every member | `IMediaList.ts:33-53`, 19 members, all in the table | Supported |
| L58 `get` returns the own array; replaced by `set`, `clear`, `shuffle` | `default.ts:55-57,70,344,371` | Supported (fix verified) |
| L59 `set` cursor follows old current by `id` or resets to first | `default.ts:67-81` | Supported |
| L60-68 length, current, replaceItem (no event), setCurrent, peek, add (insert clamps), remove, move, clear | `default.ts:87-349` (`:108-112` no emit, `:232` clamp) | Supported |
| L69 `shuffle`, `sort` reorder and keep the cursor on its item | `default.ts:365-403` | Supported (fix verified) |
| L70 `dispose` empties and removes every listener | `default.ts:408-413` | Supported |
| L72-73 integer is an index, other number an `id` | `default.ts:132-137` | Supported |
| L75 `setShuffleStrategy` is not on the interface | `default.ts:356`; absent in `IMediaList.ts:33-53` | Supported |
| L79 helper typed against `IMediaList` | type check exit 0 | Supported |
| See also: Platform | `adapter-platform.mdx` exists | Supported |
