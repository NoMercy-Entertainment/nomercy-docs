# Reader: /nomercy-player-core/plugins-adapters/adapter-language-matcher

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-language-matcher.mdx

Reviewed-SHA: 6e95c170e4716fa7

## Checking against PASS criteria

- **Every term explained:** "BCP 47 tag" is named in the interface table as `string, a BCP 47 tag`. While BCP 47 itself is not expanded, the context (language fallback chain, locale codes like PT-br) makes clear it's a language/region code standard.
- **Reader can do the task:** The task is to "turn a BCP 47 tag into the ordered list of languages to try". The page shows bcp47FallbackChain returns the tag, then strips subtags. Example shows using it to find translations. Clear enough to use.
- **No code example leans on unexplained things:** The usage snippet shows calling the matcher with a tag and walking the result array. Self-contained.
- **No sentence needs a second read:** All clear. "It keeps case and whitespace as given" explains why `PT-br` doesn't match `pt-BR`.

The page works as a reference for language matching. A reader knows when to use it, how to use it, and what the default chain does.

