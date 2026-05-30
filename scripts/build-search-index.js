import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { readNavLookup } from './_nav-manifest.mjs';

// Section grouping and ordering come from the nav manifest, not page frontmatter.
const navLookup = readNavLookup();

// All content directories to index
const contentDirs = [
  { dir: './src/content/nomercy-player-kit',   baseUrl: '/nomercy-player-kit',   product: 'nomercy-player-kit' },
  { dir: './src/content/nomercy-video-player',  baseUrl: '/nomercy-video-player',  product: 'nomercy-video-player' },
  { dir: './src/content/nomercy-music-player',  baseUrl: '/nomercy-music-player',  product: 'nomercy-music-player' },
  { dir: './src/content/nomercy-media-server',  baseUrl: '/nomercy-media-server',  product: 'nomercy-media-server' },
  { dir: './src/content/nomercy-app-web',       baseUrl: '/nomercy-app-web',       product: 'nomercy-app-web' },
  { dir: './src/content/nomercy-app-android',   baseUrl: '/nomercy-app-android',   product: 'nomercy-app-android' },
  { dir: './src/content/nomercy-api',           baseUrl: '/nomercy-api',           product: 'nomercy-api' },
];

const productLabels = {
  'nomercy-player-kit':  'Kit',
  'nomercy-video-player': 'Video Player',
  'nomercy-music-player': 'Music Player',
  'nomercy-media-server': 'Media Server',
  'nomercy-app-web':      'Web App',
  'nomercy-app-android':  'Android',
  'nomercy-api':          'API',
};

const outputPath = './public/searchIndex.json';

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

async function buildSearchIndex() {
  try {
    const documents = [];

    for (const { dir, baseUrl, product } of contentDirs) {
      if (!fs.existsSync(dir)) {
        console.log(`Skipping ${dir} (directory not found)`);
        continue;
      }

      const files = await glob('**/*.{md,mdx}', { cwd: dir });
      console.log(`Found ${files.length} files in ${dir}`);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);

        if (data.draft === true) continue;

        const textContent = markdownContent
          .replace(/^---[\s\S]*?---/m, '')
          .replace(/import\s+.*?from\s+['"].*?['"]/g, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/```[\s\S]*?```/g, '')
          .replace(/`[^`]+`/g, '')
          .replace(/^#+\s+/gm, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/[#*_`\[\](){}]/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        const excerpt = textContent.substring(0, 300).trim();

        const slug = file
          .split(path.sep).join('/')
          .replace(/\.(md|mdx)$/, '')
          .replace(/^[a-z]{2}\//, '')
          .replace(/\/index$/, '')
          .replace(/^index$/, '');

        const url = slug ? `${baseUrl}/${slug}` : baseUrl || '/';

        const section = productLabels[product] || product;
        const placement = navLookup[product]?.get(slug);

        documents.push({
          id: `${baseUrl}/${file}`.replace(/^\//, ''),
          title: data.title || slug.replace(/-/g, ' '),
          description: data.description || excerpt,
          category: placement?.category ?? section,
          section,
          product,
          tags: data.tags || [],
          url,
          content: textContent.toLowerCase(),
          order: placement?.order ?? 999,
        });
      }
    }

    documents.sort((a, b) => {
      if (a.product !== b.product) return a.product.localeCompare(b.product);
      return a.order - b.order;
    });

    fs.writeFileSync(outputPath, JSON.stringify(documents, null, 2));
    console.log(`\n✓ Search index built with ${documents.length} documents`);
    console.log(`✓ Search index saved to ${outputPath}`);

  } catch (error) {
    console.error('Error building search index:', error);
    process.exit(1);
  }
}

buildSearchIndex();
