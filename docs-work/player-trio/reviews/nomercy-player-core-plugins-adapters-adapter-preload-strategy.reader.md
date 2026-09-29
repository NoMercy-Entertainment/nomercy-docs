# Reader: /nomercy-player-core/plugins-adapters/adapter-preload-strategy

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-preload-strategy.mdx

Reviewed-SHA: bfb55a42638bd8c5

## Checking against PASS criteria

- **Every term explained:** PreloadContext is defined (line 63) as holding currentTime, duration, nextItem. PreloadAsset is defined (line 64) as holding url, category string, optional mode. The events are listed with payloads. "HEAD request" and "no-cors mode" are HTTP/fetch concepts but clear enough in context.
- **Reader can do the task:** The task is to "change when the next queue item warms up, or which of its assets are requested". The interface shows shouldPreload and assetsToPreload — two clear decision points. The usage section explains when each is called.
- **No code example leans on unexplained things:** The interface definitions come before the code. The pattern of answering yes/no on time events is clear.
- **No sentence needs a second read:** All clear. "The player asks fn shouldPreload on every str time event until the first yes" is precise.

The page explains preloading well. A reader understands what a preload strategy is, when it fires, what it can decide, and how to implement one.

Note: Line 65 references a GitHub issue #18 about an unused `key mode` field — this is fine for a catalog page noting gaps.

