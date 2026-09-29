# Reader review: /nomercy-player-core/recipes/custom-url-resolver

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/recipes/custom-url-resolver.mdx

Reviewed-SHA: 85b992a5c6fdbea8

## Four criteria checks

**1. Every term explained at or before first use**

Prerequisite: /nomercy-player-core/recipes/custom-cue-parser. New terms: `cls IUrlResolver`, `key authorization` header, `key urlResolver`, `key category`, `key defaultResolve`, `cls ResolvedUrl`, `key href`, `key searchParams`, `key ext`, `key relative`.

Each explained at use: category "names the consumer", ext "gates on file type", relative indicates "string is not an absolute URL".

**2. Reader can do the task from page alone**

Task: Provide a custom URL resolver for media URL signing.

Steps: 1) Implement IUrlResolver with category-based switching, 2) Pass urlResolver on setup to replace built-in, 3) Call defaultResolve for categories left alone, 4) Read result using href/searchParams/ext/relative fields, 5) Swap it later using urlResolver() getter/setter.

Reader can implement and use a resolver from this page alone.

**3. Code examples don't lean on missing content**

Snippet demonstrates resolver that signs media URLs but leaves poster/subtitle unsigned. No unneeded scaffolding.

"The host in the sample stands for your own backend" clarifies the placeholder.

**4. No sentence needs second read**

Clear direct language. "Pass `key defaultResolve` for every category you leave alone" clearly states the pattern.

## Findings

None. Page passes all criteria.
