# Fact check: /nomercy-player-core/tour/queue
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/queue.mdx
Reviewed-SHA: 47b95350b418818e

Source: `packages/player-web/nomercy-player-core/src/core/mixins/queue.ts`, `play-queue.ts`; `playerCoreMethods` includes both (`core/index.ts:114-115`). Example: `src/examples/core-tour-queue.ts` with `FILMS_BASE` / `films` from `src/examples/media.ts`. Method: read page, example, and mixin source; no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Word `kit`: none on the page or in the example.

## Gate checks

| Gate | Result |
| --- | --- |
| Selection event is `item`, not `current` | Pass (`current` only as `beforeMutation` method name) |
| List change emits player `queue` (wired from MediaList `change`) | Pass (`queue.ts:85`; page sentence form) |
| Named events match `_wireQueue` (no wrong names) | Pass |
| Claims supported by `queue.ts` / `play-queue.ts` | Pass |
| Mixin / ingest / emitter framing matches source | Pass |
| No `kit` on page or example | Pass |
| No em dash / en dash on page or example | Pass |
| Example uses `baseUrl` + relative paths from `media.ts` | Pass (`baseUrl: FILMS_BASE`; `films` urls like `/Sintel...`) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| After Quick Start, `composeMixins` has stamped method bundles; a mixin is one of those bundles | `core/compose.ts:38`; `core/index.ts:97-115`; Quick Start tour | Supported |
| `queueMethods` reads/edits the list; `playQueueMethods` moves cursor and starts playback | `queue.ts:146+`; `play-queue.ts:27-91` (cursor APIs also live on `queueMethods`; helpers force autoplay via `item`) | Supported |
| Methods available via `playerCoreMethods` (`queueMethods` + `playQueueMethods`) | `core/index.ts:114-115` | Supported |
| `queue()` returns read-only list; `queue(items)` replaces; first call wires list events onto the player emitter (`on` surface) | `queue.ts:80-115,157-161` | Supported |
| Append / prepend / insert / remove / removeAt / move / clear / shuffle / sort | `queue.ts:168-243` | Supported |
| `queueRemove` by id; `queueLength`; `queueIndexOf` or `-1`; `peekNext` / `peekPrevious` | `queue.ts:196-198,250-274` | Supported |
| Ingest turns an entry into a stored item; runs on queue / append / prepend / insert | `queue.ts:118-140,157-190` | Supported |
| Optional `normalizePlaylistItem`, then optional `transformPlaylistItem`, then string `title` tokens | `queue.ts:124-134` | Supported |
| `registerTitleTokens` merges; empty registry until register | `queue.ts:441-456` | Supported |
| `item()` returns active or `undefined`; `index()` zero-based or `-1` | `queue.ts:287-290,368-369` | Supported |
| `item(target, opts?)` accepts item, id, index, or predicate | `queue.ts:287` | Supported |
| Write fires `beforeMutation` with method `current`; cursor emit is `item` | `queue.ts:292-293,94-107` | Supported |
| Cursor / `item` emit before media switch; time/duration zeroed when id differs from mounted | `queue.ts:97-107` | Supported |
| Empty queue in `setup` parks `_pendingSelection`; ready pipeline applies it; idle / disposing / disposed stop after move/park | `queue.ts:66-73,312-319` | Supported |
| Otherwise loads active item; plays when `autoplay !== false` | `queue.ts:325-350` | Supported |
| `item` starts fire-and-forget `load` (no returned promise); bare `item` + `play` races | `queue.ts:333-352`; `play-queue.ts:17-24` | Supported |
| `{ autoplay: true }` or omit `autoplay` is the race-free path; `playItem` forces `autoplay: true` | `queue.ts:339-350`; `play-queue.ts:47-55` | Supported |
| `playNow` replaces queue then plays `start` or first; empty `items` no-op; no prior stop/unload | `play-queue.ts:75-90` | Supported |
| `source` / `startAt` thread through like `item` | `play-queue.ts:52-55,87-90`; `queue.ts:333-349` | Supported |
| `seekToIndex` is 1-based; same `beforeMutation` `current`; cursor only (no load/play) | `queue.ts:381-396` | Supported |
| Past end ignored; non-positive-integer throws `RangeError` | `queue.ts:382-390` | Supported |
| Sentence event catalogue: list change emits `queue`; append/prepend/insert/remove/move/clear/shuffle/sort and cursor `item` match `_wireQueue` | `queue.ts:85-107`; page "What the list announces" | Supported |
| Backlog events `backlog`, `backlog:append`, `backlog:remove`, `backlog:clear` | `queue.ts:111-114` | Supported |
| Backlog read/write/mutators; no cursor drive; no ingest | `queue.ts:407-437` | Supported |
| Example: `baseUrl: FILMS_BASE`, `queue(films)`, relative `url`s from `media.ts` | `core-tour-queue.ts:33,96-106`; `media.ts` films/`FILMS_BASE` | Supported |
| Example listens on `item` (not `current`); safe `item(..., { autoplay: true })` / `playItem` / `playNow` | `core-tour-queue.ts:102-125` | Supported |
