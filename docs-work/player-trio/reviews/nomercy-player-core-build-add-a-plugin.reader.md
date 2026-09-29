# Reader review: /nomercy-player-core/build/add-a-plugin

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/build/add-a-plugin.mdx

Reviewed-SHA: 412420972b88e283

## Review summary

The page opens with clear context: a plugin adds extra behavior, and this page is for shipping a plugin class. It references earlier tour material on subclassing and lifecycle, and later handbook material on registration timing.

**What You Ship section**: Table with clear roles for id, description, version, use, and addPlugin options. The text precedes the table and names each piece.

**Register, then set up section**: Two-sentence paragraph stating the rule, then a code block showing the call pattern before setup. The setup options section is brief and clear.

**Hear What It Emits section**: Explains namespacing with a concrete example (play-counter/milestone → plugin:play-counter:milestone). Names getPlugin for retrieving the instance. Snippet is provided via directive.

Voice matches the handbook/tour precedent (actor as subject, result stated in testable terms). No terms introduced here rely on content below. Code example shows the shipping shape without scaffolding.

No repetition detected against the prerequisite (timing, which teaches volume/mute/curve).
