# Fact check: /home/user/nomercy-docs/src/content/nomercy-media-server/en/cli/update.mdx
Verdict: PASS
Reviewed: /home/user/nomercy-docs/src/content/nomercy-media-server/en/cli/update.mdx
Reviewed-SHA: 2d467fb37a7c283f

Source: /home/user/nomercy-media-server (dev @ d99a43f, same commit as the previous review). Paths below are relative to that repo unless they start with `docs:`.
Method: read the code; no code run (the command needs a live server and a GitHub release). Re-review after a paragraph-density edit. Every claim re-read against the source; `UpdateCommand.cs:36-180,244-263` and `docker-compose.yml:30,45,66-67` re-opened this turn and unchanged.
Checks run from docs: `node scripts/check-links.js` gave "Internal links OK (316 pages, 134 redirects)."; `node scripts/check-prose.mjs` gave "check-prose: clean.". Em dash and en dash scan (U+2013, U+2014) over the page: none.

## What the edit changed

- New lead-in :10 "Find your install type in the table, then follow its section below.": true. Each of the four table rows has its own section (:21 The update command, :64 installer, :71 package, :88 container).
- :50-53 split into two paragraphs (60 s case; rollback case). Wording of each fact is the same as before: no swap on timeout (`UpdateCommand.cs:113-124`), rollback puts `.previous` back, starts it, exits with an error (`UpdateCommand.cs:152-174`).
- :97-106 container text split into paragraphs (`-f` and `HOST_IP`; the volume and host mounts; the Docker link; the in-container message). Facts unchanged: `docker-compose.yml:30,37-39,45,66-67`; `UpdateCommand.cs:75-81`.
- No fact changed.

## Notes (settled, not failures)

