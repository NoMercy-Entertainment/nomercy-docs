# NoMercy Documentation System - Architecture Overview

## What You Have Built

A complete markdown-based documentation system inspired by [Playful Programming's approach](https://playfulprogramming.com/posts/orama-search), with:

✅ **Content-driven architecture** - Markdown is your source of truth  
✅ **Automated indexing** - Search index regenerates on every build  
✅ **Full-text search API** - RESTful search endpoint  
✅ **Interactive search UI** - Real-time search with Preact  
✅ **Ready for Orama upgrade** - Built to easily add semantic search later  

## System Flow

```
Your Markdown Files (content/)
        ↓
      (Write docs here)
        ↓
    npm run build
        ↓
   build-search-index.js
        ↓
  Parses all .md files
  Extracts frontmatter
        ↓
  public/searchIndex.json (generated)
        ↓
    Website builds (Astro)
        ↓
  Static files in dist/
        ↓
  /api/search endpoint
        ↓
  SearchComponent.jsx
        ↓
  User sees results in browser
```

## File Organization

### Content (`content/`)
- **Markdown files**: Your documentation
- **Structure**: Folders become categories (apps/, mediaserver/)
- **Frontmatter**: Metadata for each page

```markdown
---
title: Page Title
description: Short description
tags: ['tag1', 'tag2']
author: Author Name
date: 2025-01-17
---

# Markdown content here
```

### Build System (`scripts/`)
- **build-search-index.js**: 
  - Finds all `.md` files
  - Parses frontmatter with gray-matter
  - Extracts content excerpts
  - Generates `public/searchIndex.json`

### API (`src/pages/api/`)
- **search.js**: 
  - Loads searchIndex.json
  - Performs full-text search
  - Returns paginated results
  - Runs at build time (static generation)

### Frontend (`src/components/` & `src/pages/`)
- **SearchComponent.jsx**: 
  - Preact component
  - Real-time search with debouncing
  - Pagination
  - Responsive UI
- **search.astro**: 
  - Search page container
  - Mounts SearchComponent
- **index.astro**: 
  - Homepage
  - Navigation to docs

### Static Files (`public/`)
- Generated during build:
  - `searchIndex.json` - Complete search index
- Static assets can be added here

## Key Technologies

| Technology | Purpose |
|-----------|---------|
| **Astro** | Static site generation |
| **Preact** | Lightweight UI framework |
| **Gray Matter** | Parse YAML frontmatter |
| **Glob** | Find markdown files |
| **Node.js** | Build scripts |

## Build Process

```bash
npm run build

# Steps:
# 1. npm run build:search
#    ├─ Find all content/**/*.md
#    ├─ Parse frontmatter
#    ├─ Generate searchIndex.json
#    └─ Save to public/

# 2. astro build
#    ├─ Render .astro files to HTML
#    ├─ Compile .jsx components to JS
#    ├─ Copy public/ to dist/
#    └─ Output dist/ ready for deployment
```

## Search Index Structure

Generated `searchIndex.json`:
```json
[
  {
    "id": "apps/getting-started",
    "title": "Getting Started with NoMercy Apps",
    "description": "Learn how to get started...",
    "category": "apps",
    "tags": ["apps", "getting-started"],
    "url": "/apps/getting-started",
    "content": "Full markdown content...",
    "author": "NoMercy Team",
    "date": "2025-01-17T00:00:00.000Z"
  },
  ...
]
```

## Search API Response

GET `/api/search?q=query&limit=10&offset=0`

```json
{
  "hits": [
    {
      "id": "apps/getting-started",
      "title": "Getting Started with NoMercy Apps",
      "description": "Learn how to get started...",
      "category": "apps",
      "tags": ["apps", "getting-started"],
      "url": "/apps/getting-started",
      "author": "NoMercy Team",
      "date": "2025-01-17T00:00:00.000Z"
    }
  ],
  "count": 42,
  "limit": 10,
  "offset": 0
}
```

## How to Add Documentation

### Quick Example: New Feature Guide

1. **Create file**:
   ```bash
   content/apps/advanced-features.md
   ```

2. **Add content**:
   ```markdown
   ---
   title: Advanced Features
   description: Learn about advanced NoMercy features
   tags: ['apps', 'advanced', 'features']
   author: Your Name
   date: 2025-01-17
   ---
   
   # Advanced Features
   
   ## Feature 1
   Description...
   ```

3. **Build**:
   ```bash
   npm run build
   ```

4. **Result**:
   - Page available at `/apps/advanced-features`
   - Searchable immediately
   - Indexed in searchIndex.json

## Deployment Guide

### Option 1: Vercel (Recommended)
```bash
# Just push to GitHub
# Vercel auto-detects Astro
# npm run build runs automatically
# Builds every commit
# Free tier includes this
```

### Option 2: Netlify
```bash
# Connect GitHub repo
# Build command: npm run build
# Publish directory: dist/
# Auto-deploys on push
```

### Option 3: Static Hosting (Any Provider)
```bash
# Locally:
npm run build

# Upload dist/ folder to:
# - AWS S3 + CloudFront
# - Google Cloud Storage
# - Azure Static Web Apps
# - GitHub Pages
# - etc.
```

### Important: Include searchIndex.json
The search API needs access to `public/searchIndex.json`:
```
dist/
├── _astro/
├── index.html
├── search/
├── api/
└── searchIndex.json  ← Must include this!
```

## Performance Characteristics

| Operation | Time |
|-----------|------|
| Full rebuild | ~5-10 seconds |
| Search query | ~50ms (local) |
| Index generation | ~1 second |
| Site generation | ~3 seconds |

## Limitations & Considerations

### Current (Local Search)
- ❌ Keyword-only (no semantic understanding)
- ✅ Fast & lightweight
- ✅ No external dependencies
- ✅ Free forever
- ⚠️ Large indices (1000+ docs) get slower

### When to Upgrade to Orama
- 🎯 Need semantic search
- 🚀 Need better ranking
- 📈 Have 1000+ documents
- 💬 Want conversational queries

See `ORAMA_MIGRATION.md` for details.

## Extensibility

### Add New Search Fields
In `scripts/build-search-index.js`:
```javascript
documents.push({
  id: file.replace(/\.md$/, ''),
  title: data.title,
  // Add custom fields:
  version: data.version,
  difficulty: data.difficulty,
  topics: data.topics,
  // ... etc
});
```

### Custom Search Ranking
In `src/pages/api/search.js`:
```javascript
// Add scoring before returning
const scored = filtered.map(doc => ({
  ...doc,
  score: calculateRelevance(query, doc)
}));
scored.sort((a, b) => b.score - a.score);
```

### Add Filters
In `SearchComponent.jsx`:
```javascript
const [categoryFilter, setCategoryFilter] = useState('');

const filtered = results.filter(r => 
  !categoryFilter || r.category === categoryFilter
);
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist/ public/searchIndex.json
npm install
npm run build
```

### Search Returns No Results
- Check `public/searchIndex.json` exists
- Verify markdown files have proper frontmatter
- Look for errors in `npm run build:search`

### CSS Not Loading
- Styles are inline in components
- Edit `src/components/SearchComponent.jsx`
- Edit `src/layouts/MarkdownLayout.astro`

### Dev Server Issues
```bash
# Port already in use? Kill and restart
npm run dev  # Will use next available port (4322, 4323, etc)
```

## Next Steps

1. **Add more documentation**:
   - Create markdown files in `content/`
   - Rebuild with `npm run build`

2. **Customize styling**:
   - Edit component files
   - Edit layout files

3. **Deploy**:
   - Follow deployment guide above
   - Push dist/ folder to hosting

4. **Monitor search usage** (optional):
   - Add analytics to SearchComponent.jsx
   - Track popular queries

5. **Plan Orama upgrade** (later):
   - When you want semantic search
   - See `ORAMA_MIGRATION.md`

## Architecture Inspiration

This system is inspired by [Playful Programming's approach](https://playfulprogramming.com/posts/orama-search):

> "We store all of our content in markdown in our Git repository. During the build of the static parts of the Playful Programming site, we build a searchIndex.json file that acts as a database of our articles. We consume the searchIndex.json file via our serverless function and deploy."

Key principles:
- ✅ Markdown as source of truth
- ✅ Build-time indexing (not runtime)
- ✅ Static files only
- ✅ Scalable architecture
- ✅ Easy to upgrade (Orama integration ready)

---

**You're all set!** 🚀 Start writing documentation and watch it automatically become searchable.
