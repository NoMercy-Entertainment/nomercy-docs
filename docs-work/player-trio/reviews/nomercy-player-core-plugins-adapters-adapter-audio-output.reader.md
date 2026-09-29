# Reader review: /nomercy-player-core/plugins-adapters/adapter-audio-output

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-audio-output.mdx

Reviewed-SHA: 86a74ee1e5a1d753

## Review summary

Catalog page for audio output adapter. Opens: three methods on IPlayer list outputs, open picker, route sound. Player keeps device id; no setup field replaces them.

**Built-in Adapter**: Table: audioOutputs (resolves to devices or []), selectAudioOutput (opens picker, returns null on abort/denied), audioOutput (reads active id or routes with deviceId). Three follow-up paragraphs explain each method: audioOutputs never throws, selectAudioOutput throws BrowserPolicyError with specific code and Chrome version, audioOutput calls setSinkId and stores id.

Failure modes named (AbortError, NotAllowedError resolve to null; others rethrown). Empty string behavior (clears to null) stated twice (once in list, once in read section). Density: some repetition between table row and paragraph below it.

**Usage**: Brief intro, snippet with line numbers (not full file). Snippet pulls lines 15, 18-37 from the example file.

**Interface**: Table of four signature variants: audioOutputs(), selectAudioOutput(), audioOutput() [read], audioOutput(deviceId) [write]. Clear.

Voice matches prerequisite (swap-an-adapter, a recipe). Terms are named at first use. Snippet is partial (elided via lines parameter), which is acceptable for interface examples.
