# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **NoMercy Documentation Site**, a professional markdown-based documentation system built with **Astro 5.6.1**, **Tailwind CSS v4**, and **Preact**. The site automatically generates pages from markdown files, builds intelligent navigation, and provides full-text search capabilities.

## Essential Commands

### Development
```bash
npm run dev              # Start dev server at http://localhost:4321 (with hot reload)
npm run start            # Alias for npm run dev
```

### Production Build
```bash
npm run build            # Complete build: generates search index → builds Astro static site
npm run build:search     # Manually rebuild search index only (runs automatically in build)
npm run preview          # Preview production build at http://localhost:4322
```

### Direct Astro CLI
```bash
npm run astro            # Access Astro CLI directly for advanced operations
```

## High-Level Architecture

### Content-First Static Site Generator

The documentation system is built on **Astro's Content Collections** pattern:

1. **Markdown files** in `src/content/docs/` define all documentation pages
2. **Content schema** (`src/content/config.ts`) validates frontmatter with Zod
3. **Dynamic routing** (`src/pages/[...slug].astro`) renders all pages via catch-all route
4. **Build-time generation** creates static HTML for all pages (no runtime server needed)

### Three-Layer Navigation System

Navigation is automatically generated from content metadata:

1. **Desktop Sidebar** (`DocsNavigation.astro`) - Static Astro component, groups pages by `category`, sorts by `order` field
2. **Mobile Menu** (`MobileDocsNav.jsx`) - Interactive Preact component with slide-out panel and state management
3. **Table of Contents** (`TableOfContents.astro`) - Auto-generated from H2-H3 headings in markdown

Navigation generation logic lives in `src/lib/navigation.ts`:
- `getNavigation()` - Builds category-grouped sidebar navigation from content collection
- `getTocFromHeadings()` - Extracts heading hierarchy for right sidebar TOC

### Build-Time Search Architecture

Search functionality is **completely static** (no backend database):

1. **Index Building** (`scripts/build-search-index.js`):
   - Runs before Astro build as part of `npm run build`
   - Scans all `.md` files in `src/content/docs/`
   - Extracts title, description, content, tags, category from frontmatter
   - Writes pre-built `public/searchIndex.json`

2. **Search API** (`src/pages/api/search.js`):
   - GET endpoint at `/api/search?q=query&limit=10&offset=0`
   - Reads `searchIndex.json` (cached in memory after first read)
   - Simple string matching on title, description, content, tags
   - Returns paginated results

3. **Search UI** (`SearchComponent.jsx` + `search.astro`):
   - Preact component with debounced search (300ms)
   - Client-side state management for results and pagination
   - 10 results per page with Previous/Next navigation

### Astro + Preact Hybrid Strategy

The site uses **Astro for static content** and **Preact for interactivity**:

- **Static Components (Astro)**: Header, Footer, Prose, DocsNavigation, TableOfContents
- **Interactive Components (Preact)**: MobileDocsNav (hamburger menu), SearchComponent, ThemeToggle, Navigation
- **Why Preact?** Lightweight (~3KB), React-compatible API, fast hydration for interactive islands

Key directive: `client:load` - Hydrates Preact components immediately on page load for interactivity

### Layout Hierarchy

```
RootLayout.astro (base HTML shell)
  └── Header.astro
  └── Navigation.jsx (top nav)
  └── <slot /> (page content goes here)
  └── Footer.astro

MarkdownLayout.astro (doc pages wrapper)
  └── Uses RootLayout.astro as base
  └── MobileDocsNav.jsx (hamburger)
  └── DocsNavigation.astro (left sidebar)
  └── Main Content Area
      └── Article Header (title + description)
      └── Prose.astro (markdown typography wrapper)
          └── <Content /> (rendered markdown)
      └── TableOfContents.astro (right sidebar)
```

### Responsive Breakpoints

- **Mobile (default)**: Full width, hamburger menu, no sidebars
- **lg: (1024px)**: Desktop sidebar appears (72px left margin)
- **xl: (1280px)**: Wider layout (80px margin) + TOC sidebar on right

## Content Creation Workflow

### Adding New Documentation

1. Create markdown file: `src/content/docs/[category]/page-name.md`
2. Add required frontmatter:
   ```yaml
   ---
   title: Page Title              # Required
   description: SEO description   # Required
   category: Category Name        # Optional (for navigation grouping)
   order: 1                       # Optional (sort order within category)
   draft: false                   # Optional (exclude from build if true)
   tags: [api, authentication]    # Optional (for search)
   ---
   ```
3. Write markdown content
4. Run `npm run build` - Page auto-generates at `/[category]/page-name`
5. Navigation and search index update automatically

### Content Schema Fields

Defined in `src/content/config.ts`:

