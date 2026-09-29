# Reader review: /nomercy-player-core
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/introduction.mdx
Reviewed-SHA: a0614ce7fee6c4b2

**Check 1 - Terms explained at or before first use**: PASS
- "plugin" defined in opening sentence: "A plugin is extra behavior you add to a player, such as counting each play"
- "token" explained contextually: "add a token to requests your server requires"
- "subscribe" introduced as a capability: "you can subscribe to what it does"
- "setup" shown as a function: `fn setup`
- No unexplained terms

**Check 2 - Reader can do the task from the page alone**: PASS
- Task: when to install Player Core vs video/music players, and when to build your own player
- Page answers clearly: use video player if video only, music player if music only, install Core if writing a plugin or building your own player

**Check 3 - No code example gaps**: PASS
- No code examples on this page, only reference to `fn setup` function which is clear from context

**Check 4 - No sentence needs a second read**: PASS
- All sentences are clear on first reading
- Longest sentence: "It keeps the ordered list of things to play, it can add a token to requests your server requires, and you can subscribe to what it does" — carries three related concepts about what Player Core does; clear structure

**Summary**: A TypeScript developer new to this library knows when to install Core, when to use the ready-made players, and that Quickstart is the next step. PASS maintained.
