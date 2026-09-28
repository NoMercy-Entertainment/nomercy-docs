# Fact check: /nomercy-player-core/handbook/timing
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/timing.mdx
Reviewed-SHA: e116ad7f1b714ace

Source: `packages/player-web/nomercy-player-core/src/core/mixins/volume.ts`, `core/volume-curve.ts`; backend gain write: `adapters/media-element/MediaElementBackend.ts` (video `Html5VideoBackend` extends it), music `html5-audio.ts` / `web-audio.ts`. Example: `src/examples/core-handbook-timing.ts`. Method: read page, example, and those sources; SHA256 of page bytes, first 16 hex; no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. British spelling: none. Snippet: `live="false"`. Lead states timing means when the level changes (position, mute, curve→gain); playback seconds point to Time. Table lists five position→gain rows.

## Gate checks

| Gate | Result |
| --- | --- |
| False claim vs `volume.ts` / `volume-curve.ts` / backends | Pass |
| `volume()` 0–100; muted getter `0`; setter `/100` to backend | Pass (`volume.ts:86-133`) |
| `perceptualGain` squares clamped 0..1; backends write gain | Pass (`volume-curve.ts:63-66`; MediaElement / music backends) |
| American spelling | Pass |
| Em dash / en dash on page or example | Pass (none) |
| Old library nickname (the old nickname) on page or example | none |
| Snippet `live` is `false` | Pass (`live="false"`) |
| Sentence over 30 words | Pass (max prose sentence 18) |
| Paragraph over 60 words | Pass (max prose paragraph 38) |
| Table over 6 data rows | Pass (5 data rows; 6 non-separator lines) |

## Claim table (prove against source)

| Claim | Supported by | Status |
| --- | --- | --- |
| Timing here = when the level changes (not playback seconds) | Page lead L12–13; Time link; `volume.ts` owns volume | Supported |
| `volume()` no arg returns 0–100 position; muted read is `0` | `volume.ts:87-88` | Supported |
| Setter clamps 0–100; returns awaitable `Promise` | `volume.ts:86-101`, `_applyVolume` clamp `113-114` | Supported |
| `volumeUp` / `volumeDown` default step 5; no returned promise | `volume.ts:172-181` (`void this.volume(...)`) | Supported |
| Cancel via `beforeVolume` → `volumePrevented`; else `volume` with `level`, backend gets position/100 | `volume.ts:92-99,131-133` | Supported |
| `perceptualGain` maps 0..1 → 0..1 by squaring; clamp first | `volume-curve.ts:63-66`; table matches `0.5→0.25`, `0.3→0.09`, `0.1→0.01` | Supported |
| Curve at backend gain write, not in public getter | `volume-curve.ts:52-56`; MediaElement `260`; music html5/web-audio | Supported |
| `mute` keeps stored position; `unmute` restores and writes backend again | `volume.ts:52-63` | Supported |
| `toggleMute` picks mute/unmute; no returned promise | `volume.ts:162-165` | Supported |
| Cancel via `beforeMute` → `mutePrevented`; else `mute` with `muted` | `volume.ts:43-55` | Supported |
| Already muted/unmuted is no-op (no dispatch, no event) | `volume.ts:37-41` | Supported |
| Set level above 0 while muted → unmute | `volume.ts:121-125` | Supported |

## Example alignment

- `core-handbook-timing.ts` uses `volume()` / `await volume(50)`, `volumeDown` / `volumeUp(10)`, `perceptualGain(0.5|0.3|0)`, mute/unmute/toggleMute, and `volume`/`mute` listeners with `level` / `muted`.
- Comments match the page: 0..100 positions, muted getter `0`, square-law gain at backend write.
