# Fact check: /nomercy-player-core/recipes/swap-an-adapter
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/recipes/swap-an-adapter.mdx
Reviewed-SHA: 14398b6046120f37
Previous verdict: FAIL; fixes verified: finding 1 (this.storage is a field)

Source: nomercy-player-core `src/` at `e3d2de5` (equals the pinned `5ed4538` for `src/`). Method: read the previous verdict, the fix diff (`git show b7190ca`), the whole page, its example and the source. `npm run check:examples` (published dist 2.2.1): `Autoplay OK: 127 example files checked.`, exit 0. The example also type-checks against the package source (scratch tsconfig outside the repo, `tsc` exit 0; negative control gave `TS2322`, exit 2). No URLs on the page or in the example.

## Fix verification

| # | Page line | Now says | Source | Status |
| --- | --- | --- | --- | --- |
| 1 | 31 | "Plugins use the methods on `key this.storage`" | `core/plugin/base.ts:276-277` (`protected storage!: IStorage` field), set at `:303-304`; `key` tag is the property color (`src/lib/mdx/rehype.ts:126-128` (`key` entry at `:128`)) | Verified fixed |

## Claim table (fresh)

| Claim | Supported by | Status |
| --- | --- | --- |
| Root exports the three backends | `src/index.ts:144-146` | Supported |
| Omit `storage` and plugins get `LocalStorageBackend` | `base.ts:303` | Supported |
| LocalStorage: default, sync, falls back to memory when blocked | `adapters/storage/local-storage.ts:11-37` | Supported |
| IndexedDB: async, opens the database on first call | `indexed-db.ts:14-21,49-72` | Supported |
| Memory: values lost on reload | `memory.ts:11-15` | Supported |
| Namespaced wrapper per plugin | `base.ts:86-101,304` | Supported |
| Five shared methods | `base.ts:95-99`; `IStorage.ts` | Supported |
| Missing IndexedDB rejects with `core:policy/indexedDBUnsupported`; use the other two | `indexed-db.ts:35-47,52-54` | Supported |
| Link: adapter-audio-output | file exists | Supported |

## New findings

None.
