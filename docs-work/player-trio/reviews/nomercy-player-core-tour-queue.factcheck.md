# Fact check: /nomercy-player-core/tour/queue
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/queue.mdx
Reviewed-SHA: 7b4069ed042d2b1d

Source: `packages/player-web/nomercy-player-core/src/core/mixins/queue.ts`, `play-queue.ts`; `playerCoreMethods` includes both (`core/index.ts:114-115`). Example: `src/examples/core-tour-queue.ts` with `baseUrl: FILMS_BASE` and relative `films` urls from `src/examples/media.ts`. Method: read page, example, and mixin source; no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example.

## Gate checks

| Gate | Result |
| --- | --- |
| Selection event is `item`, not `current` | Pass (`current` only as `beforeMutation` method name) |
| Time and duration are `0` before `item` emits when id differs from mounted | Pass (`queue.ts:97-107`: zero slots, then `emit('item')`) |
| List change emits player `queue` (wired from MediaList `change`) | Pass (`queue.ts:85`) |
| Named events match `_wireQueue` (no wrong names) | Pass |
| Claims supported by `queue.ts` / `play-queue.ts` | Pass |
| Mixin / ingest / emitter framing matches source | Pass |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Example uses `baseUrl` + relative paths from `media.ts` | Pass (`baseUrl: FILMS_BASE`; `films` urls like `/Sintel...`) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Queue edits do not start playback by themselves; start is a separate call that must wait for load | `queue.ts:157-243` (mutators); `play-queue.ts:17-24`; `item` load+play in `queue.ts:325-350` | Supported |
| `queue()` returns read-only list; `queue(items)` replaces; first call wires list events onto the player emitter (`on` surface) | `queue.ts:80-115,157-161` | Supported |
| Append / prepend / insert / remove / removeAt / move / clear / shuffle / sort | `queue.ts:168-243` | Supported |
| `queueRemove` by id; `queueLength`; `queueIndexOf` or `-1`; `peekNext` / `peekPrevious` | `queue.ts:196-198,250-274` | Supported |
| Ingest runs on queue / append / prepend / insert | `queue.ts:118-140,157-190` | Supported |
| Optional `normalizePlaylistItem`, then optional `transformPlaylistItem`, then string `title` tokens | `queue.ts:124-134` | Supported |
| `registerTitleTokens` merges; empty registry until register | `queue.ts:441-456` | Supported |
| `item()` returns active or `undefined`; `index()` zero-based or `-1` | `queue.ts:287-290,368-369` | Supported |
| `item(target, opts?)` accepts item, id, index, or predicate; listener can cancel | `queue.ts:287,292-293` | Supported |
| When cursor moves, emits `item` with item and index | `queue.ts:94-107,285` | Supported |
| Cursor / `item` emit before media switch; time/duration already `0` when new id differs from mounted; listener does not see previous end position | `queue.ts:97-107` | Supported |
| Empty queue in `setup` parks `_pendingSelection`; applied once playlist exists; idle / disposing / disposed stop after move/park | `queue.ts:66-73,312-319` | Supported |
| Otherwise loads active item; plays when `autoplay` is not `false`; `autoplay: false` keeps paused | `queue.ts:325-350` | Supported |
| `item` starts fire-and-forget `load` (no returned promise); bare `item` + `play` races | `queue.ts:333-352`; `play-queue.ts:17-24` | Supported |
| `{ autoplay: true }` or omit `autoplay` is the race-free path; `playItem` forces `autoplay: true` | `queue.ts:339-350`; `play-queue.ts:47-55` | Supported |
| `playNow` replaces queue then plays `start` or first; empty `items` no-op; no prior unload | `play-queue.ts:69-90` | Supported |
| `source` / `startAt` thread through like `item` | `play-queue.ts:52-55,87-90`; `queue.ts:333-349` | Supported |
| `seekToIndex` is 1-based; same cancel path as `item`; cursor only (no load/play) | `queue.ts:381-396` | Supported |
| Past end ignored; non-positive-integer throws `RangeError` | `queue.ts:382-390` | Supported |
| Event catalogue: `queue`, `queue:append`, `queue:prepend`, `queue:insert`, `queue:remove`, `queue:move`, `queue:clear`, `queue:shuffle`, `queue:sort`, `item` | `queue.ts:85-107` | Supported |
| Backlog read/write/mutators; events `backlog`, `backlog:append`, `backlog:remove`, `backlog:clear`; no cursor drive; no ingest | `queue.ts:111-114,407-437` | Supported |
| Next: compose-methods is how methods get onto the class | `core/compose.ts`; `core/index.ts:97-115` | Supported |
| Example: `baseUrl: FILMS_BASE`, `queue(films)`, relative urls; listens on `item`; safe `item(..., { autoplay: true })` / `playItem` / `playNow` | `core-tour-queue.ts:82-111`; `media.ts` | Supported |
