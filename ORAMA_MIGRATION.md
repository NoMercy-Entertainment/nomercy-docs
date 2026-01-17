# Migrating to Orama Cloud

This guide explains how to upgrade from the built-in search to Orama Cloud for semantic/vector search capabilities.

## Why Upgrade to Orama?

Current setup:
- ✅ Full-text keyword search
- ✅ Fast and lightweight
- ✅ Self-hosted

Orama Cloud adds:
- 🤖 **Semantic Search**: Understanding meaning ("React effects" finds relevant articles)
- 🎯 **Hybrid Search**: Combines semantic + keyword for best results
- ⚡ **Better Ranking**: AI-powered relevance
- 🔓 **Free Forever**: Open-source and non-profit projects
- 🌐 **Managed Service**: No server maintenance needed

## Step-by-Step Migration

### Step 1: Sign Up for Orama Cloud

1. Go to [orama.com](https://orama.com/)
2. Click "Start Free" or "Sign Up"
3. Create your account
4. Create a new index/database

### Step 2: Configure Data Source

In Orama Dashboard:

1. Click "Create Index" or "Add Source"
2. Choose "Remote JSON" or "Custom Data"
3. Point it to your deployment URL:
   ```
   https://yourdomain.com/searchIndex.json
   ```

4. Configure indexing:
   - Frequency: "Every 24 hours" or as needed
   - Include fields: title, description, tags, content
   - Let Orama handle embeddings

Orama will automatically:
- Fetch your searchIndex.json
- Generate embeddings
- Keep index up-to-date

### Step 3: Get API Credentials

In Orama Dashboard:

1. Go to "Settings" → "API Keys"
2. Create new API key or copy existing
3. Note your:
   - **Endpoint**: `https://api.orama.com/...`
   - **API Key**: Your secret key

### Step 4: Update Your Code

Create a `.env.local` file:

```env
ORAMA_ENDPOINT=https://api.orama.com/search/...
ORAMA_API_KEY=your_api_key_here
```

Update `src/components/SearchComponent.jsx`:

```jsx
import { useEffect, useState } from 'preact/hooks';
import { OramaClient } from '@oramacloud/client';

// Initialize Orama client instead of fetch
const oramaClient = new OramaClient({
  endpoint: import.meta.env.PUBLIC_ORAMA_ENDPOINT,
  api_key: import.meta.env.PUBLIC_ORAMA_API_KEY,
});

export function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);

  const limit = 10;

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    const timer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, offset]);

  async function performSearch() {
    setLoading(true);
    try {
      // Call Orama instead of local API
      const response = await oramaClient.search({
        term: query,
        limit: limit,
        offset: offset,
        // Optional: hybrid search combines semantic + keyword
        mode: 'hybrid',
      });

      // Orama returns results in different format
      setResults(response.hits);
      setTotal(response.count);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }

  // Rest of component stays the same...
  // (pagination, UI rendering, etc.)
}
```

### Step 5: Remove Local Search API (Optional)

You can keep both for redundancy, or remove the local search:

```bash
# Delete the local search endpoint (optional)
rm src/pages/api/search.js

# You can still keep searchIndex.json generation for other uses
```

### Step 6: Update Environment Variables

In your hosting provider (Vercel, Netlify, etc.):

**Public Environment Variables** (visible to client):
```
PUBLIC_ORAMA_ENDPOINT=https://api.orama.com/...
```

**Secret Environment Variables** (server-only):
```
ORAMA_API_KEY=your_secret_key_here
```

## Implementation Notes

### Making API Key Public vs. Private

```jsx
// ✅ Public API key (safe for client-side)
const endpoint = import.meta.env.PUBLIC_ORAMA_ENDPOINT;

// ❌ Secret API key (do NOT expose to client)
// Only use in server endpoints!

// If using secret key, create a server endpoint:
// src/pages/api/search-orama.js
export async function POST({ request }) {
  const { query, limit, offset } = await request.json();
  
  const client = new OramaClient({
    endpoint: process.env.ORAMA_ENDPOINT,
    api_key: process.env.ORAMA_API_KEY, // Secret!
  });
  
  const results = await client.search({
    term: query,
    limit,
    offset,
  });
  
  return new Response(JSON.stringify(results));
}
```

## Testing Before Migration

1. Keep both systems running initially
2. Create feature flag:
   ```jsx
   const useOrama = import.meta.env.PUBLIC_USE_ORAMA === 'true';
   ```

3. Toggle between implementations to compare
4. Once confident, remove the old code

## Monitoring & Debugging

### Check if Orama is Working

```javascript
// In browser console at /search page
console.log('Orama endpoint:', import.meta.env.PUBLIC_ORAMA_ENDPOINT);

// Test API manually
fetch('/api/search?q=test').then(r => r.json()).then(console.log);
```

### Common Issues

**"API Key Invalid"**
- Verify key is correct in environment variables
- Check key hasn't expired
- Ensure key has search permissions

**"No results from Orama"**
- Verify searchIndex.json is accessible
- Check Orama dashboard - index exists?
- Ensure data was indexed (check indexing logs)

**"Partial results"**
- Orama may still be indexing
- Check index status in dashboard
- Wait for indexing to complete

## Cost Considerations

**Orama Cloud Pricing** (as of 2025):
- Free tier: 10,000 searches/month
- Open-source projects: Unlimited forever
- Paid tiers: From $29/month for higher volume

For documentation sites, free tier is usually sufficient!

## Rolling Back to Local Search

If you need to revert:

1. The local search API is still in git history
2. Restore it: `git checkout HEAD~ src/pages/api/search.js`
3. Update SearchComponent to use fetch again
4. No data loss - searchIndex.json remains

## Performance Comparison

| Metric | Local Search | Orama Cloud |
|--------|-------------|------------|
| Cold Start | ~50ms | ~100ms |
| Warm Start | ~5ms | ~10ms |
| Result Quality | Good | Excellent |
| Maintenance | Moderate | Low |
| Scaling | Limited | Unlimited |
| Cost | Free | Free (for open-source) |
| Semantic Search | No | Yes |

## Conclusion

Migrating to Orama is straightforward and gives significant UX improvements. The process is reversible, so don't hesitate to try it!

Questions? Check [Orama Documentation](https://docs.orama.com/) or visit their [Discord](https://orama.com/chat)
