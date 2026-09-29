# Reader review: /nomercy-player-core/recipes/swap-an-adapter

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/recipes/swap-an-adapter.mdx

Reviewed-SHA: 14398b6046120f37

## Review summary

Opens with context: use this to change one built-in adapter for the whole player at setup. Names field pattern and example (storage → IndexedDBBackend).

**What You Import**: Imports from package root. Table with three backends: LocalStorageBackend (default, sync, fallback), IndexedDBBackend (opt-in, async, first-call open), MemoryStorageBackend (in-memory, lost on reload). Omit and you get the default. Clear.

**Make the Swap**: Pass storage on setup with new IndexedDBBackend(…). Plugins use this.storage methods, unaware of which backend. Namespaced wrapper keeps keys separate. Five methods listed: get, set, remove, getJSON, setJSON. Sync backends resolve at once under await. Snippet follows.

**Error Handling**: When IndexedDB missing, IndexedDBBackend rejects with core:policy/indexedDBUnsupported error. Use alternatives in that environment. Concrete failure mode.

Voice is recipe (setup, behavior, example). Consistent with custom-url-resolver (prerequisite). All types and methods named. Density acceptable. Snippet is complete code, not elided.
