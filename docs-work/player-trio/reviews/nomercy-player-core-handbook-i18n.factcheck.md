# Fact check: /nomercy-player-core/handbook/i18n
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/i18n.mdx
Reviewed-SHA: 4e50554521c85520
Previous verdict: PASS; fixes verified: none (no finding was open). The one added sentence, page line 57 "The host in the sample stands for your own API.", is checked below.

Source: nomercy-player-core `src` at `e3d2de5`. Example `src/examples/core-handbook-i18n.ts` (unchanged; commit `e029a04` added only page line 57).

Method: re-read the whole page and the example. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo): `tsc` exit 0. The snippet has no `lines=` attribute (whole file), so there is no lock entry to compare. The example was not run.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L18-29 every listed name is on the package root | `src/index.ts:43` (`bcp47FallbackChain`), `:167` (`createNetworkTranslationLoader`), `:173` (`translationsFromGlob`), `:177` (`DefaultTranslator`), `:181` (`ITranslator`), `:192` (`i18nMethods`), `:301` (`defaultTranslations`, `enTranslations`), `:302` (`nlTranslations`), `:395-396` (`TranslationLoader`, `Translations`) | Supported |
| L33-35 static `translations` merge at registration; keys carry `plugin.<id>.`; ancestors walked | `src/core/mixins/plugin-registration.ts:395-418`; `src/core/plugin-translations.ts:38-54` (prototype walk) | Supported |
| L36 dispose removes `plugin.<id>.` only with the static field | `plugin-registration.ts:332-334` | Supported |
| L38-39 lazy glob: active tag and parents, at registration and on language switch | `plugin-translations.ts:14-18,79-89`; `src/core/mixins/i18n.ts:143,157-176` (walks `langChain`, skips loaded tags) | Supported |
| L43-45 plugin `t` prefixes `plugin.<id>.`; vars; miss goes to `onMissingTranslation`, then the key | `src/core/plugin/base.ts:946-952`; `src/adapters/translator/translator.ts:74-80` | Supported |
| L49-51 `loadTranslations` returns bare keys, namespaced by the player; `undefined` for no bundle | `i18n.ts:185-201` (`plugin.${pluginId}.${key}`, `if (!bundle) continue`); `base.ts:955-976` | Supported |
| L52 `createNetworkTranslationLoader` as setup `loadTranslations` | `src/adapters/translator/loaders/translation-loader.ts` (as in previous review) | Supported |
| L57 the host stands for your own API | the only host in the example is `https://api.example.com/i18n/{lang}.json` (example line 71) | Supported |
| L61 Next: Listening | `handbook/listening.mdx` exists | Supported |
