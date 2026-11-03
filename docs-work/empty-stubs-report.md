# Empty stub inventory (#19)

Run `node scripts/list-empty-stubs.mjs` from the docs repository root. The script lists MDX pages marked `draft: true` whose body says `stub`, `placeholder`, or `drafted out`. It leaves every page intact.

Result for this worktree: **5 of 453 MDX pages** meet that criterion. The brief's figure of 177 does not match this checkout under this explicit definition.

- `src/content/nomercy-app-web/en/dashboard/dlna.mdx`
- `src/content/nomercy-app-web/en/dashboard/metadata.mdx`
- `src/content/nomercy-app-web/en/dashboard/schedule.mdx`
- `src/content/nomercy-app-web/en/preferences/controls.mdx`
- `src/content/nomercy-media-server/en/connect/watch-parties.mdx`

All five are drafts. No pages were deleted or published for this issue.
