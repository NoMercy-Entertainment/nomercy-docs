# Fact check: /nomercy-player-core/handbook/styling
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/styling.mdx
Reviewed-SHA: 9c0245792f023f2c

Source: `packages/player-web/nomercy-player-core/src/core/plugin/base.ts` (`appendStyles`, `appendInlineStyles`, `mount`, `addClasses` / `removeClasses`); `core/mixins/container-class-emit.ts`; `core/mixins/media-tracks.ts` (`subtitleStyle`); `core/mixins/lifecycle.ts` (`nomercyplayer` on setup). Example: `src/examples/core-handbook-styling.ts`. Method: read page, example, and those sources; SHA256 of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. British spelling scan: none. Snippet: `live="false"`. Focus re-check: after first `ready`, later `phase=loading` is a no-op on container classes; `appendInlineStyles` writes before return; `subtitleStyle` emits the merged object only (no overlay-paint claim); Next points at handbook Timing (volume), not timers.

## Gate checks

| Gate | Result |
| --- | --- |
| After first `ready`, later `phase=loading` leaves container classes alone | Pass (`container-class-emit.ts:187-194`) |
| `appendInlineStyles` CSS is in the document when the call returns | Pass (`base.ts:892-900`; sync `appendChild`) |
| `subtitleStyle` emits merged object; page does not claim overlays paint it | Pass (page `:81-83`; `media-tracks.ts:712-716`) |
| Next link is volume Timing page, not timers | Pass (`/nomercy-player-core/handbook/timing`; timing.mdx is volume) |
| Old library nickname (the old nickname) on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:90`) |
| British spelling | none |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass (max sentence 20; max paragraph 43) |
| Table data rows ≤ 6 non-separator lines | Pass (5: header + 4 class rows) |
| Example imports match package root exports | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Package ships no stylesheet | No `.css` under `nomercy-player-core` | Supported |
| `appendStyles` / `appendInlineStyles` write into `document.head`; take `styleId` | `base.ts:866-900` | Supported |
| `appendStyles` link URL; `moduleUrl` or `document.baseURI` | `base.ts:871-877` | Supported |
| `appendInlineStyles` style element; rules present when call returns | `base.ts:892-900` | Supported |
| Missing `document` → both return without writing | `base.ts:867-868,893-894` | Supported |
| Existing `styleId` → no-op; first call wins | `base.ts:869-870,895-896`; example `:48-49` | Supported |
| Neither helper removes its node on dispose; remount skips write | `base.ts` (no style cleanup); mount-only cleanup `:931-934`; example `:112-113` | Supported |
| After `setup`, container has `nomercyplayer` | `lifecycle.ts:122` | Supported |
| Emitted events keep play/load/activity/mute/display classes in sync | `container-class-emit.ts:44-120,233-241` | Supported |
| `buffering` from `waiting`/`stalled`; cleared by `canplay` or `time` | `container-class-emit.ts:70-92` | Supported |
| First `loading` phase can add class; after first `ready`, later `loading` leaves classes alone | `container-class-emit.ts:184-198` | Supported |
| `addClasses` / `removeClasses` on a held node; `mount` → `nmplayer-<id>-<name>` | `base.ts:835-844,915-936` | Supported |
| `subtitleStyle()` returns current; patch merges and emits `subtitleStyle` with merged object | `media-tracks.ts:703-716`; example `:108-109` | Supported |
| Example: inline CSS once per id; `nomercyplayer`; style survives dispose | `core-handbook-styling.ts:40-113` | Supported |
| Next: Timing (volume position, mute, gain curve) | Path `/nomercy-player-core/handbook/timing`; timing.mdx description | Supported |
