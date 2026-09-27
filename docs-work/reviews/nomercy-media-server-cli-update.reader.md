# Reader review: /home/user/nomercy-docs/src/content/nomercy-media-server/en/cli/update.mdx
Verdict: PASS
Reviewed: /home/user/nomercy-docs/src/content/nomercy-media-server/en/cli/update.mdx
Reviewed-SHA: 2d467fb37a7c283f

## Three claimed fixes verified

**Table lead-in (lines 9-10):** "The step that moves a server to the newest release depends on how you installed it. Find your install type in the table, then follow its section below." — 2 sentences, explains purpose before table. ✓

**"Updating a container" section (lines 88–106):** Checked all paragraphs; none exceed 3 sentences. Paragraphs are: (1) "Pull the new image..." intro + code; (2) "-f file" instruction (2 sentences); (3) "`nomercy-data` volume" explanation (2 sentences); (4) "[Docker]... covers the compose files" (1 sentence); (5) "Inside a container..." explanation (2 sentences). ✓

**"Rolling back" troubleshooting block (lines 118–123):** Now properly split into 2 paragraphs instead of exceeding the 3-sentence limit. First paragraph (lines 118–120): 3 sentences. Second paragraph (lines 122–123): 2 sentences. ✓

## Full-page review

**No critical findings.** The page carries a reader through all five install types, with clear instructions and predictable outcomes for each. Voice, density, and structure align with the reference page (backups.mdx).

### Sentence-level checks

- **Elided snippets:** None (all code examples are complete).
- **Undefined terms:** "binary" (line 44) is clear from context as the executable. "`.previous`" (line 46) is explained in situ. "volume" and "mounts" (lines 100–101) are explained in Docker context.
- **Outcomes stated:** All steps show what happens next — success case in output example (lines 31–40), failure cases in troubleshooting.
- **Instructions with location/direction:** All commands specify where they run (standalone server, Docker container, systemd user service) and what they do.
- **Examples model real usage:** `nomercy update`, `docker compose pull/up`, package manager commands, and systemd restart are all genuine paths.
- **No sentences demanding knowledge further down:** The table at the top tells the reader where to find their install type.
- **Compound-idea sentences:** Line 27 lists four actions (download, stop, swap, start) as one atomic operation, which is the update command's actual behavior — acceptable. Line 81 ("replaces files and does not restart") clarifies intent in one sentence.

### Density

No paragraphs exceed 3 sentences. All paragraphs serve the reader: they explain why a table is there, detail how a command works, state what persists, or troubleshoot a failure.

### Voice consistency

Both update.mdx and backups.mdx use:
- Active voice, simple subject-verb structures
- Imperative mood for instructions ("Find...", "Check...", "Run...")
- Results stated in terms the reader can check
- Cause and effect without prohibition tone

The pages read as though written by the same author.

### No findings requiring fix

The page is ready.
