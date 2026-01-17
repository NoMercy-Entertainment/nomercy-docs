import fs from 'fs';
import path from 'path';

let searchIndex = null;

function getSearchIndex() {
  if (!searchIndex) {
    const indexPath = path.join(process.cwd(), 'public', 'searchIndex.json');
    const indexContent = fs.readFileSync(indexPath, 'utf-8');
    searchIndex = JSON.parse(indexContent);
  }
  return searchIndex;
}

export async function GET({ url }) {
  try {
    const searchQuery = url.searchParams.get('q');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const documents = getSearchIndex();

    if (!searchQuery) {
      // Return all documents with pagination if no query
      const results = documents.slice(offset, offset + limit);
      return new Response(
        JSON.stringify({
          hits: results,
          count: documents.length,
          limit,
          offset,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Simple full-text search (can be enhanced with better algorithms)
    const query = searchQuery.toLowerCase();
    const filtered = documents.filter(doc => {
      return (
        doc.title?.toLowerCase().includes(query) ||
        doc.description?.toLowerCase().includes(query) ||
        doc.content?.toLowerCase().includes(query) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    });

    // Apply pagination
    const results = filtered.slice(offset, offset + limit);

    return new Response(
      JSON.stringify({
        hits: results,
        count: filtered.length,
        limit,
        offset,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({ error: 'Search failed', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
