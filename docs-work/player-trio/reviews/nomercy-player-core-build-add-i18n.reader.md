# Reader review: /nomercy-player-core/build/add-i18n

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/build/add-i18n.mdx

Reviewed-SHA: e82914203ba6724b

## Four criteria checks

**1. Every term explained at or before first use**

Prerequisite: /nomercy-player-core/build/add-a-plugin. All new terminology is explained.

Terms: `enTranslations` ("flat English map"), `defaultTranslations` (wraps as `{ en: ... }`), `language` (setup option), `translations` (setup or plugin property), `fn t` ("prepends plugin.<id>. for you"). All clear on first use.

**2. Reader can do the task from page alone**

Task: Ship plugin labels with static translations on the plugin class.

Steps: 1) Import defaultTranslations if needed, 2) Add static translations property to plugin subclass with keys using plugin.<id>.* format, 3) Registration merges it, 4) Use fn t(shortKey) in plugin code.

Reader can complete all steps from this page.

**3. Code examples don't lean on missing content**

Snippet shows plugin translations example. No code scaffolding beyond what's needed for the lesson.

**4. No sentence needs second read**

Clear direct language throughout. "Registration merges that map into the live table" is cause-then-effect.

## Findings

None. Page passes all criteria.
