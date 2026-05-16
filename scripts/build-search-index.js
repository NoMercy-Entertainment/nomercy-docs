import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

// All content directories to index
const contentDirs = [
  { dir: './src/content/docs', baseUrl: '' },
  { dir: './src/content/app', baseUrl: '/app' },
  { dir: './src/content/mediaserver', baseUrl: '/mediaserver' },
  { dir: './src/content/player', baseUrl: '/player' },
];

const outputPath = './public/searchIndex.json';

// Ensure public directory exists
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

async function buildSearchIndex() {
  try {
    const documents = [];

    for (const { dir, baseUrl } of contentDirs) {
      // Skip if directory doesn't exist
      if (!fs.existsSync(dir)) {
        console.log(`⚠ Skipping ${dir} (directory not found)`);
        continue;
      }

      // Find both .md and .mdx files
      const files = await glob('**/*.{md,mdx}', { cwd: dir });
      console.log(`Found ${files.length} files in ${dir}`);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: markdownContent } = matter(content);

        // Skip drafts
        if (data.draft === true) {
          continue;
        }

        // Extract text content, removing markdown/MDX syntax
        const textContent = markdownContent
          .replace(/^---[\s\S]*?---/m, '') // Remove frontmatter if any remains
          .replace(/import\s+.*?from\s+['"].*?['"]/g, '') // Remove imports
          .replace(/<[^>]+>/g, ' ') // Remove HTML/JSX tags
          .replace(/```[\s\S]*?```/g, '') // Remove code blocks
          .replace(/`[^`]+`/g, '') // Remove inline code
          .replace(/^#+\s+/gm, '') // Remove markdown headers
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
          .replace(/[#*_`\[\](){}]/g, '') // Remove remaining markdown syntax
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();

        // Create excerpt (first 300 chars)
        const excerpt = textContent.substring(0, 300).trim();

        // Determine URL - handle index files specially
        const slug = file
          .replace(/\.(md|mdx)$/, '')
          .replace(/\/index$/, '')
          .replace(/^index$/, '');

        const url = slug ? `${baseUrl}/${slug}` : baseUrl || '/';

        // Determine section from baseUrl
        let section = 'API';
        if (baseUrl === '/app') section = 'App';
        else if (baseUrl === '/mediaserver') section = 'Media Server';

        documents.push({
          id: `${baseUrl}/${file}`.replace(/^\//, ''),
          title: data.title || slug.replace(/-/g, ' '),
          description: data.description || excerpt,
          category: data.category || section,
          section: section,
          tags: data.tags || [],
          url: url,
          content: textContent.toLowerCase(), // Store lowercase for searching
          order: data.order || 999,
        });
      }
    }

    // Sort by section and order
    documents.sort((a, b) => {
      if (a.section !== b.section) {
        const sectionOrder = { 'API': 0, 'App': 1, 'Media Server': 2 };
        return (sectionOrder[a.section] || 99) - (sectionOrder[b.section] || 99);
      }
      return a.order - b.order;
    });

    // Write search index
    fs.writeFileSync(outputPath, JSON.stringify(documents, null, 2));
    console.log(`\n✓ Search index built with ${documents.length} documents`);
    console.log(`✓ Search index saved to ${outputPath}`);

  } catch (error) {
    console.error('Error building search index:', error);
    process.exit(1);
  }
}

buildSearchIndex();
