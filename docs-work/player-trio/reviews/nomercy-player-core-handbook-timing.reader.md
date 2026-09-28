# Reader: /nomercy-player-core/handbook/timing

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/timing.mdx

Reviewed-SHA: e116ad7f1b714ace

## Same-voice comparison (approved: tour/queue)

Both pages assume a composed **`player`** and teach behavior in short sections with the same doc typography (`fn`, `key`, `str`). Queue opens with the split between editing the list and starting playback; this page sends playback seconds to **[Time](/nomercy-player-core/tour/time)** and defines **timing** as when the level changes—position, mute, and the curve into gain—then names APIs with one inline block per cluster.

Queue’s cancellable **`fn item`** move has a parallel in **Read and set the level**: **`str beforeVolume`**, **`str volumePrevented`**, and **`str volume`** with **`key level`**, plus the note that the backend receives position divided by 100. **The curve into gain** is the dedicated math section: formula, table, and why square-law beats a linear map for loudness. **Mute without losing the level** mirrors queue’s explicit no-op and lifecycle rules: stored position, getter reads **`0`** while muted, auto-unmute when setting a level above **`0`**, and **`str beforeMute`** / **`str mutePrevented`** / **`str mute`** with **`key muted`**.

**Next** is a single build link after the snippet, not a recap.

## Snippet

`core-handbook-timing.ts` (via `:::snippet{file="core-handbook-timing" live="false"}` before **Next**). It builds a handbook player with **`composeMixins`**, **`setup`**, and **`await player.ready()`**, wires **`volume`** and **`mute`** listeners, runs volume helpers, logs **`perceptualGain`** samples, then mute/unmute/toggle. The MDX does not name **`composeMixins`**, **`ready`**, or the handbook class name; judgment below is for the MDX page only.

## Reader notes (JavaScript background, player already composed)

I read the page in order without opening player source, assuming I already have a composed class from Quick Start and compose-methods.

The opening separates playback seconds (**Time** tour) from this page’s topic and states that **timing** here means when the level changes: the position you set, mute, and the curve that becomes gain.

**Read and set the level** states the scale: **`fn volume`** with no argument returns **`0`..`100`**; while muted the read is **`0`** even though a level is stored. The setter clamps, returns a **`Promise`** I can await, and **`fn volumeUp`** / **`fn volumeDown`** step by five unless I pass a step (no promise). Cancel path and **`str volume`** payload are named after volume is introduced.

**The curve into gain** defines **`fn perceptualGain`**: linear **`0`..`1`** position in, **`0`..`1`** gain out, square law **`gain = position²`**, with clamping and a table. Prose explains log loudness and why the public **`fn volume`** API stays on **`0`..`100`** while the curve runs where gain is written for the backend.

**Mute without losing the level** covers **`fn mute`**, **`fn unmute`**, **`fn toggleMute`**, cancel events, idempotent mute/unmute, and unmute-on-set when dragging the slider above zero.

Doc typography matches queue. The prose stays on player behavior; it does not describe the doc site or this page as an artifact.

## Friction (does not fail the rubric)

**Backend** is used for “writes gain” and “position divided by 100” without defining which adapter or element that is; I still know the split between slider position and gain. **`perceptualGain`** is a standalone function in the snippet import, not a **`player.`** method—the MDX presents it as **`fn perceptualGain`** in the curve section. Event-bus **`fn on`** is assumed from prior tour material. **Gain** is named in the opening before the curve section fully defines it; the curve section completes that picture.

## Why PASS

Under the stated fail conditions: **Timing** is explained in the opening (when the level changes, tied to position, mute, and curve); names I need for the volume/mute path appear before or as they are used in API sections; and I can state the volume scale (**`0`..`100`**, clamp, muted getter **`0`**), mute behavior (stored level, silence, restore, toggle, cancel events), and what the curve does (square **`0`..`1`** position to gain, why, and where it applies).
