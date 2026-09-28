# Reader: /nomercy-player-core/handbook/building-dom

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/building-dom.mdx

Reviewed-SHA: 73b71f4842b192a1

## Same-voice comparison

Compared to [The Queue](/nomercy-player-core/tour/queue) (`tour/queue.mdx`).

Both open with a short goal statement, then split behavior into `##` sections with one primary API group each. They use the same doc typography (`fn`, `key`, `str`) and end with a non-live snippet and a **Next** link. Queue assumes a composed `player` and never shows imports; Building DOM names a module path up front because these helpers sit outside the player instance. Prose density and imperative tone match: what each call returns, what is chainable versus terminal, and one inline block plus a table for scanability.

## Snippet

`core-handbook-building-dom.ts` (via `:::snippet{file="core-handbook-building-dom" live="false"}` before **Next**). It imports all five helpers from `@nomercy-entertainment/nomercy-player-core/adapters/element-factory`, mounts a `root` div, builds a labeled span with `createElement`, adds an SVG with `createSVG`, wires `createButton` to `removeClasses`, toggles visibility with standalone `addClasses`, and demonstrates `unique: true` reuse. It does not show `setProperty`, `prependTo`, or chained `removeClasses`. Judgment below is for the MDX page only.

## Reader notes (JavaScript background, DOM familiar)

I read the page in order without opening player source or the utilities reference.

The opening states the job: five helpers create elements, set attributes, and toggle classes, and I choose where nodes sit in the tree. The import line points at `adapters/element-factory` (the snippet supplies the full package path).

**createElement** names the tag, `key id`, and optional `key unique`, then lists the fluent methods through `fn get`. `setProperty`, `appendTo`, and `prependTo` behavior and return shapes are spelled out. `unique: true` reuses via `document.querySelector` with a CSS-escaped id without clobbering an existing id on the found node. The inline example is enough to build and mount a span in one chain.

**Buttons and SVG** separates ready-made nodes from the builder. `createButton` sets `type`, copies `label` to `aria-label` and `title`, and attaches the click handler. `createSVG` sets `id`, `viewBox`, and `xmlns` in the SVG namespace; I append children myself. The page states there is no fluent builder on SVG returns.

**Classes** distinguishes chainable `addClasses` from terminal `removeClasses`. The summary table lists all five helpers and what each returns.

I can build a node by importing the helpers, calling `createElement(tag, id)` (optionally `unique`), chaining through `appendTo(parent).get()`, or using `createButton` / `createSVG` and attaching with DOM APIs I already know.

## Friction (does not fail the rubric)

The MDX does not show a full `import` statement; only the submodule path. `createButton` argument order and its `id` parameter are implied by the snippet, not listed in prose like `createElement` parameters. `setProperty` and `prependTo` have no inline example. `root` in the page example is my mount parent, not defined on the page (the snippet creates one). Standalone `addClasses(element, names)` appears only in the snippet, not in the inline block.

## Why PASS

Every helper name the page introduces is tied to behavior or return type, and the createElement section plus table give a complete build-and-mount path without reading source. The page does not talk about itself as documentation. Under the stated fail conditions (unexplained names, or not knowing how to build a node), this passes.
