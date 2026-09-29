# Reader: /nomercy-player-core/plugins-adapters/adapter-media-list

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-media-list.mdx

Reviewed-SHA: 326d9e20b6c5dde2

## Checking against PASS criteria

- **Every term explained:** "Cursor" is explained as "a current position that survives inserts, moves and removals". Event payload keys like `key items`, `key from` are shown in the event table. `fn get` warns "do not change it, and call fn get again after fn set".
- **Reader can do the task:** The task is to "keep an ordered list with a current position". The usage example shows filling the list, moving the cursor, and handling events. Clear.
- **No code example leans on unexplained things:** The interface table is comprehensive. Events are listed with their payloads. The custom implementation snippet is simple (type against IMediaList).
- **No sentence needs a second read:** All clear. "The cursor keeps its index, so the next item becomes current without an str item event" is precise about what happens on remove.

The page works well as both a concept and a reference. A reader understands what MediaList does, how to use it, and all its members.

