# Reader: /nomercy-player-core/tour/i18n

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/i18n.mdx

Reviewed-SHA: ee73bdc636760fdf

## Terms explained before first use

- "i18n" — acronym in title; the opening states "when UI text must follow a language tag", defining the purpose (internationalization) without saying the word
- "language tag" — used (line 12, 37, 44); explained by example as BCP-47 format ('en', 'pt-BR')
- "key" — line 18 "fn t takes a key"; context makes clear it is a string identifier for a translation
- "placeholder" — line 25 "template has {name} placeholders"; shown in example "{name}" syntax
- "BCP-47" — line 37 "active BCP-47 tag"; technical but with examples ('en', 'pt-BR')
- "bundle" — line 44, 51; context suggests it is a language-specific collection of translations

## Reader can do the task

The task: look up translated strings, switch language, add custom translations. Page provides:
- How to look up: t(key) returns string for active language (line 18)
- With placeholders: t(key, { name: value }) (lines 25-26)
- How to check language: language() returns active tag (line 37)
- How to switch: await language(tag) (lines 43-44)
- Why await: bundles load (line 44)
- How to add custom strings: addTranslations({ en: { key: string }, nl: { key: string } }) (lines 70-78)

A reader can perform all three tasks.

## Code does not hide needed info

- Lines 22, 29: t() examples with and without placeholders
- Line 40: language() example
- Line 47: await language(tag) example
- Lines 75-78: addTranslations() with multi-language map
- Snippet will expand (lines 98) to show concrete player setup and usage

## No sentence needs a second read

Lines 37-44 explain language() and await reason clearly. Line 62-66 on language events is dense but each event is named and its role stated. Line 92-96 on plugin bundles is advanced but each concept has its own sentence.

## Why PASS

The reader understands how to get/set language, look up translations with optional placeholders, and merge custom strings before first use. Core methods (t, language, addTranslations) are introduced and exemplified. Advanced paths (plugin hooks, language events) are named but optional for basic use.
