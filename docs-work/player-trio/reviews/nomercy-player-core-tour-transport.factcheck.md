# Fact check: /nomercy-player-core/tour/transport
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/transport.mdx
Reviewed-SHA: 61132511ba8f36d6

Source: `packages/player-web/nomercy-player-core/src/core/mixins/transport.ts`, `core/mixins/loading.ts`, `core/mixins/player-state.ts` (`_assertReady`, `_dispatchBefore`); MediaList `setCurrent` → `item` in `adapters/media-list/default.ts` wired via `core/mixins/queue.ts`; `RepeatState` in types/state. Example: `src/examples/core-tour-transport.ts`. Method: read page, example, and those sources; SHA256 of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`. Page does not name `repeatState`; `next` is described by repeat mode tokens `one` / `all` / `off`.

Shared-shape scope: only table calls claim a `before*` announce. Table has five data rows (play/pause/stop/load/seek); `next`/`previous` are outside the table and named in a separate sentence that they announce `beforeNext` / `beforePrevious` (`transport.ts:244`, `307`). `togglePlayback` is outside the table and “announces nothing of its own” (`transport.ts:224-228`). `loadQueue` is outside the table; it emits `playlistResolving` then `playlistReady` (and errors on failure), not a `before*` (`loading.ts:305-327`). Page success line names `playlistReady` only — true, not a false claim.

## Gate checks

| Gate | Result |
| --- | --- |
| `next()` honour repeat mode (`one` / `all` / `off`) per `transport.ts` | Pass (`transport.ts:242-295`; empty queue → `queue:exhausted` in each branch) |
| Page does not name `repeatState` | Pass |
| Claims supported by transport / loading / assertReady | Pass |
| Example: one-line package import before `./media` | Pass (`core-tour-transport.ts:17-18`) |
| Old library nickname (the old nickname) on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass (max sentence 23; max paragraph 41) |
| Table data rows ≤ 6 | Pass (5 data rows; next/previous not in table) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Transport forwards to backend; Core does not decode | `transport.ts` play/pause/stop/seek; `loading.ts` backend.load | Supported |
| Ready only after setup left `idle`; `core:player/not-ready` / `disposed` | `player-state.ts:155-161` | Supported |
| Shared shape: assert → `before*` → mutate / backend (table calls only) | `transport.ts` / `loading.ts` via `_dispatchBefore` | Supported |
| Event pairing table (play/pause/stop/load/seek only) | `transport.ts`, `loading.ts:99-253` | Supported |
| `next`/`previous` announce `beforeNext`/`beforePrevious` (outside table) | `transport.ts:244`, `307` | Supported |
| `togglePlayback` has no own announce; pause while playing else play | `transport.ts:224-228` | Supported |
| `play` sets playing, may `starting`, emits `play`, awaits backend; refuse → paused + `playPrevented` `backend-refused` + rethrow | `transport.ts:130-166` | Supported |
| `pause`/`stop` do not await backend; pause from playing/starting; stop always stopped | `transport.ts:175-216` | Supported |
| `silent: true` skips `before*` and plain event | `player-state.ts:175-180`; emit guards `!silent` | Supported |
| `load` needs `url` + backend; cancel → `loadPrevented`; playState loading; phase flash from ready/playing/paused/starting/ended; success → ready + paused unless owned + `mediaReady` | `loading.ts:38,87-253` | Supported |
| Queue edit does not autoplay; await load before play | queue vs load/play separation | Supported |
| `startAt` seconds; `fadeIn` volume ramp; newer load wins via epoch | `loading.ts:164-236` | Supported |
| `loadQueue` fetch → replace queue → `playlistReady` (no `before*`) | `loading.ts:305-327` | Supported |
| Rewind/forward default 5s; rewind clamp 0; forward no upper clamp | `transport.ts:335-350` | Supported |
| Restart seek 0 then play; prevented seek skips play | `transport.ts:359-363` | Supported |
| `beforeSeek` delta vs `0`; `seek`/`seeked` absolute; seeking phase only from playing/paused/starting | `transport.ts:36-62,108-120` | Supported |
| `next` follows repeat: `one` reload no cursor move; `all` wrap first; `off` → `queue:exhausted`; empty → exhausted every mode | `transport.ts:253-285`; `RepeatState` `'one'|'all'|'off'` | Supported |
| `previous` at start quiet, no emit | `transport.ts:316-318` | Supported |
| Cursor before media switch when neighbor; emits `item` via MediaList | `transport.ts:291-295,324-326`; `default.ts:147-150`; `queue.ts:94-107` | Supported |
| Await `next` = load done; play not awaited; refuse → `playPrevented`, `next` still resolves | `_loadAndPlay` `transport.ts:74-86` | Supported |
| Cancel via `preventDefault`; `*Prevented` + reason/cause | `_dispatchBefore` + transport prevent branches | Supported |
| `source` stamped when passed; omitted stays empty; `seek` has source, `seeked` does not | `transport.ts:55-61` | Supported |

## Example alignment

- Single import line from `@nomercy-entertainment/nomercy-player-core` immediately before `./media` (`core-tour-transport.ts:17-18`).
- Stub backend + compose seed; `load` then `play`; forward/rewind/pause/toggle/stop; listens `mediaReady` / `playPrevented`.
