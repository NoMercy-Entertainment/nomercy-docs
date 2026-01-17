import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

const contentDir = './content';
const outputPath = './public/searchIndex.json';

// Ensure public directory exists
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

async function buildSearchIndex() {
  try {
    const mdFiles = await glob('**/*.md', { cwd: contentDir });
    const documents = [];

    for (const file of mdFiles) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data, content: markdownContent } = matter(content);

      // Extract first 200 chars of content as excerpt
      const excerpt = markdownContent
        .replace(/^#+\s+/gm, '') // Remove markdown headers
        .replace(/[#*_`\[\]()]/g, '') // Remove markdown syntax
        .substring(0, 200)
        .trim();

      // Determine category from file path
      const category = file.split('/')[0];

      documents.push({
        id: file.replace(/\.md$/, ''),
        title: data.title || file.replace(/\.md$/, '').replace(/-/g, ' '),
        description: data.description || excerpt,
        category: category,
        tags: data.tags || [],
        url: `/${file.replace(/\.md$/, '').replace(/\/index$/, '')}`,
        content: markdownContent,
        author: data.author || '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      });
    }

    // Write search index
    fs.writeFileSync(outputPath, JSON.stringify(documents, null, 2));
    console.log(`✓ Search index built with ${documents.length} documents`);
    console.log(`✓ Search index saved to ${outputPath}`);

  } catch (error) {
    console.error('Error building search index:', error);
    process.exit(1);
  }
}

buildSearchIndex();
