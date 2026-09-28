# Reader: /nomercy-player-core/tour/i18n

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/i18n.mdx

Reviewed-SHA: cdea9c4f49888493

## Same-voice comparison (reference: tour/queue)

Both pages open with when-to-use framing and a short split between operations (queue: list vs playback; i18n: lookup vs language switch, merge before first lookup). Sections use the same `##` rhythm, `fn` / `key` / `str` typography, inline ` ```ts ` blocks for the common path, and a non-live snippet before **Next**. Queue stays on cursor and load ordering; i18n stays on tags, keys, bundles, and merge order. Tone is imperative and behavior-first, without meta commentary about the doc site.

## Snippet

`core-tour-i18n.ts` (via `:::snippet{file="core-tour-i18n" live="false"}` before **Next**). It builds an `I18nTourPlayer` with `composeMixins`, `setup({ language: 'en' })`, `await ready()`, merges demo keys with `addTranslations`, logs `t` for a custom key and a built-in `core.state.*` key, switches with `await language('nl')`, confirms `language()` and Dutch `t`, and shows a missing-key fallback. It does not demonstrate placeholder maps on built-in keys, the class form of `t`, `translation` / `removeTranslations`, language events, or plugin `loadTranslations`. Judgment below is for the MDX page plus how the snippet supports the main path.

## Reader notes (JavaScript background, player already composed)

I read the page in order without opening player source, assuming a composed player like Quick Start and other tour pages.

The opening states that UI text follows a language tag, that reading a key and switching language are separate calls, and that I should merge my strings before the first lookup. That matches the example file order.

**Look up a key** defines `fn t` with a built-in key example, miss behavior (key echoed back), optional `{name}` substitution via a second map, and the plugin class form that prefixes `plugin.<id>.` automatically. I know how to resolve a string for the active language.

**Set the language** defines `fn language()` for the active BCP-47 tag and `await player.language(tag)` to switch, with why to await (bundles for the tag and parents). English is synchronous; other built-ins load on demand. The import block names `enTranslations` vs `defaultTranslations` and ties the wrapped shape to `key translations`. The paragraph on `str beforeLanguage`, `preventDefault`, `data.lang`, `str languagePrevented`, and `str language` describes cancellable switches without requiring them for basic use.

**Add your own strings** covers `fn addTranslations`, single-entry `fn translation`, and prefix wipe via `fn removeTranslations`, with a merge example aligned to the snippet.

**Plugin bundles on a switch** orients plugin authors on static `key translations`, instance `fn loadTranslations`, namespacing, and once-per-tag loading—optional after the player API above.

## Friction (does not fail the rubric)

`data.lang` appears in the language-events paragraph without naming it as the `beforeLanguage` listener payload or showing a handler signature; I infer it from the surrounding event names and `preventDefault`. `key translations` is described as a shape but the page does not show passing it through `setup`—only `addTranslations` at runtime. The class form of `t` and plugin hooks are named without examples. Section order teaches lookup and switch before merge even though the intro recommends merge first; the snippet and **Add your own strings** close that loop.

## Why PASS

I can switch language with `await player.language(tag)` and read the active tag with `player.language()`, and I can look up strings with `player.t(key)` plus an optional placeholder map, with merge via `addTranslations` spelled out before relying on custom keys. Core symbols (`t`, `language`, `addTranslations`) are introduced where they are taught, with examples and a matching snippet. Under the stated fail conditions, this passes.
