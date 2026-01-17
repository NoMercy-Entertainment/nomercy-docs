import { useEffect, useState } from 'preact/hooks';
import clsx from 'clsx';

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
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      setResults(data.hits);
      setTotal(data.count);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search documentation..."
          value={query}
          onInput={(e) => {
            setQuery(e.target.value);
            setOffset(0);
          }}
          className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block text-emerald-600 dark:text-emerald-400">
            Searching...
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && query && results.length === 0 && (
        <div className="text-center py-8 text-zinc-600 dark:text-zinc-400">
          No results found for "{query}"
        </div>
      )}

      {/* Results List */}
      {!loading && results.length > 0 && (
        <>
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors"
              >
                <h3 className="mb-2">
                  <a
                    href={result.url}
                    className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {result.title}
                  </a>
                </h3>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {result.category}
                  </span>
                  {result.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {result.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              <button
                onClick={() => setOffset(Math.max(0, offset - limit))}
                disabled={offset === 0}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  offset === 0
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-600 cursor-not-allowed'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-400'
                )}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setOffset(i * limit)}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    currentPage === i + 1
                      ? 'bg-emerald-600 dark:bg-emerald-700 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-400'
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setOffset(offset + limit)}
                disabled={currentPage === totalPages}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  currentPage === totalPages
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-600 cursor-not-allowed'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-600 dark:hover:text-emerald-400'
                )}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
