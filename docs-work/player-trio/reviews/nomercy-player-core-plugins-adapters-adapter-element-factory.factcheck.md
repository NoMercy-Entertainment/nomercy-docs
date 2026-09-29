# Fact check: /nomercy-player-core/plugins-adapters/adapter-element-factory
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-element-factory.mdx
Reviewed-SHA: 8f04fa01e9da5677

Source: nomercy-player-core at `5ed4538` (toolchain.md; checkout is `e3d2de5`, `git diff --stat 5ed4538 e3d2de5 -- src` is empty). Files: `src/adapters/element-factory/dom.ts`, `index.ts`; `src/index.ts`; `src/core/plugin/base.ts`; `src/types/config.ts`; `package.json` (`exports`). Example: `src/examples/core-adapter-element-factory.ts`.

Method: read page, example and sources. Ran `npm run check:examples`: `tsc` exit 0, `Autoplay OK: 127 example files checked.` The example was not run in a browser (not checked at runtime); its logs are traced by reading `dom.ts`. The hand-written `wrapElement` block (page 103-173) is not compiled by any check; traced against `dom.ts:10-31`. No URLs to fetch (the SVG namespace string in source is not on the page).

## Findings

1. Page line 96: "Pass `unique: true` to `createElement` to reuse a node with that id." `unique` is the third positional boolean, not an option key: `createElement<K>(type: K, id: string, unique?: boolean)` (`src/adapters/element-factory/dom.ts:39-43`; same on the plugin base, `src/core/plugin/base.ts:806-811`). The page's own example calls `createElement('div', 'demo-badge', true)` (`src/examples/core-adapter-element-factory.ts:47`). A reader who writes `createElement('div', 'x', { unique: true })` gets a type error. Fix: "Pass `true` as the third argument (`unique`) to `createElement` to reuse an existing node with that id."

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `createElement` returns `CreateElement`; `AddClasses` and `AppendTo` are later stages of that chain | `dom.ts:10-31,39-76,129-158` | Supported |
| No setup option swaps this surface | grep `element\|factory` over `types/config.ts`: no element-factory field (hits are unrelated: `:51,119,121,241,247,302,468`) | Supported |
| Import helpers and types from `/adapters/element-factory` | `package.json:48-50`; `adapters/element-factory/index.ts:9-16` | Supported |
| Helpers and the three types also ship from the root | `src/index.ts:27-38` | Supported |
| Five functions; `createElement` → `CreateElement`; `addClasses` → `AddClasses`; other three return ready nodes or the element | `dom.ts:39,79,88,102,115` | Supported |
| Table: `createButton` → `HTMLButtonElement`; `createSVG` → `SVGSVGElement`; `removeClasses` → the element | `dom.ts:115,102,88-94` | Supported |
| `createButton` sets `type` `button`, label on `aria-label` and `title`, attaches click handler | `dom.ts:115-123` | Supported |
| `createSVG` sets `id`, `viewBox`, `xmlns` on an SVG-namespace node | `dom.ts:96,102-108` | Supported |
| Empty class names skipped by `addClasses` and `removeClasses` | `dom.ts:80-83,89-92` | Supported |
| `removeClasses` is terminal: returns the element | `dom.ts:88,93` | Supported |
| Plugin base exposes the same five as protected methods that forward | `base.ts:806-812,819-821,827-829,835-837,843-845` | Supported |
| Interface blocks (page 70-91) | `dom.ts:10-31` (identical members and types) | Supported |
| `setProperty` writes a CSS custom property when the node is an `HTMLElement`; otherwise leaves style alone | `dom.ts:70-74,152-156` (`el.style.setProperty` behind `instanceof HTMLElement`) | Supported (see note) |
| Pass `unique: true` to reuse a node with that id | `dom.ts:39-48` (positional boolean) | Unsupported (finding 1) |
| Implementing `CreateElement` yourself cannot be passed into `setup` | no config field (row 2) | Supported |
| `wrapElement` block matches the three interfaces and the built-in behaviour | `dom.ts:10-31,55-75,129-158` | Supported (traced, not compiled) |
| Example: `finishBadge` types a builder as `CreateElement<HTMLDivElement>`; `createElement('div', 'demo-badge', true).get()` returns the same node | `dom.ts:45-48` (`querySelector` by id; node is in the document via `root`, example `:29-34`) | Supported |
| Example logs `hide.type`, `aria-label`, `title` | `dom.ts:118-120` | Supported |
| Links: Building DOM, IEventBus pages | `handbook/building-dom.mdx`, `plugins-adapters/adapter-event-bus.mdx` exist | Supported |

## Notes (not failures)

- Page line 94: `el.style.setProperty(name, value)` writes any CSS property, standard or custom (`dom.ts:72`). "Writes a CSS custom property" is true for custom names but narrower than the code. Suggested wording: "writes a CSS property (a custom property works too)".
- Page 103-173 is a hand-written code block, not a `:::snippet` from a compiled example. The docs rule says short blocks come from a compiled example file. Not a fact error.
- No elided snippet on the page.
