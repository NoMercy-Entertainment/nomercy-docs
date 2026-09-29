# Reader review: /nomercy-player-core/recipes/swap-an-adapter

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/recipes/swap-an-adapter.mdx

Reviewed-SHA: 14398b6046120f37

## Four criteria checks

**1. Every term explained at or before first use**

Prerequisite: /nomercy-player-core/recipes/custom-url-resolver. New terms: `cls IndexedDBBackend`, `cls LocalStorageBackend`, `cls MemoryStorageBackend`, `key storage` on setup.

Each backend's role is clear in export table: "Default. Sync. Falls back to memory when blocked" etc.

Methods (get, set, remove, getJSON, setJSON) are stated and explained as shared across all three.

**2. Reader can do the task from page alone**

Task: Replace default storage adapter at setup with IndexedDB.

Steps: 1) Import IndexedDBBackend, 2) Pass new IndexedDBBackend(...) on key storage in setup, 3) Plugins use this.storage methods without knowing which backend is active.

Reader can complete this recipe from the page. The caveat "When IndexedDB is missing, reject with core:policy/indexedDBUnsupported" teaches fallback thinking.

**3. Code examples don't lean on missing content**

Snippet shows sample plugin writing/reading JSON through storage surface. The code is self-contained; no unneeded scaffolding.

"The sample plugin writes and reads JSON through that same surface" clarifies the code.

**4. No sentence needs second read**

Clear language. "Sync backends resolve at once under `await`" clearly states behavior.

## Findings

None. Page passes all criteria.
