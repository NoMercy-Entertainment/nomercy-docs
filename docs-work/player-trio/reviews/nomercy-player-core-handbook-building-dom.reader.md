# Reader: /nomercy-player-core/handbook/building-dom
Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/building-dom.mdx

Reviewed-SHA: 247435078b961ca5

## Comparison with prior handbook page (anatomy)

Like anatomy, this page teaches a specific API: five helpers (`createElement`, `createButton`, `createSVG`, `addClasses`, `removeClasses`). Unlike anatomy, it explains each function's behavior, shows the fluent chaining pattern through examples, and provides a complete code snippet that demonstrates all five helpers in sequence.

## Terms explained

Each function is named and its return type is stated: "It returns a fluent builder" for `createElement` (with usage examples showing the chain), "returns a ready `<button>`" for `createButton`, "returns an `<svg>` in the SVG namespace" for `createSVG`. The table at the end clarifies what each returns, distinguishing between fluent builders (which support chaining) and direct elements (which don't).

"CSS-escaped id" appears once in "The lookup uses `fn document.querySelector` with a CSS-escaped id" (line 29), named but not explained. For a web developer audience, this is an implementation detail; the reader does not need to understand CSS escaping to call the function with a string id.

## Reader task: Build UI nodes

The opening states "Build UI nodes with five helpers from Player Core." The page then explains each helper's role, shows a small example of `createElement` in a chain, and provides a large snippet showing all five helpers together. The snippet imports all five, creates a span, button, and SVG, chains methods, and toggles classes. A reader can copy this pattern and adapt it to their own nodes.

Code example in the snippet:
```ts
const label = createElement('span', 'badge-label')
  .addClasses(['badge-label'])
  .setAttribute('data-state', 'live')
  .appendTo(root)
  .get();
```

The `root` variable is defined in the snippet (not here), and the reader sees how `.get()` terminates the chain and returns the node.

## Sentence clarity

"Pass `true` as the third argument to reuse an existing node with that id instead of creating another" (line 28) — clear and actionable.

"Removal is terminal: there is no builder after it" (line 55) — describes why `removeClasses` returns the element instead of a builder. Slightly terse, but in context (contrasting with `addClasses`), it is clear.

## Why PASS

A reader can build DOM nodes with these five helpers after reading this page. Each function's behavior is shown, the chaining pattern (fluent builder) is demonstrated, and the complete code snippet proves the functions work together. The page does not require knowledge beyond what it teaches.
