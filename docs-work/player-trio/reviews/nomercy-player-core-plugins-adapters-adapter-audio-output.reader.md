# Reader review: /nomercy-player-core/plugins-adapters/adapter-audio-output

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-audio-output.mdx

Reviewed-SHA: 86a74ee1e5a1d753

## Four criteria checks

**1. Every term explained at or before first use**

Prerequisite: /nomercy-player-core/recipes/swap-an-adapter. New terms: `fn audioOutputs`, `fn selectAudioOutput`, `fn audioOutput`, `cls BrowserPolicyError`, `str core:policy/audioOutputPickerUnsupported`, `str core:policy/setSinkIdUnsupported`, `key deviceId`, `key sinkId`, `cls StubPlayer`.

Each method's behavior is explained before interface section. Error types are named with their error string. StubPlayer is shown with its stub behavior (resolves to [], returns null).

**2. Reader can do the task from page alone**

Task: Use audio-output methods to list devices, open picker, and route sound.

Steps: 1) Type helper against IPlayer, 2) Call audioOutputs() to list, 3) Call selectAudioOutput() to pick, 4) Call audioOutput(deviceId) to route.

Errors section teaches what to expect: AbortError resolves to null, NotAllowedError resolves to null, others rethrow. Interface section shows all overloads.

Reader can use all three methods from this page alone.

**3. Code examples don't lean on missing content**

Snippet shows usage helper functions and stub test case. Code is self-contained.

Line references in snippet directives (lines="15,18-37") show specific portions, not full programs.

**4. No sentence needs second read**

Direct language. "An empty string clears the stored id to `null`" clearly states behavior.

## Findings

None. Page passes all criteria.
