# Fact check: /nomercy-player-core/plugins-adapters/adapter-language-matcher
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-language-matcher.mdx
Reviewed-SHA: 6e95c170e4716fa7
Previous verdict: FAIL; fixes verified: finding 1 (the "always uses the default chain" claim is replaced by page lines 15-19; each new sentence checked below)

Source: `nomercy-player-core/src` at `e3d2de5`. Example `src/examples/core-adapter-language-matcher.ts` (unchanged; fix commit `e029a04` touched only the mdx).

Method: re-read the whole page. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo): `tsc` exit 0. Scratch script compared every `lines=` range on the page with `src/examples/snippet-ranges.lock.json` and the example file: 5 of 5 OK. The previous run output (`[ 'zh-Hant-TW', 'zh-Hant', 'zh' ]`, `[ 'pt-BR', 'pt' ]`, `[]`) is not re-run; the source it depends on (`bcp47.ts:17-27`) is unchanged at `e3d2de5`.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12-13 decides the fallback order for one BCP 47 tag | `src/adapters/language-matcher/ILanguageMatcher.ts:16-18`; `bcp47.ts:11-16` | Supported |
| L15 built-in translator walks the default chain on lookup, own and plugin strings | `src/adapters/translator/translator.ts:59-72` (`bcp47FallbackChain(this.currentLanguage)`, then the configured fallback language, default `'en'`, is appended at `:60-62`); plugin keys go through the same `t` (`src/core/mixins/i18n.ts:94-97`) | Supported |
| L16 player walks it to load plugin bundles | `src/core/mixins/i18n.ts:143`; `src/core/plugin-translations.ts:79` | Supported (fix verified) |
| L18 no `languageMatcher` option in `setup` | grep `languageMatcher` over `src`: no hit | Supported |
| L19 your own `translator` in `setup` owns the lookup | `src/types/config.ts:265-269` (`translator?: ITranslator`, "the engine owns translation state"); `src/core/mixins/lifecycle.ts:406-409` replaces `_translator` and returns | Supported (fix verified) |
| L26-28 shipped matcher; strips one trailing subtag on `-`; empty tag gives `[]` | `bcp47.ts:17-26` | Supported |
| L30-31 keeps case and whitespace; `PT-br` does not match `pt-BR` | `bcp47.ts:14-15,17-27` (no normalisation); `translator.ts:66` `this.bundles[lang]` | Supported |
| Imports from `adapters/language-matcher` | `adapters/language-matcher/index.ts`; `package.json:64` | Supported |
| Table: `tag` string; returns `string[]` most specific first | `ILanguageMatcher.ts:17`; `bcp47.ts:20-25` | Supported |
| L51-52 custom matcher wraps the default and ends on English | example lines 23-27 | Supported |
| See also: Lifecycle Registry | `adapter-lifecycle-registry.mdx` exists | Supported |

## Carried note for the reader reviewer

The Custom implementation snippet joins `23-27,31-39,50-51`; the gaps hide `type Bundles` and the bundle data. Unchanged from the previous review; a reader question, not a claim failure.
