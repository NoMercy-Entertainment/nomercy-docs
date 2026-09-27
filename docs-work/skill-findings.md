# Skill findings (atlas, run of 2026-09-27 on nomercy-docs)

1. `check_docs.py status` prints DELIVERED from the map and the review files alone. It does not check that
   `coverage` ran or passed, so a run that skipped the scanner slices (this one, at first) still reads DELIVERED.
   Belongs to: scripts/check_docs.py `emit_status` and SKILL.md gate table (G4). Proposed rule: `status` fails
   while docs-work/slices/ is empty or `coverage` fails, so a gate that did not run cannot pass.
2. SKILL.md says "A gate that did not run has not passed" only in prose. The run that produced this file treated
   a two-page scope as a reason to read the source in the main session instead of dispatching scanners. The
   workflow section should say the scanner runs at every scope, including one page.
3. A copy of the skill living in another repo (nomercy-workspace/.claude/skills/atlas) drifted from the source
   (paths only, so far). Belongs to: README.md "Installing". Proposed: state that installs are pointers or a
   pinned copy with the source commit recorded, and that a run loads the skill from NoMercyLabs/skills.
4. `check_docs.py coverage` recognizes a listed file only when its name has a dot and an extension
   (`[^\s`]+\.[A-Za-z0-9]+`). Debian `control`, `postinst`, `prerm`, `postrm`, `copyright`, an RPM `README` and an
   Arch `PKGBUILD` are all source and all fail the gate even when the slice lists them. Belongs to:
   scripts/check_docs.py `check_coverage`. Proposed: accept any listed path that exists under --src.
5. The packaging scanner listed 15 files and wrote "Files given: 14". The counts in the header are typed by the
   model; the list is the evidence. Proposed: the checker derives the count from the list and reports a
   mismatch as a warning, not as a second claim to trust.
6. `check_coverage` strips leading dots from every listed path (`lstrip("./")`), so a path under `.github/` is
   compared as `github/...` and never matches the walk. Every file under a dot-directory passed as --src is
   reported unread. Belongs to: scripts/check_docs.py `check_coverage`. Proposed: strip only a leading "./".
