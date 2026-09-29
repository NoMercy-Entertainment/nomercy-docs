# Reader: /nomercy-player-core/plugins-adapters/adapter-platform

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-platform.mdx

Reviewed-SHA: 6e1437b319e129b3

## Findings

### PIP acronym undefined

Line 53 and throughout the page uses "pip" without expansion:

> `key fullscreen` and `key pip` are for the video player only.

Line 62:

> | `key pip`, `cls IPipController` | `fn enter`, `fn exit`, `fn isActive`, `fn isSupported`, `fn subscribe` |

"PIP" is Picture in Picture, a Web API feature, but the page never defines it.

**Cost to reader:** A reader unfamiliar with browser capabilities doesn't know what `key pip` controls. The API methods (enter, exit, isActive) hint at toggling a feature, but the name is unexplained.

**Fix:** Expand on first use: "`key pip` (Picture in Picture, a feature that floats a video in a corner while browsing)".

### Browser API assumptions not called out

Lines 27-28 reference `window` and `document` without noting these are global browser objects. Line 28 mentions `navigator` directly. Line 30 mentions "wake lock API", lines 31 mention "fullscreen" and "picture in picture".

**Cost to reader:** A reader new to browser APIs might not connect "field" references to JavaScript globals. The text assumes familiarity with web platform concepts.

**Fix:** Not critical, as the assumes column likely includes pages that teach platform basics. However, a note like "These fields read from window, document, and navigator" would clarify.

