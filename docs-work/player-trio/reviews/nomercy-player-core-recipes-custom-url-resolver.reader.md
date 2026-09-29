# Reader review: /nomercy-player-core/recipes/custom-url-resolver

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/recipes/custom-url-resolver.mdx

Reviewed-SHA: 85b992a5c6fdbea8

## Review summary

Opens with context and reference: use IUrlResolver when only a URL string is accepted, not headers. Links to auth-fetch recipe for the alternative.

**The Task**: Concrete example (media host needs signed token query, poster/subtitle stay unsigned). Pass urlResolver into setup. Category on context names the consumer. Call defaultResolve for unchanged categories. Snippet follows.

**Reading the Result**: ResolvedUrl type. Table with three fields: href, searchParams, ext. One caveat per field (use ext over dot-split, relative tells when absolutize failed). Table is concise.

**Swap It Later**: urlResolver with no arg reads active resolver or undefined, pass function to replace, pass undefined to revert. Change applies on next resolveUrl call.

Voice is recipe voice (task, example, methods). Consistent with custom-cue-parser (prerequisite). All types and methods named at first use. Snippet terminal. Density acceptable (few run-ons, each concept one sentence or short paragraph).
