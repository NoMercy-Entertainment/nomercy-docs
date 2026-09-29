# Fact check: /nomercy-player-core/recipes/swap-an-adapter
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/recipes/swap-an-adapter.mdx
Reviewed-SHA: 198f4501e518a2b0

Source: nomercy-player-core at `5ed4538` (toolchain.md). The checkout is at `e3d2de5`; `git diff --stat 5ed4538 e3d2de5 -- src` is empty, so the source read is the same. Files: `src/adapters/storage/IStorage.ts`, `indexed-db.ts`, `local-storage.ts`, `memory.ts`, `index.ts`; `src/core/plugin/base.ts`; `src/types/config.ts`; `src/core/mixins/plugin-registration.ts`; `src/core/mixins/lifecycle.ts`; `src/index.ts`. Example: `src/examples/core-recipes-swap-an-adapter.ts`. Code-span kinds: `src/lib/mdx/rehype.ts:102-129`.

Method: read page, example and sources. Ran `npm run check:examples` in the worktree: `tsc` exit 0, `Autoplay OK: 127 example files checked.` The example was not run in a browser (not checked at runtime). No URLs on the page or in the example.

## Findings

1. Page line 31: "Plugins call `fn this.storage`". `this.storage` is a field, not a function: `protected storage!: IStorage;` (`src/core/plugin/base.ts:276-277`), set in `initialize` (`base.ts:303-304`). The `fn` tag renders a name as "a function or method" (`src/lib/mdx/rehype.ts:121-125`), and "call" tells the reader to call it. `this.storage()` does not exist. Fix: "Plugins use the methods on `this.storage` and do not name which backend is active." (no `fn` tag; the site has no property tag).

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Swap is a field on `setup`; storage swap via `setup({ storage })` | `IStorage.ts:14`; `types/config.ts:231-238` | Supported |
| Package root exports `IndexedDBBackend`, `LocalStorageBackend`, `MemoryStorageBackend` | `src/index.ts:144-146`; `adapters/storage/index.ts:9-12` | Supported |
| Omit `storage` and plugins get `LocalStorageBackend` | `base.ts:303` (`config.storage ?? new LocalStorageBackend()`) | Supported |
| LocalStorageBackend: default, sync, falls back to memory when blocked | `local-storage.ts:11-18,24-38`; `IStorage.ts:17` | Supported |
| IndexedDBBackend: opt-in, async, opens the database on first call | `indexed-db.ts:14-21,49-72`; `IStorage.ts:19` | Supported |
| MemoryStorageBackend: in memory, values lost on reload | `memory.ts:11-15` | Supported |
| Plugins call `fn this.storage` | `base.ts:276-277` (field, not function) | Unsupported (finding 1) |
| Each plugin gets a namespaced wrapper, keys stay separate | `base.ts:86-101,304` (prefix `nmplayer-<id>-`) | Supported |
| All three share five methods get/set/remove/getJSON/setJSON | `IStorage.ts:24-42`; each class `implements IStorage` | Supported |
| Await in plugin code either way; sync backends resolve at once under `await` | `IStorage.ts:10-12`; `local-storage.ts:17-18` | Supported |
| Example: pre-setup `addPlugin` then `setup({ storage })` gives the plugin the swapped backend | `plugin-registration.ts:40-44` (pre-setup queue); `lifecycle.ts:348` (`options` set in setup); `plugin-registration.ts:388` (`initialize`) | Supported |
| Example: `IndexedDBBackend({ dbName, storeName })` options | `indexed-db.ts:29-33` | Supported |
| Missing IndexedDB: rejects with `core:policy/indexedDBUnsupported` | `indexed-db.ts:35-47,52-54` | Supported |
| Use LocalStorageBackend or MemoryStorageBackend there | `indexed-db.ts:45` (error suggestion) | Supported |
| Next: Audio output page path | `src/content/nomercy-player-core/en/plugins-adapters/adapter-audio-output.mdx` exists | Supported |

## Notes (not failures)

- Page line 12 "for the whole player": the player itself never reads `storage`; only plugins do (`types/config.ts:233-236`). The page says so for plugins at line 20 and 31, so this is read as setup scope, not a claim that player mixins use it.
- The snippet has no elision marker.