- Installer edge case (`ServerUpdateStaging.Check` before download, `ManagementController.cs:259-276`, `ServerUpdateStaging.cs:68-80`): settled; page :67 holds in the normal case.
- Deb `prerm` stops the `--user` service on every run; page :81 "does not restart" holds (no package script restarts). Settled.
- `nomercymediaserver` user service ships in deb and rpm, not Arch; page :82 is conditional. Settled.
- :77 "Fedora, RHEL and CentOS" distro list: settled; package name `nomercy` is supported.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Standalone server in `binaries` updates with `nomercy update` | `UpdateCommand.cs:89-178`; `AppFiles.cs:105,155-162` | Supported |
| Installer + launcher install updates with the installer | `ServerProcessLauncher.cs:59-63` sets `NOMERCY_INSTALL_DIR`; `GetInstallDirectory` :268-288; `Binaries.cs` UseInstaller branch; `UpdateCommand.cs:83-87` | Supported |
| apt, dnf, pacman package installs update with the package manager | deb `DEBIAN/control` `Package: nomercy`; `nomercy.spec:1` `Name: nomercy`; `PKGBUILD:2` `pkgname=nomercy` | Supported |
| Docker updates with a new image | `ServerUpdateStaging.cs:57-62`; `ManagementController.cs:298-299,396-404`; `UpdateCommand.cs:75-81` | Supported |
| Link to Upgrading | docs: `src/lib/nav-structure.ts:56`; check-links OK | Supported |
| One command downloads, stops, swaps, starts; no separate restart step | `UpdateCommand.cs:54-178` | Supported |
| Output lines of a successful run | `UpdateCommand.cs:55,70,103,112,150,177`; `ManagementController.cs:385` | Supported (second line reads "Update to X already staged." when a staged file exists, `ManagementController.cs:307`) |
| Step 1: running server downloads newest release into `binaries`, next to current binary | `ManagementController.cs:278-282`; `Binaries.cs` `DeleteSourceDownload(ServerTempExePath)` then download; `AppFiles.cs:155-162` | Supported |
| Step 2: stops server, waits up to 60 s | `UpdateCommand.cs:44,104,113`; `WaitForServerExitAsync` :185-213 | Supported |
| Step 3: renames current binary with `.previous`, moves new into place | `UpdateCommand.cs:127-141` | Supported |
| Step 4: starts new version, waits up to 2 min for its version | `UpdateCommand.cs:38-39,152,164`; :289-331 | Supported |
| Step 5: deletes `.previous`, prints running version | `UpdateCommand.cs:176-177` | Supported |
| No exit within 60 s: stops without swapping the binary | `UpdateCommand.cs:114-124` | Supported |
| New version will not start or no answer in 2 min: rolls back | `UpdateCommand.cs:152-174` | Supported |
| Rollback puts `.previous` back, starts it, exits with an error | `UpdateCommand.cs:157-159,171-173`; `RestoreBackup` :244-263 | Supported |
| Binary lives in `binaries` of the data directory | `AppFiles.cs:35-40,105,155-156` | Supported |
| Windows `%LOCALAPPDATA%\NoMercy\binaries\` | `AppFiles.cs:29,40,105` | Supported |
| Linux and macOS `~/.local/share/NoMercy/binaries/` | `AppFiles.cs:24-28,40,105` | Supported |
| Installer install: launcher-started installed copy, installer owns updates | `ServerProcessLauncher.cs:59-63` | Supported |
| Installer install: when a newer release exists, prints `Run the installer to apply this update.` and stops | `Binaries.cs` AlreadyUpToDate checks before UseInstaller; `UpdateCommand.cs:83-87` | Supported (see edge-case note) |
| apt, rpm and Arch packages all named `nomercy` | templates cited above | Supported |
| apt / dnf / pacman commands | package name above; repos not checked | Supported (name only) |
| Package replaces files under `/opt/nomercy` | `nomercy.spec:33-34`; `PKGBUILD:16-17`; deb unit `ExecStart=/opt/nomercy/NoMercyMediaServer` | Supported |
| Package does not restart a running server | no restart in deb `postinst`/`prerm`/`postrm`, rpm `%post`/`%preun` | Supported (see note) |
| `systemctl --user restart nomercymediaserver` | deb `usr/lib/systemd/user/nomercymediaserver.service`; rpm `Source3` | Supported (not on Arch) |
| `docker compose pull` + `up -d` recreates with the new image | compose `image: ghcr.io/nomercy-entertainment/nomercymediaserver:*` | Supported |
| GPU variant via `-f docker-compose.nvidia.yml` | `docker-compose.nvidia.yml` exists (also amd, intel) | Supported |
| `nomercy-data` volume holds `/data/.local/share/NoMercy` and survives recreation | `docker-compose.yml:30,66-67` (named volume); same in variants | Supported |
| Media folders are host mounts | `docker-compose.yml:37-39` and variants | Supported |
| Compose files require `HOST_IP` | `${HOST_IP:?HOST_IP is required...}` in `docker-compose.yml:45`, amd :56, intel :54, nvidia :46 | Supported |
| Link to Docker | docs: `nav-structure.ts:39`; check-links OK | Supported |
| In a container prints `Pull the new container image to apply this update, then recreate the container.` and stops, server untouched | `ServerUpdateStaging.cs:57-62`; `UpdateCommand.cs:75-81`; `Screen.cs:18-19` | Supported |
| `The server did not stop within 60s.`: binary not swapped | `UpdateCommand.cs:119-123` | Supported |
| `nomercy status`, `nomercy start` exist | `StatusCommand.cs:21`; `StartCommand.cs:24`; `Program.cs:32-33` | Supported |
| `Could not apply the update:`: previous binary put back, server stopped | `UpdateCommand.cs:143-148` (restore, no start, after server exited) | Supported |
| Rolling back: new version did not start or answer in 2 min; previous put back and started without waiting | `UpdateCommand.cs:152-173` | Supported |
| `nomercy logs --level Error` | `LogsCommand.cs:44-51`; `Program.cs:34` | Supported |
| `Could not restore the previous version from` a path: old binary still there, rename back | `UpdateCommand.cs:246-261` (backup exists at start; delete/move failed) | Supported |
| Where to go next links | docs: `nav-structure.ts:54,56`; check-links OK | Supported |
