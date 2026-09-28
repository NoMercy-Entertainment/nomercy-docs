# Fact check: /nomercy-player-core/handbook/i18n
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/i18n.mdx
Reviewed-SHA: 6ce865e30c5159d1

Source: `packages/player-web/nomercy-player-core/src/index.ts` (public re-exports); `adapters/translator/translator.ts` (`DefaultTranslator`, miss → `onMissingTranslation` → key); `adapters/translator/loaders/translations-glob.ts`; `adapters/translator/loaders/translation-loader.ts` (`createNetworkTranslationLoader`); `adapters/language-matcher/bcp47.ts`; `i18n/en.ts` / `i18n/nl.ts`; `core/mixins/plugin-registration.ts` / `core/plugin-translations.ts` / `core/mixins/i18n.ts`; `core/plugin/base.ts` (`t`, `loadTranslations`). Example: `src/examples/core-handbook-i18n.ts` (`https://api.example.com/i18n/{lang}.json`, not `cdn.example.com`). Method: read page, example, and package root exports; SHA256 of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. British spelling: none (US `behavior`). Snippet: `live="false"`. Sentence and paragraph word gates: all sentences ≤30 words, all paragraphs ≤60 words. Table data rows: 4 (≤6). Page points day-to-day `language` / `t` / `addTranslations` at the tour; does not re-teach them.

## Gate checks

| Gate | Result |
| --- | --- |
| Public exports named on page | Pass (`index.ts`: `DefaultTranslator` `:177`; `translationsFromGlob` `:173`; `createNetworkTranslationLoader` `:167`; `enTranslations` / `defaultTranslations` `:301`; `nlTranslations` `:302`; `bcp47FallbackChain` `:43`; types `ITranslator` `:181`, `Translations` / `TranslationLoader` `:395-396`; `i18nMethods` `:192`) |
| Example URL host | Pass (`core-handbook-i18n.ts:71` → `api.example.com`) |
| Does not re-teach `language()` / player `t()` | Pass (defers to tour `:14`; plugin `t` prefix only) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:54`) |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass |
| Table data rows ≤ 6 on page | Pass (4 rows `:22-25`) |
| British spelling | Pass |
| Claims match plugin i18n + loaders | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Import listed names from package root | `index.ts` exports above | Supported |
| `DefaultTranslator` is built-in engine for live table | `translator.ts:18-33` | Supported |
| `translationsFromGlob` builds `Translations` from per-tag modules | `translations-glob.ts:42-79` | Supported |
| `createNetworkTranslationLoader` fetches one JSON URL per tag | `translation-loader.ts:65-71` | Supported |
| `enTranslations` / `defaultTranslations` / `nlTranslations` roles | `en.ts` map + `{ en: ... }` wrapper `:87-89`; `nl.ts` | Supported |
| `bcp47FallbackChain` parents, most specific first | `bcp47.ts:11-26`; example `:67` | Supported |
| `ITranslator` / `Translations` / `TranslationLoader` type shapes; `i18nMethods` mixin | `index.ts:179-192,395-396` | Supported |
| Static `translations` merges at registration; keys need `plugin.<id>.` | `plugin-registration.ts:395-418`; `base.ts:242-255`; `i18n.ts:117-119` | Supported |
| Registration walks ancestors; subclass ships its own keys | `plugin-translations.ts:14-54`; `plugin-registration.ts:395-399` | Supported |
| Dispose removes `plugin.<id>.` only when static `translations` present | `plugin-registration.ts:332-334`; `base.ts:961-963` | Supported |
| Lazy glob: active tag + parents at registration and language switch | `plugin-translations.ts:16-19,79-89`; `i18n.ts:156-173` | Supported |
| Plugin `t` prepends `plugin.<id>.`; vars for `{name}`; miss → `onMissingTranslation` → namespaced key | `base.ts:941-952`; `translator.ts:23-26,74-76` | Supported |
| `loadTranslations` bare keys namespaced; `undefined` = no bundle; network loader as setup `loadTranslations` | `i18n.ts:185-201`; `base.ts:955-976`; `translation-loader.ts:14-24`; example `:57-64,70-72` | Supported |
| Example: static bundles, plugin `t`, `loadTranslations('fr')`, `bcp47FallbackChain`, `defaultTranslations`, network loader, language switch | `core-handbook-i18n.ts` | Supported |
| Next: Listening handbook path | Path as written: `/nomercy-player-core/handbook/listening` | Supported |
