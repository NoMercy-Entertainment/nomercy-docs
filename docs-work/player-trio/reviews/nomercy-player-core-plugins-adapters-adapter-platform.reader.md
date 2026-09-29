# Reader review: /nomercy-player-core/plugins-adapters/adapter-platform

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-platform.mdx

Reviewed-SHA: 4d0d2f93dbbf4b8f

## Four criteria checks

**1. Every term explained at or before first use on this page or prerequisite pages**

Prerequisite page from map: /nomercy-player-core/plugins-adapters/adapter-media-list.

Terms on this page: `cls IPlatform`, browser APIs (window, document, navigator), wake lock, fullscreen, picture in picture, network types, visibility.

Line 31 expands PiP: "`fn enter` on fullscreen and picture in picture (PiP, the browser feature that floats a video in a small window while the user browses elsewhere) throws the matching `str core:policy/` error where the API is missing."

Lines 27-28 reference browser globals and APIs: "Without `window` or `document`, `fn isOnline`, `fn isVisible` and each `fn subscribe` return safe values. `fn type`, `fn downlinkMbps` and `fn rttMs` read `navigator` directly and throw where it is missing."

All terms are explained or contextually clear.

**2. Reader can do the task from page alone**

Stated task: Swap the browser primitives the player reads through one IPlatform bundle.

Steps on page: Read the default bundle, replace one controller, keep the rest. The interface documents each controller. A reader can follow.

**3. Code examples don't lean on missing content**

Snippets show reading the platform and custom implementation swapping one controller. Self-contained.

**4. No sentence needs second read**

The page is clear. Browser APIs are named when used.

## Why PASS

Previous findings are resolved: PIP acronym is now expanded and explained (line 31). Browser APIs are named explicitly (window, document, navigator) with context about their use. No new findings.

