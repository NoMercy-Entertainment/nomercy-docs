# Fact check: /nomercy-player-core/tour/time
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/time.mdx
Reviewed-SHA: 56c32d2cd7d7dee4

Delta review since 2e9c15c; the full review before it passed.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5`. Method: `git diff 2e9c15c -- src/content/nomercy-player-core/en/tour/time.mdx`; every added or changed line checked; the section around each hunk re-read. The pseudo-tags used (`fn`, `var`, `str`, `el`, `attr`, `key`, `cls`, inline `ts`) are all defined in `src/lib/mdx/rehype.ts:102-126` and `:184`.

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 34 | `str item` names the event (tag only) | unchanged claim, carried | Supported |
| 118 | Next: Volume page exists | `src/content/nomercy-player-core/en/tour/volume.mdx` (present) | Supported |
| 118 | Volume is the 0 to 100 level, mute, and the curve that becomes gain | `src/core/mixins/volume.ts:114` clamps to 0..100; `src/core/volume-curve.ts:63-67` `perceptualGain` = position squared; volume page lines 12-13, 45-48 | Supported |

## Findings

None.

## Carried from the full review at 2e9c15c


Source: `packages/player-web/nomercy-player-core/src/core/mixins/time.ts`; cursor zeroing: `core/mixins/queue.ts`; `mediaReady`: `core/mixins/loading.ts`; `TimeState`: `types/playback.ts`. Example: `src/examples/core-tour-time.ts`. Method: read page, example, and those sources; SHA256 of page bytes, first 16 hex; no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. British spelling: none (`canceled`, not `cancelled`). Snippet: `live="false"`. `key time` is stated outside the table as another name for `key position` (`TimeState.time` aliases `position`). Table lists five fields: `position`, `duration`, `buffered`, `remaining`, `percentage`.

### Gate checks

| Gate | Result |
| --- | --- |
| False claim vs `time.ts` / `queue.ts` / `loading.ts` | Pass |
| Seconds for position/duration; `percentage` 0–100 | Pass |
| Zero time/duration before `item` when cursor id changes | Pass (`queue.ts:102-107`) |
| Wait for `mediaReady` before reading new position | Pass (`loading.ts:253`) |
| `key time` = another name for `key position`, outside table | Pass (`types/playback.ts:24-27`; page line after table) |
| American spelling (`canceled`) | Pass |
| Em dash / en dash on page or example | Pass (none) |
| Old library nickname (the old nickname) on page or example | none |
| Snippet `live` is `false` | Pass (`live="false"`) |
| Sentence over 30 words | Pass (max prose sentence 18) |
| Paragraph over 60 words | Pass (max prose paragraph 35) |
| Table over 6 data rows | Pass (5 data rows) |

### Claim table (prove against source)

| Claim | Supported by | Status |
| --- | --- | --- |
| Position and duration are seconds; `percentage` is 0–100 | `types/playback.ts:20-35`; `time.ts:151` | Supported |
| `time()` with no arg returns last-known internal position | `time.ts:67-69` (`_internalCurrentTime`) | Supported |
| `duration()` is length in seconds; `0` until metadata | `time.ts:99-101` | Supported |
| When new id ≠ mounted, time and duration become `0` before `item` | `queue.ts:102-107` | Supported |
| `item` listener does not see outgoing end position | `queue.ts:97-107` | Supported |
| Wait for `mediaReady` after new media mounts | `loading.ts:81,253` | Supported |
| `timeData()` snapshot: position, duration, buffered, remaining, percentage; `time` aliases `position` | `time.ts:142-165`; `types/playback.ts:23-35` | Supported |
| `time` event carries the same `TimeState` shape | `time.ts:137-161`; `events.ts:169-174` | Supported |
| Seek: negative → 0; returns Promise; cancel via `beforeSeek` → `seekPrevented`; else `seek` then `seeked` | `time.ts:67-96` | Supported |
| `seekByPercentage` takes 0–100; clamps; no-op when duration 0 or non-finite | `time.ts:175-179` | Supported |
| `buffered()` absolute timeline seconds; `0` with no backend | `time.ts:104-114` | Supported |
| `bufferedRanges` / `seekable` return backend `TimeRanges` or empty set; never null | `time.ts:117-133` | Supported |
| `itemEndingSoon` once per item; default threshold 10; payload `remaining` + `item` | `time.ts:242-264`; threshold `options?.itemEndingSoonThreshold ?? 10` | Supported |
| `playbackRate` clamps to 0.25–2; `playbackRates` fixed `[0.5, 0.75, 1, 1.25, 1.5, 2]` | `time.ts:198-227` | Supported |

### Example alignment

- `core-tour-time.ts` uses `timeData()` → `snapshot.position`, `snapshot.percentage`.
- `setup({ itemEndingSoonThreshold: 30 })`, `mediaReady` → `time()`/`duration()`, `seekByPercentage(50)`, `await time(10)`, `playbackRates()` list match the page.
