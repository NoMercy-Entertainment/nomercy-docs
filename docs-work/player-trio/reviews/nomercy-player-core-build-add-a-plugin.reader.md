# Reader review: /nomercy-player-core/build/add-a-plugin
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/build/add-a-plugin.mdx
Reviewed-SHA: 11f9850518c03ec9

**Check 1 - Every term explained at or before first use**: PASS
- "plugin" defined: "extra behavior you add to a player, such as counting each play"
- Link chain at top (lines 15-17) is now clear and separates concerns:
  - [Plugins] → subclassing and lifecycle
  - [Registration] → when addPlugin runs, checks, removal
  - [Timing] → timer helpers a plugin can use
- "use", "on", "emit", "dispose" described with one-line explanations
- Prerequisite pages are explicitly linked

**Check 2 - Reader can do the task from page alone**: PASS
- Task: "Ship a Plugin subclass with static id and description, override use to subscribe, then register it before setup"
- Steps in "What you ship" section: subclass Plugin, set id/description, override use, pass to addPlugin
- "Register, then set up" section: call addPlugin before setup
- Snippets show working examples
- Table clarifies each piece's role

**Check 3 - No code example gaps**: PASS
- Three snippets rendered from core-build-add-a-plugin file (with line ranges or full)
- First: use() with on() and emit()
- Second: addPlugin() registration call
- Third: listening pattern with getPlugin()
- All are complete, not elided

**Check 4 - No sentence needs second read**: PASS
- Opening task description is clear
- The three link sentences now explicitly separate timing from registration
- Step descriptions are direct: "Subclass Plugin. Set a static id..."
- Helper descriptions are one line each
- "Register, then set up" section clearly explains timing

**Summary**: Previous FAIL on missing Timing link and confusing "Registration covers timing" sentence is RESOLVED. The page now explicitly links all three prerequisite pages and separates their concerns clearly. A JavaScript reader can follow the steps, see working examples, and understand the registration and timing flow. PASS.
