# Fact check: /nomercy-player-core/plugins-adapters/adapter-language-matcher
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-language-matcher.mdx
Reviewed-SHA: 3777c7cdf8c79efc

Source: `nomercy-player-core/src/adapters/language-matcher/` (`ILanguageMatcher.ts`, `bcp47.ts`, `index.ts`), `src/adapters/translator/translator.ts`, `src/core/mixins/i18n.ts`, `src/core/plugin-translations.ts`, `src/core/mixins/lifecycle.ts` (`_initTranslator`), `src/types/config.ts`, `src/index.ts`, `package.json` `exports`. Source at `e3d2de5`. Example: `src/examples/core-adapter-language-matcher.ts`.

Method: read the page, the example and every Covers file, plus `lifecycle.ts` and `config.ts` for the `translator` option. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo; `--traceResolution` shows `.../adapters/language-matcher` resolved to `src/adapters/language-matcher/index.ts`): `tsc` exit 0. Ran the example (esbuild bundle aliased to the source, Node): output `[ 'zh-Hant-TW', 'zh-Hant', 'zh' ]`, `[ 'pt-BR', 'pt' ]`, `[]`, `Afspelen`, `Play`, which matches the comments on example lines 19, 20, 21, 50, 51. Ran a case probe (scratch, outside the repo): `new DefaultTranslator({ language: 'PT-br', translations: { 'pt-BR': { play: 'Reproduzir' } }, fallbackLanguage: null }).t('play')` printed `play` (a miss), which proves page lines 27-28. Snippet ranges 16-17, 19-21, 23-27, 31-39, 50-51 match `snippet-ranges.lock.json` (scratch script: OK). Em dash / en dash on page and example: none. Headings carry no code spans. No URLs on the page or in the example.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 15-16 | `src/types/config.ts:269` (`translator?: ITranslator`); `src/core/mixins/lifecycle.ts:406-409` (`if (self.options.translator) { self._translator = self.options.translator; return; }`); `src/core/mixins/i18n.ts:48-51,89-97` (`t` delegates to `_translator.t`) | The page says the player "always uses the default chain" when it looks up a translation. That is true only for the built-in `DefaultTranslator` (`translator.ts:59`). A reader who passes `translator` in `setup` replaces the whole lookup, and the fallback order is then whatever that engine does. The chain is still used to load plugin bundles (`i18n.ts:143`, `plugin-translations.ts:79`), but not for the lookup. The "always" is false. | Replace page lines 15-16 with: "The built-in translator walks the default chain when it looks up a string, for the player's own strings and for plugin strings. The player also walks it to load plugin bundles for a language. There is no `key languageMatcher` option in `fn setup`. To change the lookup order, pass your own `key translator` in `fn setup`: it then owns the lookup." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `ILanguageMatcher` decides the fallback order for one BCP 47 tag | `ILanguageMatcher.ts:9-18` | Supported |
| Player walks the default chain for its own and plugin strings | `translator.ts:59` (`DefaultTranslator.t`); plugin keys go through the same `t` as `plugin.<id>.<key>` (`i18n.ts:94-97`, `plugin/base.ts:951`) | Supported only for the built-in translator; see finding 1 |
| No `languageMatcher` option in `setup`, so the player always uses the default chain | No `languageMatcher` key in `src` outside the adapter folder (grep); but `translator` option replaces the lookup (`lifecycle.ts:406-409`) | FAIL (finding 1) |
| `bcp47FallbackChain` is the shipped `ILanguageMatcher` | `bcp47.ts:17` | Supported |
| Returns the tag, then strips one trailing subtag at a time on `-` | `bcp47.ts:20-26`; run output | Supported |
| Empty tag returns an empty array | `bcp47.ts:18-19`; run output `[]` | Supported |
| Keeps case and whitespace; bundle keys compared byte for byte; `PT-br` does not match `pt-BR` | `bcp47.ts:17-27` (no normalisation); `translator.ts:66` (`this.bundles[lang]`); case probe printed `play` | Supported |
| Both names importable from `adapters/language-matcher` | `adapters/language-matcher/index.ts:9-10`; `package.json` exports `./adapters/language-matcher` | Supported |
| One call signature, no members; `tag: string`; returns `string[]` most specific first | `ILanguageMatcher.ts:16-18`; `bcp47.ts:20-25` | Supported |
| Custom matcher wraps the default and always ends on English | Example `:23-27`; the chain ends on the primary subtag, so an existing `en` is always last; run output `Play` for `fr-CA` | Supported |
| See also: Lifecycle Registry is the next catalog entry | `adapter-lifecycle-registry.mdx` exists; map row 64 Next column | Supported |

## Reported for the reader reviewer (not a claim failure)

The Custom implementation snippet (page line 51) joins ranges `23-27,31-39,50-51`, so it renders two `// ...` gaps (`remark-snippet.ts:496-497,565-566`). The gaps hide `type Bundles` (example `:29`) and the `bundles` data (example `:41-48`). No complete form of either appears earlier on this page. Per the docs rule, data shows only when it is the subject, so this may be intended; the reader reviewer decides.
