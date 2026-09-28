# Reader: /nomercy-player-core/handbook/registration

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/registration.mdx

Reviewed-SHA: 18e9115f9a28e012

## Same-voice comparison (queue)

Compared to `src/content/nomercy-player-core/en/tour/queue.mdx`. Registration matches the tour voice: a short opening that states what the page covers and points to an earlier tour page for subclassing, behavior-first sections with `fn` / `key` / `str` typography, a throw table with a **When** column (like queue’s error row for `cls RangeError`), small inline TypeScript, a non-live snippet before **Next**, and one handbook link forward. Sentences stay direct and contract-oriented rather than describing the doc site.

## Snippet

`core-handbook-registration.ts` (via `:::snippet{file="core-handbook-registration" live="false"}` before **Next**). It registers `PeerPlugin` and `FeaturePlugin` (with `requires` and `minVersion`) before `setup` / `await ready()`, listens for `plugin:installed` and `plugin:failed`, looks up via `getPlugin` / `getPluginById`, adds `LatePlugin` after setup with a second `await ready()`, then `removePlugin(PeerPlugin)` to show cascade. Comments label the pre-setup path as queued and the post-setup path as inline registration. Judgment below is for the MDX page only; the snippet supplies lifecycle wiring the prose assumes.

## Reader notes (JavaScript background, plugins tour read)

I read the page in order without opening player source, assuming I already subclass `cls Plugin` from [Plugins](/nomercy-player-core/tour/plugin-base) and know `fn setup`, `fn ready`, and `fn dispose` from the lifecycle tour.

The opening reuses the plain **plugin** definition (“extra behavior you add, such as counting plays”) and says this page is the **contract** for `fn addPlugin`: timing, checks, lookup, removal. I am not dropped into error codes before I know why I am here.

**When the call runs** answers the main timing question in the first two sentences:

- Before or during `fn setup`, `fn addPlugin` **queues** the class and returns the player (nothing finishes installing yet).
- After setup, the same call **starts registration at once** and still returns without waiting (install work runs in the background).

The page tells me to listen for `str plugin:installed` or `str plugin:failed` and to call `fn ready` again when I need an in-flight install to finish. That ties the post-setup path to `ready()` without implying `addPlugin` blocks. After dispose has started, `addPlugin` throws—same section, clear boundary.

**Checks that throw** states that validation runs before queue or install and lists every sync failure in a table with **When** cells. I can map duplicate id, missing dep, version mismatch, and core version mismatch to static fields introduced in the next section.

**Requires, replaces, and priority** explains `key requires` (class or `{ plugin, optional, minVersion }`), that queued peers count for the dependency check, call order among `addPlugin` calls, `key replaces` for registered vs queued vs absent targets, `key priority` on `fn enabledPlugins`, and `key minCoreVersion`.

**Install steps and timeout** walks the async pipeline (construct → `fn initialize` → translations → await `fn use`), caps `fn use` with `key pluginInitTimeoutMs`, and says async failure does not throw from `addPlugin` but emits `str plugin:failed` and disables dependents with `dep-failed:<id>`.

**Look up and remove** covers `fn getPlugin`, `fn getPluginById`, `fn plugins`, `fn enabledPlugins`, cascade vs `{ cascade: false }`, and clearing queued ids on remove.

The inline block shows two pre-setup `addPlugin` calls only; the full snippet shows `setup`, both `ready()` calls, and post-setup `LatePlugin`—together with **When the call runs**, I know when calls only enqueue versus when registration starts immediately.

## Friction (does not fail the rubric)

- `fn initialize` and “merges static translations” are named in the install pipeline without saying what authors override or where translations come from; I treat them as internal steps before my `fn use` hook.
- “Enabled” for `fn enabledPlugins` is not redefined here; I rely on the plugins tour for enable/disable semantics.
- “Dependents” on remove is implied by the requires graph rather than defined in one sentence.
- Event wording “bare or with the id in the name” is terse; the snippet uses the bare `plugin:installed` / `plugin:failed` forms.
- `fn setup` is the queue-vs-install boundary but this page does not re-teach when my app calls it—that lives on the lifecycle tour.

## Why PASS

I can state the rule without guessing: **before or during setup**, `addPlugin` only queues; **after setup**, it kicks off registration immediately and I use `ready()` (and events) to know when work finished. Sync throws are listed before queue/install; requires, replaces, priority, lookup, and cascade remove are explained in place. **Plugin** is defined in the first prose block, and every static field the throw table references is introduced in **Requires, replaces, and priority** or the frontmatter scope. Under the stated fail conditions (no unexplained name that blocks the queue-vs-install distinction; must know when `addPlugin` queues versus installs), this passes.
