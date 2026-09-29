# Reader review: /nomercy-player-core/plugins-adapters/adapter-clock

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-clock.mdx

Reviewed-SHA: ab4831abcc88479d

## Review summary

Catalog page for IClock adapter. Opens: use IClock when you need wall time as Unix-epoch millisecond. References adapters tour for the concept. States this is the contract page.

Note on clockSource: it is a function () => number, not an IClock object. Wrap your clock as () => clock.now(). Imports shown.

**Built-in Adapter**: systemClock is the shipped IClock. Its fn now calls Date.now(). Table one row: systemClock → fn now returns Date.now(). Player does not construct or read systemClock. fn now on player calls clockSource when set; falls back to Date.now() when omitted. Clear fallback.

**Usage**: Read default or hand custom millisecond source into setup. Snippet provided.

**Interface**: Shows IClock interface: now(): number. Simple.

**Custom Implementation**: Start of this section shown in read window. Mentions test use case and sync need. Wrapper note repeated.

Voice matches audio-output (catalog). All terms (IClock, systemClock, clockSource) named at first use. Density acceptable. Snippet terminal.
