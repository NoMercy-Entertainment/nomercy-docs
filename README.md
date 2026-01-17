# NoMercy Documentation Site

A modern, professional documentation site built with Astro and Tailwind CSS v4. Featuring a responsive design, dark mode support, and full-text search functionality.

## 🎨 Design System

The documentation site implements a professional design system with:

- **Color Palette**: Emerald (primary), Zinc (neutral), with full dark mode
- **Layout**: Fixed left sidebar (responsive), mobile hamburger menu
- **Typography**: Professional font scaling with code highlighting
- **Responsive**: Mobile-first design that scales to desktop

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.astro     # Navigation bar with theme toggle
│   ├── Navigation.jsx   # Sidebar menu (Preact)
│   ├── Logo.astro       # Brand logo
│   └── ...
├── layouts/
│   ├── RootLayout.astro      # Main app shell with sidebar
│   └── MarkdownLayout.astro  # Documentation page wrapper
├── pages/
│   ├── index.astro      # Homepage
│   ├── search.astro     # Search interface
│   ├── [...slug].astro  # Dynamic markdown routes
│   └── api/search.js    # Search API endpoint
├── content/docs/        # Markdown documentation
│   ├── apps/
│   ├── mediaserver/
│   └── ...
└── styles/global.css    # Tailwind imports
```

### Technology Stack

- **Astro 5.6.1** - Static site generator
- **Tailwind CSS 4.1.15** - Utility-first CSS framework
- **Preact 10.22.1** - Lightweight UI framework
- **Markdown** - Content format with YAML frontmatter

## ✨ Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode with localStorage persistence
- ✅ Full-text search with pagination
- ✅ Markdown-based content system
- ✅ Code syntax highlighting
- ✅ Mobile hamburger navigation
- ✅ Active link highlighting
- ✅ Static generation (no server needed)
- ✅ ~10KB gzipped JavaScript
- ✅ SEO-friendly structure

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Production Build

```bash
npm run build
```

Static files are generated in `dist/` directory.

## 📝 Adding Documentation

Create a new markdown file in `src/content/docs/`:

```markdown
---
title: Your Page Title
description: Brief description of the page
---

# Your Content

Your documentation content here...

## Section 2

More content...
```

The page will automatically:
- Be added to the search index
- Get a URL matching its file path
- Use consistent styling with MarkdownLayout
- Be listed in search results

## 🎯 Navigation

Edit `src/components/Navigation.jsx` to add new sections to the sidebar:

```javascript
const navigationGroups = [
  {
    title: 'Section Name',
    links: [
      { title: 'Page Title', href: '/path/to/page' },
    ],
  },
];
```

## 🌙 Dark Mode

The site includes a dark mode toggle in the header that:
- Automatically switches between light and dark themes
- Persists the user's preference in localStorage
- Applies consistent styling across all components

## 🔍 Search System

Full-text search with:
- Real-time search as you type
- Result pagination
- Category and tag support
- Pre-built search index for fast lookups

## 📊 Build Output

- 8 static HTML pages generated
- ~10KB gzipped JavaScript (interactive components only)
- Pre-built search index (JSON)
- Optimized for production deployment

## 🧪 Testing

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

### Change Brand Colors

1. Edit `tailwind.config.ts` color definitions
2. Update component color classes
3. Modify `src/components/Logo.astro`

### Modify Layout

Edit `src/layouts/RootLayout.astro`:
- Sidebar width: `lg:ml-72 xl:ml-80`
- Header positioning: `fixed top-0`
- Content padding: `px-4 sm:px-6 lg:px-8`

## 📦 Dependencies

### Core
- `astro` - Static site generator
- `tailwindcss` - Styling framework
- `preact` - UI framework

### Utilities
- `clsx` - Class name utility
- `gray-matter` - Frontmatter parsing
- `sharp` - Image optimization
- `glob` - File pattern matching

## 🚢 Deployment

The `dist/` folder can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📄 License

Part of the NoMercy project.

---

**Last Updated**: 2025
**Astro Version**: 5.6.1
**Tailwind CSS Version**: 4.1.15
