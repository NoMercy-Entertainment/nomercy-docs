# Reader review: /nomercy-player-core/plugins-adapters/adapter-clock

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-clock.mdx

Reviewed-SHA: ab4831abcc88479d

## Four criteria checks

**1. Every term explained at or before first use**

Prerequisite: /nomercy-player-core/plugins-adapters/adapter-audio-output. New terms: `cls IClock`, `key clockSource`, `fn now`, `systemClock`.

Each is explained: clockSource is "() => number", systemClock "calls Date.now()", IClock has one method "now()".

The distinction between IClock object (what you implement) and clockSource function (what you pass to setup) is clarified in opening.

**2. Reader can do the task from page alone**

Task: Use or provide a wall clock.

Steps: 1) Use built-in systemClock (returns Date.now()), or 2) Pass clockSource function on setup to use custom time, or 3) Implement custom IClock with now() returning milliseconds, wrap as function, pass on setup.

Usage section shows both default and custom cases. Interface shows IClock contract. Reader can choose and implement any path from this page alone.

**3. Code examples don't lean on missing content**

Usage snippet shows default usage. Custom implementation section shows complete fixed clock example with setup call. No scaffolding beyond what teaches the lesson.

**4. No sentence needs second read**

Clear direct language. "Wrap your clock as `() => clock.now()`" clearly states the transformation.

## Findings

None. Page passes all criteria.
