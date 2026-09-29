# Reader review: /nomercy-player-core/build/backend-contract

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/build/backend-contract.mdx

Reviewed-SHA: 14df2fd5fa331270

## Review summary

Opens with context: write your own media backend or understand the shared surface. States the boundary: Player Core does not decode, it calls backend methods.

**How the Player Finds It**: States fn backend is required, lists what the optional chaining pattern means, names the exception (core:player/backend-missing) for missing load. Clear. No setup field installs a backend—this is explicit.

**The Shared Substrate**: Explains MediaElementBackend is exported but not constructed by core. Table lists what the base covers by area. Straightforward.

**What You Still Supply**: Lists six required/optional methods. Text states which is required (load) and which are safe to omit. Advises on overriding play/volume/mute and DOM bridges. Concrete and testable.

**Backend State**: Names BACKEND_STATE constants, explains DOM bridges and their mapping, then bridgeBackendPlayState with options for gating.

**Auth for Each Request**: AuthHeaderProvider type, synchronicity requirement, and the caveat about not fetching inside it.

**Helpers You Can Reuse**: Five helpers listed with their purpose. Mentions "the host in the sample stands for your own API" to frame the example.

Voice consistent with prior pages. Density acceptable (sections 1-2 sentences each). Snippet terminal. No undefined terms; all needed types and methods named.
