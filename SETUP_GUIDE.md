# NoMercy Documentation System - Setup Complete

Your documentation site is now ready to use! Here's what's been created:

## 🎯 Quick Start

### Development
```bash
npm run dev
```
Visit `http://localhost:4322` (or the port shown in terminal)

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
NoMercy.Docs/
├── content/                          # Your markdown documentation
│   ├── apps/                        # App documentation
│   │   ├── getting-started.md
│   │   └── installation.md
│   └── mediaserver/                 # MediaServer documentation
│       ├── overview.md
│       └── configuration.md
│
├── src/
│   ├── pages/
│   │   ├── index.astro             # Homepage
│   │   ├── search.astro            # Search page
│   │   └── api/
│   │       └── search.js           # Search API endpoint
│   │
│   ├── components/
│   │   └── SearchComponent.jsx     # Search UI (Preact)
│   │
│   └── layouts/
│       └── MarkdownLayout.astro    # Markdown page layout
│
├── scripts/
│   └── build-search-index.js       # Generates searchIndex.json
│
├── public/                          # Static files (generated)
│   └── searchIndex.json            # Search index
│
├── astro.config.mjs                # Astro configuration
└── package.json                    # Project dependencies
```

## 🔍 How the Search System Works

1. **Content**: You write markdown files in `content/` with frontmatter:
   ```markdown
   ---
   title: My Guide
   description: A brief description
   tags: ['tag1', 'tag2']
   author: Your Name
   date: 2025-01-17
   ---
   # Content here...
   ```

2. **Indexing**: During build, `build-search-index.js` creates `searchIndex.json`

3. **Search API**: `/api/search` endpoint provides full-text search

4. **UI**: `SearchComponent.jsx` provides the search interface

### Architecture Diagram
```
Markdown Files (content/) 
    ↓
build-search-index.js 
    ↓
searchIndex.json (generated)
    ↓
/api/search endpoint
    ↓
SearchComponent (Preact frontend)
```

## 📝 Adding New Documentation

1. Create a markdown file in the appropriate folder:
   ```bash
   # For app docs
   content/apps/my-feature.md
   
   # For mediaserver docs
   content/mediaserver/my-feature.md
   ```

2. Add frontmatter:
   ```yaml
   ---
   title: Feature Title
   description: Brief description
   tags: ['feature', 'setup']
   author: Your Name
   date: 2025-01-17
   ---
   ```

3. Write your content in Markdown

4. Run `npm run build` - the search index updates automatically

## 🚀 Features Included

✅ **Markdown-based content** - Write in Markdown, content is your source of truth  
✅ **Full-text search** - Search across all documentation  
✅ **Pagination** - Navigate large result sets  
✅ **Real-time search** - Debounced search as you type  
✅ **Category filtering** - Results organized by category (apps/mediaserver)  
✅ **Tag filtering** - Filter results by tags  
✅ **Responsive design** - Works on mobile and desktop  
✅ **Fast builds** - Static site generation with Astro  

## 🔮 Future Enhancements

### Upgrade to Orama Cloud (Optional)

For semantic search capabilities (understanding meaning, not just keywords):

1. Sign up at [Orama Cloud](https://orama.com/)
2. Create a database and point it to your `searchIndex.json`
3. Update the search component to use Orama's SDK:

```javascript
import { OramaClient } from '@oramacloud/client';

const client = new OramaClient({
  endpoint: process.env.ORAMA_ENDPOINT,
  api_key: process.env.ORAMA_API_KEY
});

// Replace the fetch call with Orama
const results = await client.search({ 
  term: query,
  limit: limit,
  offset: offset 
});
```

Benefits:
- Semantic search ("effects in React" understands concepts)
- Better relevance ranking
- Unlimited queries (free for open-source)
- Automatic embeddings

## 📚 Tech Stack

- **Astro** v5 - Static site generation
- **Preact** - Lightweight UI framework
- **Markdown** - Content format
- **Gray Matter** - Frontmatter parsing
- **Glob** - File discovery

## 🎨 Customization

### Change Homepage
Edit `src/pages/index.astro` to customize the homepage

### Change Search UI
Edit `src/components/SearchComponent.jsx` to modify search behavior/appearance

### Change Page Layout
Edit `src/layouts/MarkdownLayout.astro` for documentation page styling

### Add New Sections
Create new folders in `content/` and they'll automatically be indexed!

## 📖 Example: Adding a Blog Section

```bash
# Create blog folder
mkdir content/blog

# Create first post
echo '---
title: First Post
description: My first blog post
date: 2025-01-17
---

# My First Post

Content here...' > content/blog/first-post.md

# Build
npm run build
```

The post will automatically be included in search results!

## 🔧 Troubleshooting

### Build fails with "Search index not found"
- Ensure `content/` folder exists with `.md` files
- Run `npm run build:search` explicitly to debug

### Search API returns no results
- Check that `searchIndex.json` was generated in `public/`
- Verify markdown files have proper frontmatter

### CSS/styling issues
- Customize styles in component files (`.jsx`) and layout files (`.astro`)
- Add global CSS in `src/layouts/` files

## 📄 License

Replace with your license of choice

## 🤝 Contributing

Contributions welcome! Follow the structure above and submit PRs.

---

Happy documenting! 🚀
