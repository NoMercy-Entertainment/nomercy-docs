# Reader: /nomercy-player-core/plugins-adapters/adapter-id-generator

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-id-generator.mdx

Reviewed-SHA: dc1795e836c94d2a

## Checking against PASS criteria

- **Every term explained:** IIdGenerator is introduced as "a string ID", next() returns a string. crypto.randomUUID() is mentioned but it's a standard browser API for generating UUIDs. The fallback "base 36" encoding is explained in context.
- **Reader can do the task:** The task is to "mint unique string IDs". The page shows how to implement IIdGenerator, and the interface is clear (one member: `fn next` returns `string`).
- **No code example leans on unexplained things:** The example shows a counter implementation that's self-contained.
- **No sentence needs a second read:** All sentences are clear and direct.

The page teaches IIdGenerator well. A reader knows when to use it (when your own code needs fresh IDs), how to use it (call fn next), and how to implement it (return different strings).