- `title` (required): Page heading and navigation label
- `description` (required): Meta description and search preview
- `published` (optional): Publication date
- `updated` (optional): Last update timestamp
- `tags` (optional): Array of searchable keywords
- `author` (optional): Content author name
- `category` (optional): Navigation group (e.g., "API Reference", "Guides")
- `order` (optional): Sort position within category (lower = earlier)
- `draft` (optional): If true, excludes page from production build

### Current Content Structure

```
src/content/docs/
├── apps/
│   ├── getting-started.md
│   └── installation.md
├── mediaserver/
│   ├── overview.md
│   └── configuration.md
├── api/
│   ├── authentication.md
│   └── endpoints.md
├── guides/
│   └── quick-start.md
└── deployment/
    └── docker.md
```

## Styling System

### Tailwind CSS v4 Configuration

The site uses **Tailwind CSS v4** (new engine) configured in `tailwind.config.ts`:

**Color Palette:**
- **Zinc** (50-950): Neutral grays for text and backgrounds
- **Emerald** (50-900): Green accent for interactive elements
- **Sky** (50-900): Blue for links and highlights

**Dark Mode:**
- Class-based strategy: `dark:` prefix
- Toggle via `ThemeToggle.jsx` component
- Persists to localStorage

**Typography Plugin:**
- Custom prose styles in `src/components/Prose.astro`
- Markdown content wrapped in `.prose` class
- Responsive font sizes and line heights

**Global Styles:**
- Defined in `src/styles/global.css`
- Imported in `RootLayout.astro` (critical for Tailwind v4)
- Contains CSS custom properties and base resets

### PostCSS Pipeline

Configured in `postcss.config.mjs`:
- Uses `@tailwindcss/postcss` v4 plugin
- Required for Tailwind v4's new architecture

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/pages/[...slug].astro` | Dynamic route handler - renders all documentation pages |
| `src/lib/navigation.ts` | Navigation generation utilities (`getNavigation`, `getTocFromHeadings`) |
| `scripts/build-search-index.js` | Build-time search index generator (parses all markdown) |
| `src/pages/api/search.js` | Search API endpoint with in-memory caching |
| `src/layouts/MarkdownLayout.astro` | Documentation page layout wrapper |
| `src/components/SearchComponent.jsx` | Preact search UI with pagination |
| `src/components/DocsNavigation.astro` | Static sidebar navigation (desktop) |
| `src/components/MobileDocsNav.jsx` | Interactive hamburger menu (mobile) |
| `src/content/config.ts` | Zod schema for content collection validation |
| `tailwind.config.ts` | Design tokens, colors, typography settings |

## Development Patterns

### When to Use Astro vs Preact

**Use Astro (.astro files) for:**
- Static content that doesn't change after page load
- Server-side data fetching (content collections, file reading)
- SEO-critical content that must be in initial HTML
- Layout components (headers, footers, prose wrappers)

**Use Preact (.jsx files) for:**
- Interactive UI (menus, modals, forms)
- Client-side state management
- Event handlers (clicks, input changes)
- Dynamic content updates without page reload

### Content Collection Queries

```typescript
import { getCollection } from 'astro:content';

// Get all published docs
const docs = await getCollection('docs', ({ data }) => {
  return data.draft !== true;
});

// Filter by category
const apiDocs = docs.filter(doc => doc.data.category === 'API Reference');

// Sort by order field
docs.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
```

### Adding New Interactive Components

1. Create `.jsx` file in `src/components/`
2. Use Preact hooks (useState, useEffect, etc.)
3. Import into `.astro` page
4. Add `client:load` directive for immediate hydration:
   ```astro
   <MyComponent client:load />
   ```

### Modifying Search Logic

Search implementation is in two places:

1. **Index building** (`scripts/build-search-index.js`):
   - Modify what fields are indexed
   - Add custom text extraction logic
   - Change output format of `searchIndex.json`

2. **Search API** (`src/pages/api/search.js`):
   - Modify ranking/scoring algorithm
   - Add filters (by category, tags, date)
   - Implement fuzzy matching or stemming

## Deployment

The build output (`dist/`) is **fully static** and can be deployed to:

- **Vercel** (recommended - native Astro support with zero config)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**
- Any static file hosting

**Build Output Structure:**
```
dist/
├── index.html                    # Homepage
├── search/index.html             # Search page
├── [category]/[page]/index.html  # All doc pages
├── api/search.js                 # Search API endpoint
├── _astro/                       # Compiled CSS/JS bundles
└── searchIndex.json              # Pre-built search index
```

All pages are pre-rendered at build time - no server-side rendering required.

## Important Notes

- **Search index is build-time only**: Changes to markdown require `npm run build` to update search
- **Navigation is auto-generated**: Add `category` and `order` to frontmatter to control placement
- **Draft pages excluded**: Set `draft: true` in frontmatter to hide pages from production
- **Global CSS required**: `global.css` must be imported in `RootLayout.astro` for Tailwind v4
- **Mobile navigation uses state**: `MobileDocsNav.jsx` manages open/close state with Preact
- **TypeScript strict mode**: Content schema enforces type safety at build time
