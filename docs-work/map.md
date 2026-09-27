# Documentation map

**Scope:** the server's Updating and Upgrading pages (Stoney's card pick "Update pages", 2026-09-27). Issue NoMercy-Entertainment/nomercy-docs#17.
**Excluded:** every other page, including the player trio collections (being worked on elsewhere) and release channels (media-server PR #79 is a draft, so channels are not true yet).
**Audience:** someone running their own server who wants a newer version.
**Destination:** the existing Astro site. Pages keep their files, URLs and nav slots (`src/lib/nav-structure.ts`), so no nav edit is needed.
**Conventions:** CLAUDE.md, DOCS-CONTRACT.md (no em dashes), `scripts/check-prose.mjs` (no change-history wording, American English).
**Existing pages outside scope that these pages may link to:** /nomercy-media-server/cli/start-stop, /nomercy-media-server/maintenance/backups (owns the pre-upgrade database copy), /nomercy-media-server/cli/logs, /nomercy-media-server/installation/docker.
**Reference page:** /nomercy-media-server/maintenance/backups (existing, same collection).

## Excluded

- release channels: not in the shipped server.

## Pages

| Page | Tier | Job | Owns | Assumes | Links to | Covers | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /nomercy-media-server/cli/update | reference | Move a server to the newest release with the step that fits how it was installed. | update command; update by install type | - | /nomercy-media-server/maintenance/upgrade | src/NoMercy.Cli/Commands/UpdateCommand.cs; src/NoMercy.Api/Controllers/ManagementController.cs; src/NoMercy.Setup/Server/Binaries.cs; docker-compose.yml; .github/actions/build-deb-packages/templates; .github/actions/build-rpm-packages/templates; .github/actions/build-arch-packages/templates; src/NoMercy.Launcher/Services/ServerProcessLauncher.cs; src/NoMercy.NmSystem/Information/AppFiles.cs | reviewed |
| /nomercy-media-server/maintenance/upgrade | reference | Say what a newer version does to the databases on its first start and how to recover if it does not start. | schema migration on start; orphan-row cleanup before migration | /nomercy-media-server/cli/update | /nomercy-media-server/cli/update | src/NoMercy.Service/Seeds/DatabaseSeeder.cs; src/NoMercy.Service/Seeds/DatabaseBackupService.cs; src/NoMercy.Service/Hosting/ServerBootstrapper.cs; src/NoMercy.Cli/Commands/LogsCommand.cs; src/NoMercy.Database | reviewed |
