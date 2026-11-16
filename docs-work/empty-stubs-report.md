# Empty stub inventory (#19)

Run `node scripts/list-empty-stubs.mjs` from the docs repository root. The script lists MDX pages marked `draft: true` whose body says `stub`, `placeholder`, or `drafted out`. It leaves every page intact.

Result: **0 of 450 MDX pages** meet that criterion.

The rule for a page whose feature does not ship: the page does not exist, and `src/lib/nav-structure.ts` carries a comment at the place where it belongs. Two features have such a comment today: DLNA in the web app dashboard, and watch parties under Remote Access & Sync. Write the page when the feature ships.
