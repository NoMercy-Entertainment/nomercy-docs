# Reader: /nomercy-player-core/plugins-adapters/adapter-quality

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-quality.mdx

Reviewed-SHA: 103485d35edb28f1

## Findings

### QualityLevel class used without definition

Line 13 introduces:

> They decide two limits on a ladder of `cls QualityLevel` rungs

"QualityLevel" is used throughout but never defined on this page. What fields does QualityLevel have? What's a "rung"?

**Cost to reader:** A reader doesn't know the shape of the data being passed to these functions. They see "ladder" as metaphor for quality levels, and "rung" as individual level, but can't construct the data without reading the source code.

**Fix:** Define QualityLevel before using it in the Functions section. Add a note: "A QualityLevel object holds properties like width, height, bitrate, and hdr flag. A ladder is an array of QualityLevel objects."

### matchMedia used without explanation

Line 40 states:

> | `fn browserDisplayRangeProbe` | A probe over `matchMedia`, or `null` without one. |

`matchMedia` is a browser API for media queries, not explained here.

**Cost to reader:** A reader implementing a custom DisplayRangeProbe doesn't understand what `matchMedia` does or how to use it. Line 64 references passing a DisplayRangeProbe "when a test must fake the screen" but the probe type's `fn matches` method is shown without explaining what media query it should answer.

**Fix:** Clarify: "`fn browserDisplayRangeProbe` wraps `window.matchMedia`, which checks CSS media queries. A probe's `fn matches` method should answer a media query like `(dynamic-range: high)` to detect HDR."

### Acronyms not expanded on first use

"HDR" (High Dynamic Range) is used throughout and never expanded. "SDR" (Standard Dynamic Range) is used from line 41 onward but first appears without expansion.

**Cost to reader:** A reader unfamiliar with display technology might not know these terms refer to screen capabilities.

**Fix:** Expand on first use: "HDR (High Dynamic Range)", "SDR (Standard Dynamic Range)".

