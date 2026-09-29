# Reader: /nomercy-player-core/handbook/i18n
Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/handbook/i18n.mdx

Reviewed-SHA: 4e50554521c85520

## Undefined key terms

The page uses several terms without introduction:

1. **"tag"** — Used repeatedly ("active tag" line 39, "per-tag modules" line 23, "one tag per bundle" implied) but never defined. Is it a language code? A locale?

2. **"BCP-47"** — Line 27 mentions "`fn bcp47FallbackChain` returns parent tags for a BCP-47 value" with no explanation of what BCP-47 is. (Standard: language tags like "en", "en-US", "pt-BR".)

3. **"namespace"** — Line 34 says "Keys inside the bundle must already use the `plugin.<id>.` prefix" and line 50 says "the player namespaces them". What is namespacing? Why is it needed?

4. **"placeholders"** — Line 44 says "when the stored string has `{name}` placeholders" but doesn't explain what placeholders are or how they work.

## Code example gap

Line 57 states "The host in the sample stands for your own API" but the sample (referenced in line 54 as a snippet) is not rendered on this page. The reader encounters a forward reference to an example they cannot yet see, breaking the reading flow.

## Task clarity

The opening task is "Ship plugin strings with the public i18n exports." But the page does not state upfront what steps are needed. Instead, it lists exports (lines 16-29), then sections on bundles, lookup, and loading (lines 31-52). A reader must infer the workflow: create a Translations object, assign it to a Plugin subclass, look it up with `fn t`. No step-by-step task description is given.

## Density and reference style

Lines 20-29 present a reference table with names and roles. Line 27 is particularly dense:

> `fn bcp47FallbackChain` returns parent tags for a BCP-47 value, most specific first. `cls ITranslator`, `cls Translations`, and `cls TranslationLoader` type those shapes. `key i18nMethods` is the mixin chunk you compose onto a player class.

Three unrelated concepts in three sentences. BCP-47 is undefined; the type names are listed without context.

## Dependency on tour page

Line 14 redirects: "Day-to-day `fn language`, `fn t`, and `fn addTranslations` stay on the [i18n tour]." This suggests the page is an advanced reference, but it does not state that upfront. The opening does not position this as "for advanced use" or "see the tour first."

## Why FAIL

A reader cannot ship plugin strings from this page alone. Key terms (tag, BCP-47, namespace, placeholders) are undefined. The code example is referenced but not shown. The task steps are not stated; only sections and API names are listed. A developer would need to read the tour page, understand the snippet when it finally appears, and infer the workflow.
