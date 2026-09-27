# Research leads (main session, 2026-09-27). Leads only: open each file:line before using it.
Source repo: /home/user/nomercy-media-server (dev @ d99a43f). Docs repo: /home/user/nomercy-docs.

## nomercy update (src/NoMercy.Cli/Commands/UpdateCommand.cs)
- :46 command "update", description "Download and stage a server update".
- :53-70 prints "Downloading update...", POSTs manage/update, prints server's message; non-ok status -> error exit.
- :75-81 container: prints "Pull the new container image to apply this update, then recreate the container." exit 0.
- :83-87 installer deployment: prints "Run the installer to apply this update." exit 0.
- :92-100 no staged file -> "No staged update file found — the server is still running and untouched." error exit.
  FINDING (read, not run): when the server answers "Server is already up to date." (ManagementController DownloadedResponse)
  or a "restart needed" message, the CLI still reaches this check and exits with an error. Do NOT document the up-to-date case.
- :102-124 stops the server, waits up to 60 s for exit; if it does not exit, nothing is changed.
- :126-148 moves current binary to "<path>.previous", moves staged file in place.
- :150-176 starts the new binary, waits up to 2 minutes (:39) for it to report its version; if it will not start or does not come
  back, restores the previous binary and starts it. On success deletes .previous and prints "Server is running version X."
- There is NO separate restart step after a successful `nomercy update`.

## Server side (src/NoMercy.Api/Controllers/ManagementController.cs:250-370, src/NoMercy.Setup/Server/Binaries.cs:1240-1290)
- Newest version comes from GitHub releases/latest for the media server repo (Binaries.cs:55-56).
- Container detected (Screen.IsDocker) -> UseContainerImage. Launcher-started install (NOMERCY_INSTALL_DIR set by the launcher,
  src/NoMercy.Launcher/Services/ServerProcessLauncher.cs:59-63) -> UseInstaller.
- Binaries live in <app data>/NoMercy/binaries (NmSystem/Information/AppFiles.cs:105,155-161); app data is ~/.local/share on Linux/macOS,
  %LocalAppData% on Windows (AppFiles.cs:23-28).

## Packages
- deb Package: nomercy (.github/actions/build-deb-packages/templates/DEBIAN/control:1); rpm Name: nomercy (nomercy.spec:1); arch pkgname=nomercy (PKGBUILD:2).
- systemd unit runs /opt/nomercy/NoMercyMediaServer and does not set NOMERCY_INSTALL_DIR (build-deb-packages/templates/usr/lib/systemd/user/nomercymediaserver.service).
  FINDING (read, not run): `nomercy update` on a package install would stage into the per-user binaries folder, not /opt/nomercy.
  So the page tells package installs to update through their package manager and does not claim what `nomercy update` does there.

## Docker
- docker-compose.yml:30 mounts volume nomercy-data at /data/.local/share/NoMercy (also the amd/intel/nvidia variants).

## Upgrade on first start (src/NoMercy.Service/Seeds/DatabaseSeeder.cs:38-75, 412-480; DatabaseBackupService.cs)
- On start the server migrates app, media and queue databases in that order (:38-75).
- Only when a database has pending migrations, it copies that database first (DatabaseSeeder.cs:470-472), to
  <app data>/NoMercy/data/backups/<dbname>.<yyyyMMddHHmmss>.db (DatabaseBackupService.cs:32,71-74), keeping the newest 5 per database (:35).
- A failed copy is logged as a warning and the migration continues (DatabaseBackupService.cs:19-23,111).
- The existing page /nomercy-media-server/maintenance/backups already explains this copy (line 15). Link to it, do not re-teach it.
