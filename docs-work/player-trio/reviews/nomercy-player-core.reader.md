# Reader: /nomercy-player-core

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/introduction.mdx

Reviewed-SHA: 3e10f4a927156e16

Same-voice comparison: skipped (not requested for this review).

## Who installs Player Core?

Clear. Install `@nomercy-entertainment/nomercy-player-core` on its own only when you write a plugin or when you build your own player class instead of using the ready-made players.

## Who should use the video or music player instead?

Clear. If you only want to play video, use the video player. If you only want to play music, use the music player. Those packages already bundle Player Core, so you do not install Core again.

## What is the next page?

Clear. **Next** points to [Quickstart](/nomercy-player-core/quickstart), which shows how to attach the engine to a class.

## Terms before definition

No FAIL on this rule. **Plugin** is defined in the opening paragraph before it appears again. Server requests with a token are described in plain language before **those requests** is used. There is no unexplained **compose** or **signed requests** label on this page.

## Summary

As a JavaScript reader new to the library, I know when to install Core, when to pick video or music packages, and that Quickstart is next. Verdict remains **PASS**.
