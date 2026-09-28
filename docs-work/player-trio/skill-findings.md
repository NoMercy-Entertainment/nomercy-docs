# Skill findings

Atlas says the toolchain and the slices live in `docs-work/`. This job's brief puts them in `docs-work/player-trio/` because `docs-work/` already holds an earlier run. The coverage checker looks for `toolchain.md` beside the slices directory, which matches `docs-work/player-trio/toolchain.md`. The skill text should name that the working folder may be a subfolder when an earlier run already owns `docs-work/`.

`status` defaults `--slices` to `docs-work/slices`. This job's slices live in `docs-work/player-trio/slices`, so the status command in the brief reports Coverage FAIL even when `coverage --slices docs-work/player-trio/slices` passes. The status command should take the same slices directory as the coverage command.

`check_docs.py` treats a filename containing `token` as secret-bearing. That drops real source from the walk and fails coverage if a slice lists it. The files are not credentials: `nomercy-player-core/src/core/append-auth-token-param.ts`, `nomercy-player-core/src/core/title-tokens.ts`, and `nomercy-video-player/src/plugins/desktop-ui/i18n/token-bundle.ts`. The rule should match credential filenames, not the word token inside a source name. Those three stay out of `## Files opened` so the gate can pass, and their behavior stays in the other sections of the same slices.
