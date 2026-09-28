# Fact check: /nomercy-player-core/handbook/building-dom
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/building-dom.mdx
Reviewed-SHA: 73b71f4842b192a1

Source: `packages/player-web/nomercy-player-core/src/adapters/element-factory/dom.ts`, `adapters/element-factory/index.ts`; `package.json` export `./adapters/element-factory`. Example: `src/examples/core-handbook-building-dom.ts`. Method: read page, example, and those source lines; SHA256 of page bytes (first 16 hex); no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example. Snippet: `live="false"`.

## Gate checks

| Gate | Result |
| --- | --- |
| Claims supported by element-factory `dom.ts` / `index.ts` | Pass |
| Imports and symbols match package export | Pass (`package.json` `./adapters/element-factory`; `index.ts` re-exports five helpers) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass |
| Table data rows ≤ 6 on page | Pass (header + 5 data = 6 non-separator lines) |
| British spelling / banned nickname | Pass (none) |
| `createButton` sets `type=button`, `aria-label`, and `title` | Pass (`dom.ts:118-120`) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Five helpers: `createElement`, `createButton`, `createSVG`, `addClasses`, `removeClasses` | `index.ts:9-15`; `dom.ts` | Supported |
| Import from `adapters/element-factory` | `package.json` `./adapters/element-factory`; example `:17-23` | Supported |
| `createElement(tag, id, unique?)` returns fluent builder | `dom.ts:39-76`; `CreateElement` `:10-17` | Supported |
| Chain `addClasses`, `setAttribute`, `setProperty`, `appendTo`, `prependTo`, then `get` | `dom.ts:55-75` | Supported |
| `setProperty` writes a CSS custom property on inline style | `dom.ts:70-73` (`el.style.setProperty`) | Supported |
| `appendTo` appends and returns shorter chain with `get` / `addClasses` | `dom.ts:58-60`; `AppendTo` `:28-31` | Supported |
| `prependTo` inserts before parent's first child the same way | `dom.ts:62-64` | Supported |
| `unique: true` reuses existing id via `document.querySelector` + CSS-escaped id | `dom.ts:45-47` | Supported |
| Found node that already has an id keeps that id | `dom.ts:52-53` (`if (!el.id) el.id = id`) | Supported |
| `createButton` ready `<button>`; `type` `button`; `label` → `aria-label` and `title`; click handler | `dom.ts:115-122` | Supported |
| `createSVG` SVG-namespace `<svg>` with `id`, `viewBox`, `xmlns`; no fluent builder | `dom.ts:102-107` | Supported |
| `addClasses` skips empty strings; returns fluent builder | `dom.ts:79-84` | Supported |
| `removeClasses` skips empty strings; returns the element (terminal) | `dom.ts:88-93` | Supported |
| Table return types match helpers | `dom.ts` interfaces / return types | Supported |
| Example: createElement chain, createSVG, createButton, add/removeClasses, unique reuse | `core-handbook-building-dom.ts:29-47`; matches page snippet | Supported |
