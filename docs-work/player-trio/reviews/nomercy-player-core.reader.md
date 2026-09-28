# Reader: /nomercy-player-core

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/introduction.mdx

Reviewed-SHA: 1f7b25194b199e57

## Same-voice comparison

Skipped. There is no approved reference page yet for this section.

## Snippet

None on this page.

## Reader notes (JavaScript background, first visit)

I read the opening paragraphs, the spine sentences, and **Next steps**. I did not open player source.

The page states what Player Core is (the npm package `@nomercy-entertainment/nomercy-player-core`), that it is shared logic rather than a finished music or video player, and how `nomercy-music-player` and `nomercy-video-player` relate (each is the library for its medium; shared behavior lives here). That is enough orientation before vocabulary.

The spine block is a short glossary in prose. Each spine name the page relies on (queue, transport, time, volume, events, plugins, adapters, lifecycle helpers, streams, cues, errors, auth) gets its own sentence that says what it means here. Prose before that block only uses plain words (shared logic, library, playback, behavior) or points at the block ("These names are the pieces of that shared spine").

**Next steps** links to Quickstart at `/nomercy-player-core/quickstart` and says I will compose a minimal player there. The following page is named and the route is explicit.

## Friction (does not fail the rubric)

Inside examples, **HLS**, **phase change**, and **mount element** are not spelled out. I still know what streams, events, and errors mean in this package from the sentence text; the examples are optional color, not terms the page uses earlier without a definition.

**Compose** in the Quickstart blurb is ordinary JavaScript wording; this page does not treat it as library jargon.

Frontmatter **description** lists several spine words for SEO; it is not part of the visible article body, so I do not count it as using terms before the spine sentences on the page itself.

## Why PASS

Under the rubric (fail when a term is used before the page explains it, or when the next page is missing), spine vocabulary is defined on this page before it carries meaning, sibling packages are characterized in plain language, and Quickstart is the clear next step.
