# Fact check: /nomercy-player-core/plugins-adapters/adapter-quality
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-quality.mdx
Reviewed-SHA: 7e2cd13e9ee590b1
Previous verdict: PASS (Reviewed-SHA 103485d35edb28f1, equal to the page at `7f53a5d`); fixes verified: none open. Scope of this review: only the sentences changed since `7f53a5d` (page lines 13, 16, 17, 45). The rest of the page stands on the previous PASS.

Source: nomercy-player-core `src` at `e3d2de5`. Example unchanged since `7f53a5d`; type check exit 0; snippet ranges "3 OK, 0 bad".

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L13 the policies cap the pick to the screen's HDR or SDR support; HDR = High Dynamic Range, SDR = Standard Dynamic Range | `src/adapters/quality/hdr-policy.ts:73` (`hdrAbrCeiling(levels, displayHdr)`), `:99`, `:113`; `src/types/tracks.ts:45-50` (`dynamicRange?: 'sdr' or 'hdr'`) | Supported |
| L16 `QualityLevel` fields: `bitrate`, optional `width`/`height`, `label`, manifest `index`, optional `supported`, optional `dynamicRange` of `sdr`/`hdr` | `src/types/tracks.ts:28-51` | Supported |
| L17 a ladder is an array of `QualityLevel` rungs | `hdr-policy.ts:73,99` (`levels: ReadonlyArray<QualityLevel>`) | Supported |
| L45 `browserDisplayRangeProbe` wraps `window.matchMedia`, or `null` without one | `src/adapters/quality/display-range.ts:35-50` (`globalThis.matchMedia`; `null` when it is not a function) | Supported |

## Notes

- L13 names only the dynamic-range limit; line 14 adds the size limit (`size-policy.ts:38,123`), so the pair is complete. Not a claim failure.
- L45: the code reads `globalThis.matchMedia`, which is `window.matchMedia` in a browser. Not a claim failure.
