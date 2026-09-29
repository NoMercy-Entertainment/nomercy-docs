# Fact check: /nomercy-player-core/plugins-adapters/adapter-quality
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-quality.mdx
Reviewed-SHA: 103485d35edb28f1

Source (nomercy-player-core `e3d2de5`): `src/adapters/quality/display-range.ts`, `hdr-policy.ts`, `size-policy.ts`; `src/core/mixins/device.ts`; `src/types/config.ts`; `src/index.ts`; `package.json` exports. Video (nomercy-video-player `afcf8bc`): `src/adapters/video-backend/html5.ts`, `src/index.ts`. Example: `src/examples/core-adapter-quality.ts`.

Method: read the page, the example and the sources above. Type check of the example against the package SOURCE (scratch tsconfig outside the repo, `paths` mapped to `packages/player-web/*/src`): exit 0, 0 errors. Ran the example body (example lines 24-65, type annotations removed, imports pointed at the three source files) with `node --experimental-strip-types` (v22.14.0) from the scratchpad. Output:

```
false
{
  kind: 'cap-to',
  level: {
    index: 1,
    label: '1080p',
    height: 1080,
    width: 1920,
    bitrate: 5000000,
    dynamicRange: 'sdr'
  }
}
480p
480p
```

Every output matches the example's comments (`:56`, `:59`, `:62`, `:65`). No URLs.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12-13 pick the highest visible rung; two limits, dynamic range and size | `hdr-policy.ts:73-96,113-140`; `size-policy.ts:38-83,123-136` | Supported |
| L14 plain functions, not an interface | the three files export functions and types only | Supported |
| L15 import from the package root | `src/index.ts:122-126`; `package.json` has no `./adapters/quality` key, so the root is the only path | Supported |
| L17 snippet imports `DisplayRangeProbe`, `QualityLevel`, four functions | `src/index.ts:122-126`; type check exit 0 | Supported |
| L22 video HTML5 backend calls these to cap ABR | video `html5.ts:13-25` imports; `:1397-1404,1423` calls | Supported |
| L23 passes `hdrOnSdr` from setup, `'play'` by default | `config.ts:205`; video `index.ts:666` (`this.options?.hdrOnSdr ?? 'play'`); `html5.ts:1268,1404` | Supported |
| L24 `device()` reports `hdrDisplay` from `detectDisplayHdr` | `device.ts:13,139` | Supported |
| L35 table lists every function | 8 exported functions across the three files: `display-range.ts:35,61`; `hdr-policy.ts:73,99,113`; `size-policy.ts:38,96,123` | Supported |
| L39 `detectDisplayHdr` true on video or page HDR, false with no probe | `display-range.ts:61-66` | Supported |
| L40 `browserDisplayRangeProbe` over `matchMedia`, or `null` | `display-range.ts:35-51` | Supported |
| L41 `hdrAbrCeiling` best SDR rung, `null` on HDR screen or no-HDR ladder | `hdr-policy.ts:73-96` | Supported |
| L42 `isHdrUnplayable` every rung HDR, screen not | `hdr-policy.ts:99-101` | Supported |
| L43 `hdrDecision` one decision, cheapest first | `hdr-policy.ts:103-140` | Supported |
| L44 `sizeAbrCeiling` smallest covering rung or `null` | `size-policy.ts:38-83` | Supported |
| L45 `panePixels` device pixels | `size-policy.ts:96-114` | Supported |
| L46 `abrCeiling` the lower of the two | `size-policy.ts:123-136` | Supported |
| L48-56 five kinds and their conditions | `hdr-policy.ts:35-56,119-139` | Supported |
| L53 `cap-to` carries `level` | `hdr-policy.ts:52,124-127` | Supported |
| L58 `sizeAbrCeiling` null on zero pane, empty ladder, covering rung already tallest | `size-policy.ts:46-49,78-80` | Supported |
| L59 rung without `width` not ruled out by width | `size-policy.ts:58` | Supported |
| L63-64 `DisplayRangeProbe` has one member `matches` | `display-range.ts:20-23` | Supported |
| Example outputs | run output above | Supported |

## Notes

- L41, L44 and L58 list the main `null` cases; the "no SDR rung" case (`hdr-policy.ts:79-81`) and "no rung covers the pane" case (`size-policy.ts:61-62`) follow from "the best SDR rung" / "the smallest rung that covers the pane" not existing. Nothing stated is false.
- L42: on an empty ladder `isHdrUnplayable` returns `false` (`hdr-policy.ts:100`, `levels.length > 0`). The page does not claim otherwise.
