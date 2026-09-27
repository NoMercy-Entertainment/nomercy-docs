# Reader review: /home/user/nomercy-docs/src/content/nomercy-media-server/en/maintenance/upgrade.mdx
Verdict: PASS
Reviewed: /home/user/nomercy-docs/src/content/nomercy-media-server/en/maintenance/upgrade.mdx
Reviewed-SHA: a1111eafefe80fa0

The page carries a reader through what happens during an upgrade and how to recover if it fails. Structure and voice are consistent with the reference page (backups.mdx): direct, action-oriented, with the server/component as subject and results stated in checkable terms.

**Paragraph density:** All prose paragraphs are 2–3 sentences; none exceed the limit.
- Lines 7–11 (intro): 3 sentences
- Lines 15–17 (database intro): 3 sentences
- Lines 25–27 (backup note): 3 sentences
- Lines 31–32: 2 sentences (separate paragraph from lines 34–35 by blank line 33)
- Lines 34–35: 2 sentences
- Lines 44–45 (restored state): 2 sentences
The previous review incorrectly counted lines 31–35 as one 4-sentence paragraph; line 33 is blank, marking two separate 2-sentence paragraphs. No violation.

**Clarity and outcomes:**
- Upgrade flow (lines 19–23): Three steps are listed explicitly; each has a stated outcome.
- Recovery flow (lines 37–42): Four steps are listed explicitly with clear actions and expected results.
- Line 44–45 addresses the reader's next concern before it arises: "The restored copy matches the version you had before" — a checkable outcome.

**Terms and forward references:**
- "Orphaned rows" are explained at line 22 before being referenced again at line 32. ✓
- "Pre-upgrade copy" is introduced and linked to Backups page (line 25). ✓
- Database context names (AppDbContext, MediaContext, QueueContext) at line 40 are appropriate for a reader familiar enough to operate the server; they are translated to filenames. ✓

**Assumptions met:** The page correctly assumes the reader knows how to get the newer version (delegated to `/cli/update` at line 11) and focuses on what happens next (database migration and recovery). No content repeats what the update page already teaches.

**Voice consistency:** Sentences are direct ("A change that fails stops the start"), results are checkable ("the log has a Fatal line that contains..."), constraints arrive as symptoms ("Read the files there when the server is down, because [nomercy logs] asks the running server"), not prohibitions. Matches backups.mdx.

**Troubleshooting section:** Three practical scenarios (lines 47–62) align with content above and point to relevant follow-up docs (Update, Backups, Docker).

No elided snippets, no undefined terms, no steps without outcomes, no forward references demanding knowledge further down.
