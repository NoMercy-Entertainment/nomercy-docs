# Fact check: /nomercy-player-core/plugins-adapters/adapter-element-factory
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-element-factory.mdx
Reviewed-SHA: fb6fa3f1b5e7e8f5
Previous verdict: FAIL; fixes verified: finding 1 (unique is the third positional argument)

Source: nomercy-player-core `src/` at `e3d2de5` (equals the pinned `5ed4538` for `src/`). Method: read the previous verdict, the fix diff (`git show b7190ca`), the whole page, its example and the source. `npm run check:examples` (published dist 2.2.1): `Autoplay OK: 127 example files checked.`, exit 0. The example also type-checks against the package source (scratch tsconfig outside the repo, `tsc` exit 0; negative control gave `TS2322`, exit 2). The hand-written `wrapElement` block (page 104-172) type-checks against the source (scratch file, `tsc` exit 0). The example was not run in a browser (not checked at runtime). No URLs on the page.

## Fix verification

| # | Page line | Now says | Source | Status |
| --- | --- | --- | --- | --- |
| 1 | 96 | "Pass `true` as the third argument (`key unique`) to `fn createElement` to reuse a node with that id." | `adapters/element-factory/dom.ts:39-48` (`unique?: boolean` third parameter; `querySelector('#id') ?? createElement`); plugin base `core/plugin/base.ts:806-811` same signature; example `core-adapter-element-factory.ts:47` `createElement('div', 'demo-badge', true)` | Verified fixed |

## Claim table (fresh)

| Claim | Supported by | Status |
| --- | --- | --- |
| Interface blocks 70-91 | `dom.ts:10-31` (identical members and types) | Supported |
| No setup option swaps this surface | no element-factory field in `types/config.ts` (previous verdict grep; not re-run) | Supported |
| Imports from `/adapters/element-factory`; helpers and types also on the root | `package.json:48`; `src/index.ts:30,35-37` | Supported |
| Helper return types table | `dom.ts:39-43,79,88,102,115` | Supported |
| `createButton` sets `type` `button`, `aria-label`, `title`, click handler | `dom.ts:115-123` | Supported |
| `createSVG` sets `id`, `viewBox`, `xmlns` in the SVG namespace | `dom.ts:102-106` | Supported |
| Empty class names skipped; `removeClasses` returns the element | `dom.ts:79-94` | Supported |
| Plugin base exposes the five as protected forwarding methods | `base.ts:806,819,827,835,843` | Supported |
| `setProperty` writes only when the node is an `HTMLElement` | `dom.ts:70-74` | Supported |
| Links: handbook/building-dom, adapter-event-bus | files exist | Supported |

## New findings

None.

## Notes (not failures)

- Page 94 "writes a CSS custom property": `el.style.setProperty` (`dom.ts:72`) writes any CSS property, custom or standard. True for custom names, narrower than the code. Same note as last time; not changed.
- Page 20-33 and 103-173 are hand-written code blocks, not `:::snippet lines=` ranges from the compiled example. Not a fact error.
