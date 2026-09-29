# Reader: /nomercy-player-core/plugins-adapters/adapter-media-element

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-media-element.mdx

Reviewed-SHA: c7ebb979a7cb0770

## Findings

### Backend IDs used without full explanation

Line 48 names backend IDs:

> The ID is one of `str audio-element`, `str webaudio`, `str video`, `str html5`, `str mse` or `str webcodecs`.

"mse", "webaudio", and "webcodecs" are technical acronyms not explained.

**Cost to reader:** A reader implementing a backend doesn't know what these mean or when to pick each one. MSE is "Media Source Extensions", webaudio is "Web Audio API", webcodecs is "WebCodecs API" — these are different playback technologies but the page doesn't explain when to use which.

**Fix:** Expand each acronym and add a brief note on what each backend kind does:
- `str audio-element`: plays audio via `<audio>` element
- `str webaudio`: plays audio via Web Audio API
- `str video`: plays video via `<video>` element
- `str html5`: (legacy? clarify what this means vs video)
- `str mse`: Media Source Extensions for advanced streaming
- `str webcodecs`: WebCodecs API for custom decode handling

### HLS mentioned without explanation

Line 43 states:

> `fn pauseLoader` and `fn resumeLoader` stop and start the HLS loader when one is attached.

"HLS loader" is never defined on this page. HLS = HTTP Live Streaming, but a reader unfamiliar with streaming protocols doesn't know this.

**Cost to reader:** The purpose of pauseLoader/resumeLoader is unclear. Is HLS a specific feature? Is it needed?

**Fix:** Define HLS on first use: "`fn pauseLoader` and `fn resumeLoader` stop and start the HLS (HTTP Live Streaming) loader when one is attached."

