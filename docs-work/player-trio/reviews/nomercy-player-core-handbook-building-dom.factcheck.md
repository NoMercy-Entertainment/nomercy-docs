# Fact check: /nomercy-player-core/handbook/building-dom
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/building-dom.mdx
Reviewed-SHA: 247435078b961ca5

Delta review of the fix for the three findings of the previous verdict (FAIL, Reviewed-SHA `feb6d6e56b46a363`): `key label` on a positional parameter (finding 1), `key id` / `key unique` on positional parameters (finding 2), and "Pass `unique: true`" reading as an options object (finding 3).

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5` (read only): `src/adapters/element-factory/dom.ts`. Tag meanings: `src/lib/mdx/rehype.ts:110` (`var` = a value), `:126-128` (`key` = an object key). Method: `git -C C:/Projects/worktrees/docs-batch-05 diff HEAD -- src/content/nomercy-player-core/en/handbook/building-dom.mdx` (three changed lines: 20, 28, 43); each checked against `dom.ts`; the whole page re-read around them (lines 18-47).

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 20 | `createElement` takes a tag name, an `var id`, and an optional `var unique` flag (both positional) | `dom.ts:39-43` (`createElement(type, id, unique?)`) | Supported (finding 2 fixed) |
| 28 | Pass `true` as the third argument to reuse an existing node with that id | `dom.ts:42` (`unique?: boolean`, third parameter), `:45-47` (lookup, then `existing ?? document.createElement(type)`) | Supported (finding 3 fixed) |
| 43 | `createButton` sets `type` to `button`, copies `var label` onto `aria-label` and `title`, attaches the click handler | `dom.ts:115` (`createButton(id, label, onClick)`, `label` positional), `:118-121` | Supported (finding 1 fixed) |

## Section re-read

- Lines 29-30 (querySelector with a CSS-escaped id; a found node keeps its id): `dom.ts:46,52-53`. Still true after the edit at line 28.
- `key` tag audit: the page has no `key` tag left (all three were the fixed ones). No positional parameter is tagged `key`.

## Findings

None.

## Carried from the previous review

> Verdict: FAIL
> Reviewed: src/content/nomercy-player-core/en/handbook/building-dom.mdx
> Reviewed-SHA: feb6d6e56b46a363

Delta review since 0b063c4; the full review before it passed.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5`. Method: `git diff 0b063c4 -- src/content/nomercy-player-core/en/handbook/building-dom.mdx`; every added or changed line checked; the section around each hunk re-read. The pseudo-tags used (`fn`, `var`, `str`, `el`, `attr`, `key`, `cls`, inline `ts`) are all defined in `src/lib/mdx/rehype.ts:102-126` and `:184`.

### Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 16 | `str adapters/element-factory` import path | `package.json` exports key `./adapters/element-factory` | Supported |
| 29 | `fn document.querySelector` with a CSS-escaped id | `src/adapters/element-factory/dom.ts:46` | Supported |
| 43 | `attr type` set to `str button`; `attr aria-label`, `attr title` from the label | `dom.ts:118-120` | Supported |
| 43 | `key label` marks `label` as an object key | `dom.ts:115` `createButton(id: string, label: string, onClick)`: `label` is a positional parameter, no options object; `key` means "an object key" (`src/lib/mdx/rehype.ts:124-125`) | Unsupported |
| 45 | `attr id`, `attr viewBox`, `attr xmlns` set on the svg | `dom.ts:104-106` | Supported |

### Findings

1. Page line 43: `key label` tags a positional parameter as an object key. Source: `src/adapters/element-factory/dom.ts:115` (`createButton(id: string, label: string, onClick: (event: Event) => void)`); the tag meaning: `src/lib/mdx/rehype.ts:124-125`. Fix: change `` `key label` `` to `` `var label` ``.
2. Sibling, same defect family, in unchanged text (fix in the same pass): page line 20 tags the positional parameters `id` and `unique` as `` `key id` `` and `` `key unique` ``; `dom.ts:39-43` (`createElement(type, id, unique?)`). Fix: `` `var id` `` and `` `var unique` ``.
3. Sibling in unchanged text: page line 28 says "Pass `unique: true`", which reads as an options object; the flag is the third positional argument (`dom.ts:42`). Fix: "Pass `true` as the third argument to reuse an existing node with that id instead of creating another."

### Carried from the full review at 0b063c4


Source: `packages/player-web/nomercy-player-core/src/adapters/element-factory/dom.ts`, `adapters/element-factory/index.ts`; `package.json` export `./adapters/element-factory`. Example: `src/examples/core-handbook-building-dom.ts`. Method: read page, example, and those source lines; SHA256 of page bytes (first 16 hex); no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example. Snippet: `live="false"`.

### Gate checks

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

### Claim table

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
