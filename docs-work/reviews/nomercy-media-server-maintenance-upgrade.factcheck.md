# Fact check: /home/user/nomercy-docs/src/content/nomercy-media-server/en/maintenance/upgrade.mdx
Verdict: PASS
Reviewed: /home/user/nomercy-docs/src/content/nomercy-media-server/en/maintenance/upgrade.mdx
Reviewed-SHA: a1111eafefe80fa0

Source: /home/user/nomercy-media-server (dev). Paths below are relative to that repo unless they start with docs/.

| Claim | Supported by | Status |
| --- | --- | --- |
| New version applies its database changes itself on first start; you run nothing (L9-10) | src/NoMercy.Service/Hosting/ServerBootstrapper.cs:95 calls DatabaseSeeder.InitSchema on every start; Seeds/DatabaseSeeder.cs:506 context.Database.Migrate() | Supported |
| Getting the new version depends on install type, covered by Updating from the CLI (L11) | docs/src/content/nomercy-media-server/en/cli/update.mdx:14-16, 63-76 | Supported |
| Three databases app.db, media.db, queue.db in the `data` folder of the data directory (L15) | src/NoMercy.NmSystem/Information/AppFiles.cs:63 (DataPath = AppPath/data), :192-194 | Supported |
| Checked in that order, changes applied before the rest of the server uses them (L16) | Seeds/DatabaseSeeder.cs:43-44 (AppDbContext), :67-68 (MediaContext), :72-73 (QueueContext); ServerBootstrapper.cs:95 runs before Start.InitEssential (:98) and WebHostFactory.Create | Supported |
| Up-to-date database left alone (L17) | Seeds/DatabaseSeeder.cs:456-461 (no backup, no cleanup, no Migrate when pending = 0). Note: WAL/encoding pragmas at :543-544 still run; no schema change | Supported |
| Step 1: copy into data/backups, named db + UTC time, e.g. media.20260927143000.db (L21) | Seeds/DatabaseBackupService.cs:32 (DataPath/backups), :71-73 (UtcNow yyyyMMddHHmmss, `{dbName}.{timestamp}.db`); DatabaseSeeder.cs:470-472 | Supported |
| Step 2: removes rows pointing at a missing parent, logs count as a warning (L22) | src/NoMercy.Database/Maintenance/ForeignKeyOrphanCleaner.cs:17-34, :70 (PRAGMA foreign_key_check, DELETE); DatabaseSeeder.cs:482-495 (LogEventLevel.Warning, only when count > 0) | Supported |
| Step 3: applies the changes, in that order (L19-23) | DatabaseSeeder.cs:470-506 order: backup, clean, Migrate | Supported |
| Copy is the pre-upgrade copy Backups describes (L25) | docs/.../maintenance/backups.mdx:15 | Supported |
| No changes waiting, no copy (L26) | DatabaseBackupService.cs:47-48; DatabaseSeeder.cs:456 | Supported |
| Copy failure logs warning starting `WARNING: Could not back up database` and proceeds (L27) | DatabaseBackupService.cs:108-116 (Warning, returns false); DatabaseSeeder.cs:472 ignores result and continues | Supported |
| A failing change stops the start, reason in log (L31) | DatabaseSeeder.cs:525-539 rethrows; Program.cs:42-46 UnhandledException logged via Logger.App; nothing in Program.cs:59-70 catches it except StartupAbortException. Note: an "already exists" failure (:512-523) is healed by history sync and does not stop the start | Supported |
| FK failure logs a Fatal line containing `Migration failed on a foreign-key constraint` and lists orphaned rows (L32) | DatabaseSeeder.cs:527-537 | Supported |
| Log written to the `log` folder in the data directory (L34) | AppFiles.cs:64 (LogPath = AppPath/log); src/NoMercy.NmSystem/SystemCalls/Logger.cs:244 (file sink log.txt under LogPath) | Supported |
| `nomercy logs` asks the running server (L35) | src/NoMercy.Cli/Commands/LogsCommand.cs:66-71, :88-92 (CLI client / IPC to ApiRoutes.Logs) | Supported |
| Log names AppDbContext/MediaContext/QueueContext; they map to app.db/media.db/queue.db (L40) | DatabaseSeeder.cs:414 contextName = type name; src/NoMercy.Database/Contexts/AppDbContext.cs:18,46; MediaContext.cs:24,48; QueueContext.cs:18,30 | Supported |
| Restore steps: copy newest backup over data/<db>.db, start previous version (L39-43) | Backup is a full SQLite online-backup copy (DatabaseBackupService.cs:94-100) of the same file name | Supported (procedure; not run) |
| Restarting newer version reapplies same changes and fails the same way (L44-45) | Restored DB has pre-upgrade __EFMigrationsHistory, so DatabaseSeeder.cs:452-454 reports the same pending list | Supported (traced) |
| `nomercy update` restores previous version and starts it when new one does not come back (L50) | src/NoMercy.Cli/Commands/UpdateCommand.cs (lines ~152-174: RestoreBackup + startServer on start failure and on awaitVersion null) | Supported |
| Backup warning means changes applied without a copy (L54) | DatabaseBackupService.cs:108-116; DatabaseSeeder.cs:472 | Supported |
| Container data in `nomercy-data` volume at /data/.local/share/NoMercy (L58) | docker-compose.yml:30,66-67; docker-compose.amd.yml:42; docker-compose.intel.yml:40; docker-compose.nvidia.yml:32 (4 of 4) | Supported |
| Links: cli/update, maintenance/backups, cli/logs, installation/docker | `node scripts/check-links.js`: "Internal links OK (316 pages, 134 redirects)."; all four in src/lib/nav-structure.ts:39,54,56 | Supported |

House rules
- Em dash / en dash: none (Python scan of the file returned []).
- Change-history wording: none found; `node scripts/check-prose.mjs` output "Check-prose: clean."
- No elided snippets, no external URLs on the page.

Notes (not failures)
- The source strings themselves contain em dashes (DatabaseBackupService.cs:111, DatabaseSeeder.cs:535); the page quotes only the prefix before them, which is correct.
- Toolchain.md line "maintenance/upgrade.mdx takes a snapshot ... NOT VERIFIED" is now resolved: DatabaseBackupService.BackupBeforeMigration, called at DatabaseSeeder.cs:472.
