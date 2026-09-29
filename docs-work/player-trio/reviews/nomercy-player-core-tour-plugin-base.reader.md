# Reader: /nomercy-player-core/tour/plugin-base

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/plugin-base.mdx

Reviewed-SHA: 3674cbdd7dc14518

## Terms explained before first use

- “plugin” — defined in line 12: “A plugin is extra behavior you add to a player, such as counting each play”
- “cls Plugin” — the base class; explained by showing subclassing pattern (line 15)
- “static key id” and “static key description” — line 15, used as required class properties; expected from JavaScript audience
- “instance” — line 17 “You do not construct the instance yourself”; clear from context

## Reader can do the task

The task: write a plugin and register it with the player. Page provides:
- How to write: subclass Plugin, set static id and description (line 15)
- How to register: pass class to addPlugin with optional config (line 16)
- The lifecycle: player constructs, calls use(), emits plugin:installed (lines 25-26)
- Override use() to subscribe (line 27)
- Enable/disable: fn enable and fn disable toggle without unload (lines 30-31)
- Remove: fn removePlugin or player dispose (lines 33-34)

A reader can add a plugin.

## Code does not hide needed info

- Line 20: addPlugin call shows the class and options shape
- Line 26: lifecycle is stated (construct → use → installed event)
- Snippet will expand to show Plugin subclass, use() override, and registration

## No sentence needs a second read

- Lines 15-17: clear three-step pattern
- Lines 25-27: installation steps
- Lines 30-35: lifecycle of enable/disable and removal

## Why PASS

The reader understands how to subclass Plugin, what static fields are required (id, description), how to override use() for initialization, how to register with addPlugin(), and what lifecycle events (plugin:installed, plugin:enabled, plugin:disposed) are emitted. The term “plugin” is defined before being used as an action.
