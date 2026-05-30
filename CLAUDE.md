# CLAUDE.md

Guidance for Claude Code when working in the **NoMercy Documentation Site**.

## What this is

A static documentation site built with **Astro 5**, **React 18** (islands), **Tailwind CSS v4** (CSS-based config, no `tailwind.config.ts`), and a **custom MDX dialect**. Content is authored as `.mdx`, navigation is generated from frontmatter, and search is a build-time static index. The site is its own git repository (nested inside the monorepo) — run git from `docs/nomercy-docs/`.

## Commands

```bash
npm run dev          # dev server at http://localhost:4321
npm run build        # check:links -> build:search -> astro build
npm run check:links  # validate every internal link resolves (fails on dangling)
npm run build:search # regenerate public/searchIndex.json
npm run preview      # build + preview
```

`build` runs `check:links` first — a dangling internal link fails the build, by design (see Organization below).

## Architecture

### Content collections

All pages live under `src/content/<product>/<locale>/…` as `.mdx`. The locale is currently always `en/`. The seven collections (registered in `src/content/config.ts`):

```
src/content/
├── nomercy-media-server/en/   # Server
├── nomercy-app-web/en/        # Web app
├── nomercy-app-android/en/    # Android
├── nomercy-player-kit/en/     # Kit (base lib) — npm: @nomercy-entertainment/nomercy-player-core
├── nomercy-video-player/en/   # Video — npm: @nomercy-entertainment/nomercy-video-player
├── nomercy-music-player/en/   # Music — npm: @nomercy-entertainment/nomercy-music-player
└── nomercy-api/en|signalr/    # REST + SignalR reference
```

`config.ts` validates frontmatter with Zod (`pageSchema`). `title` is required; `description`, `category`, `order`, `draft`, `tags`, `helpKey`, `sections` are optional. The schema is `catchall(z.any())` so unknown keys are tolerated.

### Routing

Each product has its own catch-all route: `src/pages/<product>/[...slug].astro`. A file at `src/content/nomercy-video-player/en/plugins/skipper.mdx` is served at `/nomercy-video-player/plugins/skipper` — the URL is derived from the file path (with the `en/` locale prefix and trailing `/index` stripped). There is no manifest mapping files to URLs.

### Navigation (frontmatter-driven — no manifest)

`src/lib/navigation.ts` builds the sidebar entirely from frontmatter:

- Pages are grouped by their `category` field.
- Categories are ordered by the `categoryOrder` map in `navigation.ts` (an unknown category falls to the middle, ~50).
- Within a category, pages sort by `order` (ascending; missing = 999).
- `index.mdx` and any `*/index.mdx` are skipped (reachable from the parent).

**Consequence:** the sidebar's shape is controlled by `category` + `order` in frontmatter, NOT by folder layout. To reorganize the sidebar, edit frontmatter — do not move files.

### Custom MDX dialect

`src/lib/mdx/` registers remark/rehype/recma plugins: `remark-button`, `remark-callout`, `remark-code-group`, `remark-hero`, `remark-icon-cards`, `remark-logo-cards`, `remark-properties`, `remark-row-col`, `remark-cleanup`. Syntax highlighting is handled in rehype (Astro's Shiki is disabled in `astro.config.mjs`). When editing `.mdx`, preserve these directives, code fences, and `{/* Source: packages/… */}` provenance comments.

### React islands

Interactive pieces are React 18 components (`.tsx`) hydrated with `client:load`: `Navigation`, `MobileNavigation`, `Search`, `ThemeToggle`, `LocaleSwitcher`, etc. Static structure (`Header`, `Footer`, `PageFooterNav`, `Prose`) is Astro or server-rendered React. There is no Preact.

### Search

Build-time only. `scripts/build-search-index.js` scans content and writes `public/searchIndex.json`; `src/pages/api/search.js` serves it. Content changes require a rebuild to appear in search.

## Organization & avoiding link cascade

Pages cross-link with absolute paths (`](/nomercy-video-player/hls)`). Markdown links are not type-checked, so a moved or renamed page silently 404s every link that pointed at its old URL. Hundreds of these links exist across the collections — one careless move can break dozens of files.

Rules, in priority order:

1. **Reorganize via frontmatter, not file moves.** Changing a page's `category`/`order` restructures the sidebar without changing its URL. This is the default way to "tidy up" structure and costs zero link edits.
2. **If a URL genuinely must change, add ONE redirect** in `astro.config.mjs` (`"/old/url": "/new/url"`) instead of editing every referencing file. Old links — internal, external, and bookmarked — keep working.
3. **Never link to a `draft: true` page.** Draft pages are excluded from the build, so any link to one is dead on arrival.
4. **`npm run check:links` is the guardrail.** It runs first in `build` and fails on any dangling internal link. Run it after any structural change.

## Content authoring

Frontmatter:

```yaml
---
title: Page Title          # required
description: One-line SEO/search summary
category: Plugins          # must match a key in navigation.ts categoryOrder
order: 3                   # unique within the category; controls sidebar position
draft: false               # true = excluded from build, nav, and search
---
```

`category` must be one of the values in `navigation.ts` `categoryOrder` — don't invent new categories without adding them there, or the page lands in an unordered bucket. Keep `order` unique within a category.

## Examples must use real data

Code examples must use real, resolvable media — never invented hosts. See the canonical list in the monorepo memory, summarized:

- Media assets (`.m3u8`, chapter/thumb/subtitle `.vtt`, `.mp3`, posters) use the public GitHub catalogue: `https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/{Films,Music,Anime}/…` (e.g. Sintel, Big Buck Bunny, Tears of Steel; Derek Clegg for audio). Posters use `image.tmdb.org`.
- Prefer the library's own `baseUrl` config + a relative path over hand-built string concatenation.
- `api.example.com`, `license.example.com`, `wss://…`, `yoursite.com` are legitimate "your own backend" placeholders — leave them. `protected.cdn.your-domain.com` is the one allowed media placeholder, for auth examples.
- Banned: `cdn.example.com/<media>`, `media.nomercy.tv`, TV-show paths like `/foundation/…` (the catalogue has no TV shows).

## Accuracy

Documented symbols, methods, options, events, and import paths must match the real package source in `packages/nomercy-player-kit/`, `packages/nomercy-video-player-v2/`, `packages/nomercy-music-player-v2/`. If a doc disagrees with the code, fix the doc to match the code — never add a "known broken / not implemented" disclaimer. If the doc reveals an actual code bug, report it; don't paper over it.
