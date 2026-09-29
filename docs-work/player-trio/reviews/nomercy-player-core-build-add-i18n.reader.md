# Reader review: /nomercy-player-core/build/add-i18n

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/build/add-i18n.mdx

Reviewed-SHA: e82914203ba6724b

## Review summary

Page opens with two use cases: status text after compose, and plugin-shipped labels. First paragraph names the English strings and points to the i18n tour for day-to-day lookups.

**English That Ships**: Defines enTranslations and defaultTranslations, names the key shape (core.<feature>.<message>), and explains passing language/translations into setup. Clear table with roles.

**Plugin Strings**: Short explanation of placing translations on the plugin class, with keys pre-using the plugin.<id>. prefix, then merging at registration. Table with clear roles. The fn t helper is explained with the caveat that it prepends the prefix.

Voice and density match add-a-plugin (prerequisite). No repetition of plugin structure—this page adds translation scoping and merging on top of the prior plugin shipping shape.

Snippet provided via directive, not elided. No undefined terms.
