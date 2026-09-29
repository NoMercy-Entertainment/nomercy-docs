# Fact check: /nomercy-player-core/tour/i18n
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/i18n.mdx
Reviewed-SHA: ee73bdc636760fdf

Delta review since 2e9c15c; the full review before it passed.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5`. Method: `git diff 2e9c15c -- src/content/nomercy-player-core/en/tour/i18n.mdx`; every added or changed line checked; the section around each hunk re-read. The pseudo-tags used (`fn`, `var`, `str`, `el`, `attr`, `key`, `cls`, inline `ts`) are all defined in `src/lib/mdx/rehype.ts:102-126` and `:184`.

Snippet type-check: `tsc -p` on a scratch tsconfig outside the repo (paths to the core package SOURCE, as in `tsconfig.examples.json`) over `core-tour-adapters.ts`, `core-tour-i18n.ts`, `core-tour-plugin-base.ts`, `core-handbook-emitting.ts`: `EXIT 0`. Ranges match `src/examples/snippet-ranges.lock.json` (read).

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 60 | `var enTranslations` is a value, flat key-to-string map | `src/i18n/en.ts:22` `export const enTranslations: Record<string, string>` | Supported |
| 61 | `var defaultTranslations` wraps it as `{ en: enTranslations }` | `src/i18n/en.ts:87-88`; root export `src/index.ts:301` | Supported |
| 65 | `var data.lang` (tag only) | unchanged claim, carried | Supported |
| 98 | Snippet `lines="19-20,24-34"`: plugin class head, static `translations` with keys already under `plugin.lyrics.`, instance `loadTranslations` hook whose keys get namespaced | example `core-tour-i18n.ts:19-20,24-34`; static bundles are added as written, no prefix: `src/core/mixins/i18n.ts:159-171` (`this.addTranslations({ [tag]: bundle })`); hook keys prefixed `plugin.${pluginId}.`: `i18n.ts:185-199` | Supported |

## Findings

None.

## Carried from the full review at 2e9c15c


Source: `packages/player-web/nomercy-player-core/src/core/mixins/i18n.ts`; default translator `t` / `translation` in `adapters/translator/translator.ts` and `ITranslator.ts`; English seed via `core/mixins/lifecycle.ts` `_initTranslator` and `i18n/en.ts` (`enTranslations`, `defaultTranslations`); public re-exports in `src/index.ts`. Example: `src/examples/core-tour-i18n.ts`. Method: read page, example, mixin, and default translator; SHA256 of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`. Sentence and paragraph word gates: all sentences ≤30 words, all paragraphs ≤60 words. No tables. Miss behavior not swapped: page states `t` returns the key on a miss; `translation(lang, key)` is only described as a stored-entry read (DefaultTranslator returns `undefined` on miss). Page does not import or point readers at an internal locale loader; public `defaultTranslations` / `enTranslations` only.

### Gate checks

| Gate | Result |
| --- | --- |
| `t` miss returns key; `translation(lang, key)` can be `undefined` (not swapped) | Pass (`translator.ts:58-76,154-162`; page `:18-19` vs `:81-82`) |
| No internal locale-loader import for readers | Pass (public `defaultTranslations`, `enTranslations` only) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:98`) |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass |
| Table data rows ≤ 6 on page | Pass (no tables) |
| Public imports `defaultTranslations` / `enTranslations` | Pass (`src/index.ts:301`; `i18n/en.ts:22,87-89`) |
| Claims supported by `i18n.ts` + DefaultTranslator | Pass |

### Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `t(key)` returns active-language string; miss returns the key | `i18n.ts:75-91`; `translator.ts:58-76` | Supported |
| Optional second map substitutes `{name}` placeholders | `translator.ts:78-80`; page example matches `en.ts` `core.a11y.playing` | Supported |
| Class form of `t` namespaces under `plugin.<id>.` | `i18n.ts:82-97` | Supported |
| `language()` returns BCP-47 tag; `language(tag)` is a promise after chain loads | `i18n.ts:100-142`; `translator.ts:91-107` | Supported |
| English core strings seeded without fetch; other built-ins lazy | `lifecycle.ts:396-435`; `en.ts` | Supported |
| Import `{ defaultTranslations, enTranslations }` from package root | `src/index.ts:301`; `en.ts:87-89` | Supported |
| `beforeLanguage` / `preventDefault` → `languagePrevented`; `data.lang` redirect; then `language` | `i18n.ts:132-140,210` | Supported |
| `addTranslations` merges overwrite/retain; `translation` read/write; `removeTranslations` by prefix | `i18n.ts:214-246`; `translator.ts:138-179` | Supported |
| Plugin static `translations` per BCP-47 chain; instance `loadTranslations` for target tag; hook keys namespaced; once per plugin+tag | `i18n.ts:115-124,156-207` | Supported |
| Example: `addTranslations`, `t` hit/miss, `language('nl')`, dispose | `core-tour-i18n.ts:68-82` | Supported |
