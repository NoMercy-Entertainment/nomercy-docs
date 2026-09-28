# Fact check: /nomercy-player-core/handbook/registration
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/registration.mdx
Reviewed-SHA: 18e9115f9a28e012

Source: `packages/player-web/nomercy-player-core/src/core/mixins/plugin-registration.ts`; `lifecycle.ts` (`ready()` drains `_pendingPluginRegistrations`). Example: `src/examples/core-handbook-registration.ts`. Method: read page, example, registration mixin, and lifecycle `ready` / drain; SHA256 of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example. Snippet: `live="false"`.

## Gate checks

| Gate | Result |
| --- | --- |
| Pre/post-setup `addPlugin` timing and second `ready()` drain | Pass (`plugin-registration.ts:590-617`; `lifecycle.ts:161-181,326-329`) |
| Throw codes at call site match `addPlugin` | Pass (`plugin-registration.ts:511-587`) |
| `requires` / `replaces` / `priority` / `minCoreVersion` | Pass |
| Install path, `use` timeout, failure → `plugin:failed` + `dep-failed:<id>` | Pass (`_registerPlugin`, `_failRegistration`) |
| Lookup / remove / cascade / queued clear | Pass |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:82`) |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass (max sentence 17; max paragraph 51) |
| Table data rows ≤ 6 non-separator lines | Pass (6: header + 5 codes) |
| Example matches page snippet and post-setup `ready()` wait | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Before/during setup, `addPlugin` queues and returns the player | `plugin-registration.ts:590-596` | Supported |
| After setup, registration starts inline and returns without waiting | `plugin-registration.ts:599-617` | Supported |
| Listen for bare or id-namespaced `plugin:installed` / `plugin:failed` | `plugin-registration.ts:125-126,474-475` | Supported |
| Call `ready` again to finish an in-flight post-setup install | `lifecycle.ts:154-181,326-329`; `_pendingPluginRegistrations` in `plugin-registration.ts:48-59,611-616`; example `:140-142` | Supported |
| After dispose started, `addPlugin` throws `core:lifecycle/use-plugin-after-dispose` | `plugin-registration.ts:511-513` | Supported |
| Sync throw codes: dispose, duplicate-id, missing-dep, version-mismatch, incompatible-core-version | `plugin-registration.ts:511-587` | Supported |
| `requires`: class or `{ plugin, optional, minVersion }`; optional may be absent; queued peers count; dependency must be added first | `plugin-registration.ts:534-571` | Supported |
| `replaces`: remove registered, drop queued, or continue if absent | `plugin-registration.ts:515-528` | Supported |
| `priority` sorts `enabledPlugins` higher first; ties keep registration order; default `0` | `plugin-registration.ts:752-766` | Supported |
| `minCoreVersion` below running core → `core:plugin/incompatible-core-version` | `plugin-registration.ts:574-587`; `kit-version.ts:21` | Supported |
| Construct → `initialize` → static translations → await `use` | `plugin-registration.ts:385-453` | Supported |
| Promise from `use` capped by `pluginInitTimeoutMs` (default 30s) → `core:plugin/init-timeout` | `plugin-registration.ts:435-444,609`; pipeline `:909` | Supported |
| Failure after sync checks does not throw from `addPlugin`; dispose half-built; `plugin:failed`; enable dependents `disable` with `dep-failed:<id>` | `plugin-registration.ts:96-128,617` | Supported |
| `getPlugin` / `getPluginById` / `plugins` / `enabledPlugins` | `plugin-registration.ts:626-767` | Supported |
| `removePlugin` / `removePluginById`: dispose, `plugin:disposed`; cascade default; `{ cascade: false }` → `has-dependents`; clear queued id | `plugin-registration.ts:650-698` | Supported |
| Example: Peer then Feature with require; Late after ready; cascade remove | `core-handbook-registration.ts:129-146` | Supported |
| Next: Styling handbook path | Path as written: `/nomercy-player-core/handbook/styling` | Supported |
