# NoMercy Documentation Site

A modern, markdown-based documentation site for NoMercy applications and mediaserver, built with Astro and featuring semantic search.

## Architecture

This site follows the same architecture as [Playful Programming](https://playfulprogramming.com/posts/orama-search):

```
Content (Markdown) → Build Search Index → Search API → Frontend Search UI
```

### Key Components

1. **Markdown Source**: All documentation lives in the `content/` directory
   - `content/apps/` - Application documentation
   - `content/mediaserver/` - MediaServer documentation

2. **Search Index Builder**: `scripts/build-search-index.js`
   - Runs during build process
   - Generates `searchIndex.json` from all markdown files
   - Extracts frontmatter metadata (title, description, tags, author, date)

3. **Search API**: `src/pages/api/search.js`
   - Full-text search endpoint
   - Supports pagination and filtering
   - Returns JSON results

4. **Search UI**: `src/components/SearchComponent.jsx`
   - Preact component with real-time search
   - Pagination support
   - Category and tag filtering
   - Responsive design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000` or `http://localhost:4321`

### Building

```bash
npm run build
```

This will:
1. Generate `searchIndex.json` from all markdown files
2. Build the static site with Astro

## Project Structure

```
├── content/
│   ├── apps/                    # App documentation
│   └── mediaserver/             # MediaServer documentation
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   └── search.js        # Search API endpoint
│   │   └── search.astro         # Search page
│   └── components/
│       └── SearchComponent.jsx  # Search UI component
├── scripts/
│   └── build-search-index.js    # Search index builder
├── astro.config.mjs
└── package.json
```

## Adding Documentation

1. Create a new markdown file in the appropriate directory:
   ```
   content/apps/my-guide.md
   content/mediaserver/my-guide.md
   ```

2. Add frontmatter with metadata:
   ```yaml
   ---
   title: My Guide
   description: A brief description
   tags: ['tag1', 'tag2']
   author: Your Name
   date: 2025-01-17
   ---
   ```

3. Write your documentation in Markdown

4. During build, the search index will automatically include your new page

## Search Features

The search system provides:

- **Full-text search**: Searches title, description, content, and tags
- **Pagination**: Navigate through large result sets
- **Categories**: Results filtered by category (apps/mediaserver)
- **Tags**: Filter by tags added to frontmatter
- **Real-time**: Debounced search as you type

## Future Enhancements

To upgrade to Orama Cloud for production:

1. Sign up at [Orama Cloud](https://orama.com/)
2. Create a new database
3. Point it to your `searchIndex.json` endpoint
4. Replace the search endpoint with Orama's SDK
5. Get benefits of:
   - Semantic/vector search
   - Better relevance ranking
   - Unlimited queries (free for open-source)
   - Automatic embedding generation

## Technologies Used

- **Astro**: Static site generation
- **Preact**: Lightweight UI component framework
- **Markdown**: Content source format
- **Gray Matter**: Frontmatter parsing
