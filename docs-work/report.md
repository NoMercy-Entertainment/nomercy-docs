docs-work/map.md: 2 page(s), 1 excluded path(s)

    STATUS: DELIVERED
    Pages reviewed: 2 of 2
    Drafted, not reviewed: 0    Planned, not written: 0
    Review verdicts: 4 PASS, 0 FAIL, 0 missing

# Report: server Updating and Upgrading pages (nomercy-docs #17), rerun under NoMercyLabs/skills atlas

Committed d8dccad to master (site deploy run 80). Pages unchanged since; both review SHAs still match.

Gates
- G0 scope: docs-work/scope.md (Stoney's card choice "Update pages").
- G1 coverage: three scanner slices (sonnet) over the source both pages cover. C# source: 55 of 55 files read,
  checker PASS on those roots. Packaging templates: 15 of 15 listed, checked against a walk by hand, because the
  checker cannot parse dotless file names or a `.github/` root (skill-findings 4 and 6). Slices found no claim on
  either page that contradicts the code.
- G2 map: PASS. G3 reviews: PASS (4 of 4 verdicts, SHAs match). G4: repo gates prose, nav, links, density, tiers green.
- Not verified: Debian prerm runs `systemctl --user stop/disable` on every upgrade as root; whether that reaches the
  user's own service manager was not run. The page's restart step still applies either way.

Findings for the media server (read, not run): see leads-update-facts.md and slices/*.md Traps.
