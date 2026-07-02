# Docs Contract

This is the standard the player trio docs (`nomercy-player-core`, `nomercy-video-player`,
`nomercy-music-player`) are held to. It's not a style guide to skim once, it's what
`scripts/check-docs.mjs` checks on every build. If a page violates something below, the
build goes red with the rule name and the fix. Read this before writing or reviewing a page.

## Reading arc

All three collections walk a reader through the same seven stages, in the same order. A
reader who's read one of the three already knows the shape of the other two.

| # | Stage | What lives here |
|---|---|---|
| 1 | Introduction | What the library is, who it's for, why it exists. Pitches the extensibility model: strict JWPlayer-style setup then playback, full freedom over the UI after that. |
| 2 | Quickstart | Install to first media playing, with a live preview. Copy-paste that works first try. |
| 3 | Guided tour | The API in small, one-concept pages: setup, lifecycle, transport, time, volume, queue, tracks/subtitles, state/events. |
| 4 | Build a player | Step-by-step overlay build. Every step shows the live result exactly as the reader's own code will render it. |
| 5 | Recipes & frameworks | Vue composable, React hook, Svelte, vanilla. Best practices for embedding a player inside UI the framework doesn't own. |
| 6 | Plugins & adapters | One page per plugin/adapter: purpose, options, rules, restrictions, best practices, how to extend. |
| 7 | API reference | Full signatures and types. |

Core rides this same arc but one altitude up: "what it provides under the hood" (compose
your own player), not "play your first video." Core stays medium-neutral throughout — it
never picks a side between video and music.

## Page rules

- One concept per page. Open with a one-line intent, close with a next-pointer. Not padded,
  not thin.
- Tone is friendly, direct, explanatory. No condescension, no schoolteacher voice, no
  trivia or filler. No em dashes, anywhere.
- Put an intent paragraph before any table. A table with no lead-in forces the reader to
  reverse-engineer why it's there.
- Content lives under `/en/`; the structure is i18n-ready even where only English exists
  today. Accessibility is baked into every component and example, not bolted on after.
- Zero contamination between video and music. Core is the exception — it legitimately
  discusses both. One "see also" cross-link maximum, and only where it's genuinely useful.
- Consistency comes from shared templates and components plus these rules, never from
  memory. If a page needs a special case to look right, the template is missing something.

## Runnable-snippet system

Every code sample is a real `.ts` file under `src/examples/`, not a hand-pasted block. The
`:::snippet{file="..."}` directive (`src/lib/mdx/remark-snippet.ts`) reads that file at
build time, renders it as the fenced code block on the page, and mounts a live
`<PlayerExample>` bound to the same file. What the reader copies and what the page shows
are the same object, always.

Example data (media URLs, playlist shapes) comes from one shared module,
`src/examples/media.ts`, sourced from the testbed data and the real `nomercy-media`
catalogue. Snippets import from it instead of inlining their own URLs, so there's exactly
one place a stale link can hide.

### baseUrl is mandatory

Every playlist example sets `baseUrl` on the config and leaves item media paths relative,
exactly as the media server sends them (a leading slash on the path, no trailing slash on
the base). The player prepends `baseUrl` as a string prefix and keeps its base path, so one
config value moves the whole catalogue between environments. Never pre-join an absolute URL
into an item. This is the player's intended best practice and every example teaches it.

`check:docs` type-checks and executes every snippet headlessly against the local trio
build (the Playwright gate, `e2e/snippets.spec.ts`). A snippet that throws fails the docs
build. No example ships that doesn't run first try.

## Live `<PlayerExample>` block

`<PlayerExample snippet="...">` (`src/components/PlayerExample.tsx`) is a client-only React
island. It dynamically imports the named snippet and the real trio package, mounts a real
`nmplayer()` with the snippet's own config object, and hydrates only once visible so the
player bundle never ships on a page that doesn't render one. It exposes an accessible
status region (`role="status"`, `aria-live="polite"`) so loading/ready/error states are
announced, not just shown. In "Build a player," each step's block shows the incremental
result of that step alone, not the finished player early.

## Enforcement

`scripts/check-docs.mjs` runs first in `npm run build` (also directly as
`npm run check:docs`) and checks, per trio collection:

- Every page has a `title` and resolves an `order` — either an explicit frontmatter
  `order` or a listing in `src/lib/nav-structure.ts`. A page with neither has no defined
  position and fails.
- The collection covers all seven arc stages above (once it has any pages at all).
- No video page references a music-only term and no music page references a video-only
  term. Core is exempt.
- No page exceeds the size budget (8000 words / 1500 lines) — a page that big has stopped
  being "one concept."

It then runs the Playwright snippet gate. Either failing exits the build non-zero. This
file is the human-readable version of that script; if they ever disagree, the script is
telling the truth about what's actually enforced and this file needs updating to match.
