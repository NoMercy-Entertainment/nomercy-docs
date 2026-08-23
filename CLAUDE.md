# CLAUDE.md

Guidance for Claude Code when working in the **NoMercy Documentation Site**.

## What this is

A static documentation site built with **Astro 7**, **React 18** (islands), **Tailwind CSS v4** (CSS-based config, no `tailwind.config.ts`), and a **custom MDX dialect**. Content is authored as `.mdx`, navigation is generated from frontmatter, and search is a build-time static index. The site is its own git repository (nested inside the monorepo) — run git from `docs/nomercy-docs/`.

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

All pages live under `src/content/<product>/<locale>/…` as `.mdx`. The locale is currently always `en/`. The seven collections (registered in `src/content.config.ts`):

```
src/content/
├── nomercy-media-server/en/   # Server
├── nomercy-app-web/en/        # Web app
├── nomercy-player-core/en/    # Core (base lib) — npm: @nomercy-entertainment/nomercy-player-core
├── nomercy-video-player/en/   # Video — npm: @nomercy-entertainment/nomercy-video-player
├── nomercy-music-player/en/   # Music — npm: @nomercy-entertainment/nomercy-music-player
├── nm-components/en/          # Moooom design-system components
└── nomercy-api/en|signalr/    # REST + SignalR reference
```

`content.config.ts` validates frontmatter with Zod (`pageSchema`); each collection uses a Content Layer `glob()` loader. `title` is required; `description`, `category`, `order`, `draft`, `tags`, `helpKey`, `sections` are optional. The schema is `catchall(z.any())` so unknown keys are tolerated.

### Routing

Each product has its own catch-all route: `src/pages/<product>/[...slug].astro`. A file at `src/content/nomercy-video-player/en/plugins/skipper.mdx` is served at `/nomercy-video-player/plugins/skipper` — the URL is derived from the file path (with the `en/` locale prefix and trailing `/index` stripped). There is no manifest mapping files to URLs.

### Navigation (one manifest — the single source of truth)

The sidebar structure lives in **`src/lib/nav-structure.ts`** — one ordered list per collection of `{ group, pages: [slug, …] }`. Nothing else owns structure:

- **Group order** = array order of the `{ group, pages }` blocks.
- **Page order** = array order of slugs inside a group's `pages`.
- **Section label** = the `group` string.
- Slugs are the path under `<collection>/en/` without `.mdx` (e.g. `plugins/skipper`).

`src/lib/navigation.ts` reads the manifest and builds the sidebar; `PageFooterNav` (prev/next) and `scripts/build-search-index.js` (search section + order) read it too via `scripts/_nav-manifest.mjs`. Page **titles** still come from each page's frontmatter `title` — the manifest owns only structure.

**To reorganize:** edit `nav-structure.ts` only. Move a slug to reorder it; move it to another group to recategorise; move a `{ group, pages }` block to reorder sections. Reordering never touches page files, and never changes a URL (URLs come from file paths).

`npm run check:nav` (runs first in `build`) fails if any non-draft page is missing from the manifest or any manifest slug has no file — so a new page must be placed, it can't silently vanish into an "Other" bucket.

### Custom MDX dialect

`src/lib/mdx/` registers remark/rehype/recma plugins: `remark-button`, `remark-callout`, `remark-code-group`, `remark-hero`, `remark-icon-cards`, `remark-logo-cards`, `remark-properties`, `remark-row-col`, `remark-cleanup`. Syntax highlighting is handled in rehype (Astro's Shiki is disabled in `astro.config.mjs`). When editing `.mdx`, preserve these directives, code fences, and `{/* Source: packages/… */}` provenance comments.

### React islands

Interactive pieces are React 18 components (`.tsx`) hydrated with `client:load`: `Navigation`, `MobileNavigation`, `Search`, `ThemeToggle`, `LocaleSwitcher`, etc. Static structure (`Header`, `Footer`, `PageFooterNav`, `Prose`) is Astro or server-rendered React. There is no Preact.

### Search

Build-time only. `scripts/build-search-index.js` scans content and writes `public/searchIndex.json`; `src/pages/api/search.js` serves it. Content changes require a rebuild to appear in search.

## Organization & avoiding link cascade

Pages cross-link with absolute paths (`](/nomercy-video-player/hls)`). Markdown links are not type-checked, so a moved or renamed page silently 404s every link that pointed at its old URL. Hundreds of these links exist across the collections — one careless move can break dozens of files.

Rules, in priority order:

1. **Reorganize via `nav-structure.ts`, not file moves.** Structure is one manifest; reordering there changes nothing about URLs and costs zero file edits.
2. **If a URL genuinely must change, add ONE redirect** in `astro.config.mjs` (`"/old/url": "/new/url"`) instead of editing every referencing file. Old links — internal, external, and bookmarked — keep working.
3. **Never link to a `draft: true` page.** Draft pages are excluded from the build, so any link to one is dead on arrival.
4. **`check:nav` + `check:links` are the guardrails.** Both run first in `build`: a page missing from the manifest, a phantom manifest slug, or a dangling internal link all fail the build.

## Content authoring

Frontmatter owns page metadata only — NOT structure (that's `nav-structure.ts`):

```yaml
---
title: Page Title          # required — also the sidebar label
description: One-line SEO/search summary
draft: false               # true = excluded from build, nav, and search
tags: [hls, abr]           # optional, for search
---
```

After creating a page, add its slug to the right group in `src/lib/nav-structure.ts` (or `check:nav` fails the build). Do NOT add `category`/`order` to frontmatter — they are not read.

## Examples must use real data

Code examples must use real, resolvable media — never invented hosts. See the canonical list in the monorepo memory, summarized:

- Media assets (`.m3u8`, chapter/thumb/subtitle `.vtt`, `.mp3`, posters) use the public GitHub catalogue: `https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/{Films,Music,Anime}/…` (e.g. Sintel, Big Buck Bunny, Tears of Steel; Derek Clegg for audio). Posters use `image.tmdb.org`.
- Prefer the library's own `baseUrl` config + a relative path over hand-built string concatenation.
- `api.example.com`, `license.example.com`, `wss://…`, `yoursite.com` are legitimate "your own backend" placeholders — leave them. `protected.cdn.your-domain.com` is the one allowed media placeholder, for auth examples.
- Banned: `cdn.example.com/<media>`, `media.nomercy.tv`, TV-show paths like `/foundation/…` (the catalogue has no TV shows).

## Accuracy

Documented symbols, methods, options, events, and import paths must match the real package source in `packages/nomercy-player-core/`, `packages/nomercy-video-player/`, `packages/nomercy-music-player/`. `check:examples` and `check:doc-imports` enforce the mechanically checkable part of this rule. If a doc disagrees with the code, fix the doc to match the code — never add a "known broken / not implemented" disclaimer. If the doc reveals an actual code bug, report it; don't paper over it.
