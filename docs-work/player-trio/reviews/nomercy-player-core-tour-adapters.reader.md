# Reader: /nomercy-player-core/tour/adapters

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/tour/adapters.mdx

Reviewed-SHA: c2f205d2768a9048

## Check 1: Terms explained at or before first use

- "Unix-epoch millisecond integer" (line 16) — used without explanation. A web developer may not know that Unix epoch is 1970-01-01, or why milliseconds matter. Readers of the Assumes pages (quickstart) are assumed familiar with this, but the map shows quickstart does not own this term.
- "Date.now()" (line 17) — named but never explained. It is a standard browser API, and that fact could be stated once.

## Check 2: Reader can do the task from the page alone

The task is: create a custom clock adapter and pass it to player setup. The page names the steps but two are unclear:
- Line 39: "fn setup is the call that hands config to your player" — what is setup? The Assumes page (quickstart) should explain it, but the word "call" is vague (a method? a function? a lifecycle hook?).
- Lines 40-41: "Pass that millisecond value through key clockSource on that call" — which millisecond value? The one from `clock.now()`? The sentence assumes prior context that is not on this page or the previous one.

## Check 3: No code gaps hiding needed info

The snippet at lines 43 (:::snippet{file="core-tour-adapters" lines="31-33,74,76-79" live="false"}) will expand in rendered output to show:
- Lines 31-33: the fixed clock object
- Lines 74,76-79: the setup() call with clockSource and player.ready/dispose

The rendered snippet will show the shape and the wrapping, so this is not a gap.

## Check 4: No sentence needs a second read

Lines 40-41: "`key clockSource` is a function that returns the integer, so wrap your clock as `() => clock.now()`." This sentence carries two ideas: the type contract (function returns integer) and how to wrap your object. It could split into two sentences: one on the type, one on the wrapping pattern.

## Why FAIL

A reader cannot confidently create a custom clock and pass it to setup because:
- "that millisecond value" in line 40 is vague (value from where?)
- "setup" is named but never explained
- The wrapping pattern and the type contract are packed into one dense sentence
