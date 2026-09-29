# Reader: /nomercy-player-core/plugins-adapters/adapter-lifecycle-registry

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-lifecycle-registry.mdx

Reviewed-SHA: 8cdb78625e5d4a9f

## Findings

### Contradiction about isDisposed

The page states on line 32:

> Every method stays safe after `fn dispose`, so you never check `fn isDisposed` first.

Then on line 69 in the Interface section:

> | `fn isDisposed` | Whether `fn dispose` has run. |

**Cost to reader:** This creates confusion. If I "never check isDisposed first", why does the interface document it as a member? Is there a use case for isDisposed that the text doesn't explain? The page tells me not to use it, but then documents it as part of the public interface.

**Fix:** Either:
1. Explain when isDisposed *is* useful (e.g., "You may check isDisposed before logging or in defensive code, though it's rarely needed since methods stay safe after dispose")
2. Or clarify that isDisposed is documented for reference but the intended pattern is to rely on dispose making methods no-op safe

### Undefined browser API references in the "Built-in adapter" section

The section mentions:
- "DOM listeners"
- "timeouts, intervals and frame loops"
- "observers"
- "controllers"

These reference browser/Web APIs (addEventListener, setTimeout, setInterval, requestAnimationFrame, ResizeObserver/MutationObserver/IntersectionObserver, AbortController) but don't name them explicitly. A reader unfamiliar with these might not connect the dots.

**Cost to reader:** A reader new to these browser APIs might not understand what "observer" or "controller" means. The page should say "ResizeObserver, MutationObserver, etc." to make the connection clear.

