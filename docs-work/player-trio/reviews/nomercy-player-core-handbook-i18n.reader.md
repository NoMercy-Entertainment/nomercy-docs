# Reader: /nomercy-player-core/handbook/i18n

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/i18n.mdx

Reviewed-SHA: 6ce865e30c5159d1

## Same-voice comparison (reference: tour/queue)

Like [The Queue](/nomercy-player-core/tour/queue), the page is behavior-first and imperative: short `##` sections, the same `fn` / `key` / `cls` typography, and a non-live snippet immediately before **Next**. Queue teaches list edits versus playback with inline ` ```ts ` blocks; this handbook page orients plugin authors on package-root exports, static bundles, instance lookup, and async loading, and it defers day-to-day `fn language`, `fn t`, and `fn addTranslations` to the [i18n tour](/nomercy-player-core/tour/i18n). The opening matches other handbook pages (plugin defined in plain language before mechanics). The main voice difference is a root export table instead of queue’s step-by-step inline calls—appropriate for a handbook slice, still in the same direct tone as queue.

## Snippet

`core-handbook-i18n.ts` (via `:::snippet{file="core-handbook-i18n" live="false"}` before **Next**). It imports `Plugin`, `Translations`, `bcp47FallbackChain`, `createNetworkTranslationLoader`, and `defaultTranslations` from `@nomercy-entertainment/nomercy-player-core`, defines `LyricsPanelPlugin` with static `translations` (full `plugin.<id>.*` keys), uses `this.t` with bare keys and a vars map, overrides `loadTranslations` for French bare keys, logs `bcp47FallbackChain` and `defaultTranslations`, builds a `createNetworkTranslationLoader` instance, composes a minimal player with `playerCoreMethods`, registers the plugin, switches `en` → `nl` → `fr`, and disposes. It does not assign `translationsFromGlob` to a static field or pass `createNetworkTranslationLoader` into `setup({ loadTranslations })`; judgment below is for the MDX page plus how the snippet supports the paths the prose emphasizes.

## Reader notes (JavaScript background, player already composed)

I read the page in order without opening player source, assuming I already know how to compose a player and that plugin basics come from the tour or [registration](/nomercy-player-core/handbook/registration).

The first paragraph defines **plugin** before the page relies on `cls Plugin`, static bundles, and `this.t`. It points me at the i18n tour for player-level APIs so this page can stay on shipping plugin strings.

**Names on the package root** states the import path once—`@nomercy-entertainment/nomercy-player-core`—and the table gives each export a one-line role. For **bundles**, I know to import `cls Translations` (type) for inline maps, `fn translationsFromGlob` for per-tag modules, and the built-in `key enTranslations`, `key defaultTranslations`, and `key nlTranslations` when I need those maps. For **loaders**, I know to import `fn createNetworkTranslationLoader` for player-wide CDN JSON and that plugin-side loading is `fn loadTranslations` on the subclass, not a separate package export. Supporting types (`cls ITranslator`, `cls TranslationLoader`) and `key i18nMethods` are named with enough context that I know they are types or compose-time mixins, not mystery symbols.

**Static bundles on the class** explains `key translations` on a `cls Plugin` subclass: keys must already include `plugin.<id>.`, ancestor merge at registration, and dispose scoping. `fn translationsFromGlob` is tied to lazy fetch on registration and language switch.

**Look up from the instance** covers plugin `fn t`, optional vars, and miss behavior via `key onMissingTranslation` then the namespaced key.

**Load after use** covers overriding `fn loadTranslations` (bare keys, `undefined` when empty) and wiring `fn createNetworkTranslationLoader` as setup `key loadTranslations` for player-wide fetches.

## Friction (does not fail the rubric)

- `key onMissingTranslation` appears only in the miss chain; the page does not say it lives on setup config (reference/config names the shape). I still understand it as an optional fallback hook, not an unexplained export.
- `fn translationsFromGlob` and setup `loadTranslations` are named in prose and the table but not shown in an inline import or assignment block in the MDX; the snippet demonstrates static literals, override `loadTranslations`, and constructing a network loader without passing it to `setup`.
- `cls DefaultTranslator` and the built-in locale keys are listed for completeness; the snippet only touches `defaultTranslations` and not `enTranslations` / `nlTranslations`.

## Why PASS

I can tell what to import from the package root for inline static bundles (`Translations`), glob-backed bundles (`translationsFromGlob`), built-in maps (`enTranslations`, `defaultTranslations`, `nlTranslations`), and the network loader (`createNetworkTranslationLoader`), with plugin async loading documented as an override rather than an import. Named exports in the table and sections are given roles before the page asks me to use them, and **plugin** is defined in the opening. Under the stated fail conditions (unexplained names; unclear imports for bundles and loaders), this passes.
