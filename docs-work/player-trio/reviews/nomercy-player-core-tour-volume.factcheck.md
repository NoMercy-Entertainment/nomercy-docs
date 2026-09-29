# Fact check: /nomercy-player-core/tour/volume
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/volume.mdx
Reviewed-SHA: 0c8f8126ec7c5922

Previous verdict: none (first fact check of this page).

Source: nomercy-player-core `src` at `e3d2de5` (working tree clean): `src/core/mixins/volume.ts`, `src/core/volume-curve.ts`, `src/index.ts:265`, `src/adapters/media-element/MediaElementBackend.ts:248-260`. Callers in the sibling packages: `nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:220,538`, `web-audio.ts:330,754`. Example `src/examples/core-tour-volume.ts`.

Method: read the whole page, the whole example, and the two source files in full. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo: `tsc exit 0`. Read every `lines=` range against its section. Computed the table with Node v22.14.0: `node -e "console.log(0.5**2, 0.3**2, 0.1**2, 1**2, 0**2)"` printed `0.25 0.09 0.010000000000000002 1 0`. Behaviour of the mute and volume paths traced in the source; the example was not run in a browser (not checked at runtime).

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 volume is a position from 0 to 100 | `volume.ts:18-19,86-89,114` | Supported |
| L13 mute keeps the position; a curve turns it into the gain a backend writes | `volume.ts:52-57` (mute stores `_volumeBeforeMute`, leaves `_internalVolume`); `volume-curve.ts:52-56`; `MediaElementBackend.ts:260` | Supported |
| L17 `volume()` returns the current position, 0 to 100 | `volume.ts:87-88` | Supported |
| L18 while muted the read is `0`, even with a stored level | `volume.ts:88` | Supported |
| L20-21 pass a number to set; clamps to 0 through 100 | `volume.ts:100,114` | Supported |
| L22 the setter returns a `Promise` for the full cycle | `volume.ts:91-101` | Supported |
| L24 snippet lines 86-88 | example `:86-88` | Supported |
| L29 `volumeUp` / `volumeDown` step 5 by default | `volume.ts:172,180` (`step = 5`) | Supported |
| L30 pass your own step | `volume.ts:172,180`; example `:91` | Supported |
| L31 neither returns a promise | `volume.ts:172-182` (`: void`, `void this.volume(...)`) | Supported |
| L33 snippet lines 90-91 | example `:90-91` | Supported |
| L38-39 `beforeVolume` can cancel; then `volumePrevented` fires and the level stays | `volume.ts:92-98` | Supported |
| L40 otherwise emits `volume` with `level` (payload key; `key` tag correct) and hands the backend the position divided by 100 | `volume.ts:100,131,133` | Supported |
| L42 snippet lines 78-80 | example `:78-80` | Supported |
| L47 `perceptualGain` maps a 0 to 1 position to a 0 to 1 gain | `volume-curve.ts:58-66` | Supported |
| L48 the gain is the position squared | `volume-curve.ts:66` | Supported |
| L49 values outside the range clamp first | `volume-curve.ts:64` | Supported |
| L51 snippet lines 16,20,25,93-95 (import of `perceptualGain`, three calls) | example `:16,20,25,93-95`; root export `index.ts:265` | Supported |
| L56-62 table: 1 → 1, 0.5 → 0.25, 0.3 → 0.09, 0.1 → 0.01, 0 → 0 | `volume-curve.ts:33-38`; Node output above (`0.1**2` prints `0.010000000000000002`, which is 0.01 as a value) | Supported |
| L64-66 loudness is heard on a log scale; a straight map packs most change into the bottom; the square law spreads it | `volume-curve.ts:14-16,21-23,27-30` | Supported (see note) |
| L68-70 the public `volume` API speaks in positions; the curve runs where a backend writes gain, not in the getter | `volume.ts:88,133`; `volume-curve.ts:52-56`; callers `MediaElementBackend.ts:260`, `html5-audio.ts:220,538`, `web-audio.ts:330,754` | Supported |
| L74 `mute` silences output and keeps the stored position | `volume.ts:52-56` (`_volumeBeforeMute = _internalVolume`, backend `mute`) | Supported |
| L75 `unmute` restores the stored level and writes it to the backend | `volume.ts:59-63` | Supported |
| L76-77 `toggleMute` picks from the current state; no promise | `volume.ts:162-166` | Supported |
| L79 snippet lines 97-102 | example `:97-102` | Supported |
| L82-83 `beforeMute` can cancel; then `mutePrevented` fires and nothing changes | `volume.ts:43-50` | Supported |
| L84 otherwise `mute` fires with `muted` (payload key; `key` tag correct) set to the new flag | `volume.ts:55,61` | Supported |
| L86 snippet lines 82-84 | example `:82-84` | Supported |
| L89-91 mute when muted, unmute when unmuted: no dispatch, no event | `volume.ts:37-41` | Supported |
| L93 a level above 0 while muted unmutes the player | `volume.ts:121-126` | Supported |
| L98 Next: Transport covers play, pause, relative seeks | `tour/transport.mdx:3` (play, pause, seek), `:92` (`rewind` and `forward` move relative to the current position) | Supported |

## Notes

- `key` tag audit: `key level` (L40) and `key muted` (L84) are event payload keys (`volume.ts:131,55,61`). No positional parameter is tagged `key`.
- Comment drift, not a page defect: `volume-curve.ts:14-16` says a linear map crams the audible range into the bottom ~30 % (the page follows this), but `volume-curve.ts:17-19` then says the listener "hears nothing until ~30" and the change happens "at the top". The two sentences contradict each other. For the package owner; not filed by this review.
- The `beforeVolume` payload carries the requested level before the clamp (`volume.ts:92`, clamp at `:114`). The page does not claim otherwise.
