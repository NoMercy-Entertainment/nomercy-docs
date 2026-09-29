# Reader review: /nomercy-player-core/build/backend-contract

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/build/backend-contract.mdx

Reviewed-SHA: 14df2fd5fa331270

## Four criteria checks

**1. Every term explained at or before first use**

Prerequisite: /nomercy-player-core/build/add-i18n. Terms introduced: `fn backend`, `cls MediaElementBackend`, `fn load`, `fn play`, `fn pause`, `fn stop`, `fn currentTime`, `fn duration`, `fn volume`, `fn mute`, `fn unmute`, `fn attachDomBridges`, `fn bridgeBackendPlayState`, `cls AuthHeaderProvider`, `key onPlaying`, `fn isHls`, `fn supportsNativeHls`, `fn attachHlsOrFallback`, `fn resolveOrCreateMediaElement`, `fn resetMediaElement`.

All are explained with their role or behavior before code examples use them.

**2. Reader can do the task from page alone**

Task: Write a custom media backend implementing MediaElementBackend.

Steps: 1) Extend MediaElementBackend, 2) Call super() with element, ownership flag, backend id, 3) Implement required fn load, 4) Implement optional methods (unload, dispose, state, buffered, outputProtectionState) when needed, 5) Wire DOM events or use attachDomBridges, 6) Override play/volume/mute if medium needs extra work.

Helpers section shows five tools: isHls, supportsNativeHls, attachHlsOrFallback, resolveOrCreateMediaElement, resetMediaElement.

AuthHeaderProvider section explains sync-only requirement.

Reader can build a backend from this page alone.

**3. Code examples don't lean on missing content**

Snippet shows backend implementation. No scaffolding beyond what teaches the contract.

**4. No sentence needs second read**

Language is direct. "Any other missing method is a safe no-op" clearly states behavior.

## Findings

None. Page passes all criteria.
