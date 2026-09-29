# Reader: /nomercy-player-core/tour/volume

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/volume.mdx

Reviewed-SHA: 0c8f8126ec7c5922

## Checking against PASS criteria

- **Every term explained:** "Volume" is explained as slider position 0-100. "Mute" keeps that position while silencing output. "Perceptual gain" is defined as the square-law curve (position squared). "Backend" is used to mean the playback adapter (context-clear). All event names are given with their payloads.
- **Reader can do the task:** The task is to read/set volume, step it, mute/unmute, and understand the gain curve. Each section shows the API call, expected arguments, returns, and event behavior. The table shows gain values at common positions.
- **No code example leans on unexplained things:** Snippets show `fn volume()`, `fn volumeUp()`, `fn mute()`, etc. with clear usage. Event listener examples are shown. All clear.
- **No sentence needs a second read:** Clear throughout. "Mute keeps that stored level" is precise. "While muted, that read is 0" clarifies the getter behavior.

The page is well-structured as a tour. A reader learns what volume is (position), what mute does (store/silence), and why the curve matters (spreading audible change across the slider travel). The math is explained simply with concrete examples.

