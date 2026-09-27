# Slice: packaging
Files given: 15
Files opened: 15

## Files opened
- .github/actions/build-deb-packages/action.yml
- .github/actions/build-deb-packages/templates/DEBIAN/control
- .github/actions/build-deb-packages/templates/DEBIAN/postinst
- .github/actions/build-deb-packages/templates/DEBIAN/postrm
- .github/actions/build-deb-packages/templates/DEBIAN/prerm
- .github/actions/build-deb-packages/templates/usr/lib/systemd/user/nomercylauncher.service
- .github/actions/build-deb-packages/templates/usr/lib/systemd/user/nomercymediaserver.service
- .github/actions/build-deb-packages/templates/usr/share/doc/nomercy/copyright
- .github/actions/build-rpm-packages/action.yml
- .github/actions/build-rpm-packages/templates/README
- .github/actions/build-rpm-packages/templates/nomercy.spec
- .github/actions/build-rpm-packages/templates/nomercylauncher.service
- .github/actions/build-rpm-packages/templates/nomercymediaserver.service
- .github/actions/build-arch-packages/action.yml
- .github/actions/build-arch-packages/templates/PKGBUILD

## Public surface

Package names, per format:

| Format | Package name | Arch | Install root | Symlinks (`/usr/bin`) | Service units shipped | Maintainer scripts |
|---|---|---|---|---|---|---|
| DEB | `nomercy` (`DEBIAN/control:1`) | `amd64` (`DEBIAN/control:3`) | `/opt/nomercy` (`action.yml:43`) | `nomercymediaserver`, `nomercyapp`, `nomercylauncher`, `nomercy` (`action.yml:65-68`) | `nomercymediaserver.service`, `nomercylauncher.service` under `/usr/lib/systemd/user/` (`action.yml:90-96`) | `postinst`, `prerm`, `postrm` (`action.yml:112-121`) |
| RPM | `nomercy` (`nomercy.spec:1`) | `x86_64` (`nomercy.spec:13`) | `/opt/nomercy` (`nomercy.spec:33`) | `nomercymediaserver`, `nomercyapp`, `nomercylauncher`, `nomercy` (`nomercy.spec:42-45`) | `nomercymediaserver.service`, `nomercylauncher.service` under `/usr/lib/systemd/user/` (`nomercy.spec:56-58`) | `%post`, `%preun`, `%postun` (`nomercy.spec:77-101`) |
| Arch | `nomercy` (`PKGBUILD:2`) | `x86_64` (`PKGBUILD:6`) | `/opt/nomercy` (`PKGBUILD:16`) | `nomercymediaserver`, `nomercyapp`, `nomercylauncher`, `nomercy` (`PKGBUILD:24-27`) | none — no systemd unit is staged or installed anywhere in `build-arch-packages/action.yml` or `PKGBUILD` | none — `PKGBUILD` defines only `package()`; no `pre_install`/`post_install`/`pre_remove`/`post_remove`, no `install=` line |

Maintainer-script behavior on install / upgrade / removal:

- **DEB `postinst`** (`templates/DEBIAN/postinst:1-12`) — runs on every install and upgrade (dpkg convention; the script itself takes no argument branch). Refreshes the icon cache (`update-icon-caches`), the desktop database (`update-desktop-database`), and runs `systemctl --user daemon-reload`. It never enables or starts either service.
- **DEB `prerm`** (`templates/DEBIAN/prerm:1-9`) — runs before files are removed, on both upgrade and removal, and does not check `$1`. Unconditionally stops and disables `nomercymediaserver.service` and `nomercylauncher.service`. Because it does not distinguish upgrade from removal, an upgrade also stops both services, and nothing in `postinst` restarts them afterward.
- **DEB `postrm`** (`templates/DEBIAN/postrm:1-11`) — only acts when `$1 = "purge"`: refreshes icon cache and desktop database. A plain `remove` (not `purge`) does neither.
- **RPM `%post`** (`nomercy.spec:77-84`) — runs on install and upgrade (rpm convention). `gtk-update-icon-cache`, `update-desktop-database`, `systemctl --user daemon-reload`. Like the deb postinst, it never enables or starts either service.
- **RPM `%preun`** (`nomercy.spec:86-92`) — guarded by `[ "$1" -eq 0 ]`, i.e. only on final uninstall, not on upgrade. Stops and disables both services only in that case.
- **RPM `%postun`** (`nomercy.spec:94-102`) — same `[ "$1" -eq 0 ]` guard; refreshes icon cache and desktop database only on final uninstall, not upgrade.
- **Arch**: no scriptlet runs at any point (no `.install` referenced by `PKGBUILD`). Installing, upgrading or removing the Arch package touches no icon cache, no desktop database, and no systemd unit, because none is shipped.

`templates/README` (RPM only, installed to `/usr/share/doc/%{name}/README` per `nomercy.spec:61-62,75`) is the only in-package instruction to the user to run `systemctl --user enable nomercymediaserver.service` and `systemctl --user start nomercymediaserver.service` (`templates/README:4-5`). No equivalent file ships in the DEB or Arch package.

| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `build-deb-packages` action inputs | `version` (required), `dotnet-version` (default `10.0.x`), `app-repo-token` (default `''`) | `.github/actions/build-deb-packages/action.yml:4-14` |
| `build-rpm-packages` action inputs | `version` (required), `dotnet-version` (default `10.0.x`), `gpg-private-key` (required), `app-repo-token` (default `''`) | `.github/actions/build-rpm-packages/action.yml:4-17` |
| `build-arch-packages` action inputs | `version` (required), `dotnet-version` (default `10.0.x`), `app-repo-token` (default `''`) | `.github/actions/build-arch-packages/action.yml:4-14` |
| DEB output artifact path | `packages/apt/pool/main/n/nomercy/nomercy_${VERSION}_amd64.deb` (+ `nomercy_latest_amd64.deb` symlink) | `.github/actions/build-deb-packages/action.yml:131,133` |
| RPM output artifact path | `packages/rpm/pool/x86_64/*.rpm` (via `find ~/rpmbuild/RPMS -name "*.rpm" -exec cp {} packages/rpm/pool/x86_64/ \;`) | `.github/actions/build-rpm-packages/action.yml:80-81` |
| Arch output artifact path | `packages/arch/pool/x86_64/*.pkg.tar.zst` + `nomercy.db.tar.gz` sync-db | `.github/actions/build-arch-packages/action.yml:83,105-106,129` |

## Literal defaults

| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `dotnet-version` (deb) | `10.0.x` | `build-linux-installer-payload` invocation | `.github/actions/build-deb-packages/action.yml:7-10,22` |
| `app-repo-token` (deb) | `''` | `build-linux-installer-payload` invocation | `.github/actions/build-deb-packages/action.yml:11-14,23` |
| `dotnet-version` (rpm) | `10.0.x` | `build-linux-installer-payload` invocation | `.github/actions/build-rpm-packages/action.yml:7-10,25` |
| `app-repo-token` (rpm) | `''` | `build-linux-installer-payload` invocation | `.github/actions/build-rpm-packages/action.yml:14-17,26` |
| `dotnet-version` (arch) | `10.0.x` | `build-linux-installer-payload` invocation | `.github/actions/build-arch-packages/action.yml:7-10,22` |
| `app-repo-token` (arch) | `''` | `build-linux-installer-payload` invocation | `.github/actions/build-arch-packages/action.yml:11-14,23` |
| `INSTALL_DIR` (deb) | `/opt/nomercy` | staging steps that populate `${PACKAGE_ROOT}${INSTALL_DIR}` | `.github/actions/build-deb-packages/action.yml:43,50,58` |
| RPM install root | `/opt/nomercy` (hardcoded, no variable) | `%install` section | `.github/actions/build-rpm-packages/templates/nomercy.spec:33-38,66` |
| Arch install root | `/opt/nomercy` (hardcoded, no variable) | `package()` | `.github/actions/build-arch-packages/templates/PKGBUILD:16` |
| `Restart=` (both service units, both deb and rpm copies) | `on-failure` | systemd, on service crash/exit | `.github/actions/build-deb-packages/templates/usr/lib/systemd/user/nomercymediaserver.service:8`, `...nomercylauncher.service:8`, `.github/actions/build-rpm-packages/templates/nomercymediaserver.service:8`, `...nomercylauncher.service:8` |
| `RestartSec=` (all four unit files) | `5` | systemd | same four files as above, line 9 |
| `[Install] WantedBy=` (all four unit files) | `default.target` | systemd, on `enable` | same four files as above, line 12 |
| DEB `Depends:` | `libc6 (>= 2.31), libgcc-s1, libssl3 \| libssl1.1` | dpkg dependency resolution | `.github/actions/build-deb-packages/templates/DEBIAN/control:7` |
| DEB `Recommends:` | `systemd` | dpkg (soft dependency, not enforced) | `.github/actions/build-deb-packages/templates/DEBIAN/control:8` |
| DEB `Priority:` | `optional` | dpkg | `.github/actions/build-deb-packages/templates/DEBIAN/control:9` |
| RPM `Requires:` | `glibc` | rpm dependency resolution | `.github/actions/build-rpm-packages/templates/nomercy.spec:16` |
| RPM `Recommends:` | `systemd` | rpm (weak dependency) | `.github/actions/build-rpm-packages/templates/nomercy.spec:17` |
| RPM `Release:` | `1%{?dist}` | rpm | `.github/actions/build-rpm-packages/templates/nomercy.spec:3` |
| Arch `pkgrel` | `1` | makepkg/pacman | `.github/actions/build-arch-packages/templates/PKGBUILD:3` |
| Arch `depends` | `('glibc')` | pacman | `.github/actions/build-arch-packages/templates/PKGBUILD:9` |
| Arch `options` | `(!debug !strip)` | makepkg (disables debug package + binary stripping) | `.github/actions/build-arch-packages/templates/PKGBUILD:13` |
| License string, all three formats | `Proprietary` / `"Proprietary software. All rights reserved."` | dpkg/rpm/pacman metadata readers, and the file each format ships | `.github/actions/build-deb-packages/templates/DEBIAN/control:1` is `Package:` not license — actual license text at `.github/actions/build-deb-packages/templates/usr/share/doc/nomercy/copyright:7-10`; `.github/actions/build-rpm-packages/templates/nomercy.spec:5`; `.github/actions/build-arch-packages/templates/PKGBUILD:8,40` |
| Docker pull retry attempts (arch) | `1 2 3 4 5` (5 attempts), delay `attempt * 15` seconds | `Pull Arch build container` step | `.github/actions/build-arch-packages/action.yml:31,35` |

## Comment versus code

| Claim in the comment | What the code does | File:line |
|---|---|---|
| "dpkg-scanpackages is the only tool here that is not already on a Debian box; dpkg-deb ships with dpkg itself. devscripts, fakeroot and build-essential were never invoked by this action" | Confirmed: the step installs only `dpkg-dev` (`apt-get install -y --no-install-recommends dpkg-dev`); no `devscripts`, `fakeroot`, or `build-essential` appear anywhere else in the deb action. | `.github/actions/build-deb-packages/action.yml:31-36` |
| "Systemd service files, control scripts and the copyright notice are generated from the real checked-in templates/ ... This also fixes a latent bug where the inline heredocs ... emitted a DEBIAN/control with leading whitespace on every field line" | Confirmed: the current step copies/`sed`s from `templates/` rather than using an inline heredoc; no heredoc remains in `action.yml` for these files. Cannot verify the historical bug itself (no prior version of the file was read), so the "fixes a latent bug" half is taken on trust; the "generated from templates/" half is directly confirmed. | `.github/actions/build-deb-packages/action.yml:81-96` |
| "dpkg refuses a control directory it considers world-writable, and the runner's umask leaves every mkdir at 777. The scripts inside are given 755 above; the directory holding them needs the same." | Confirmed: `chmod 0755 "${PACKAGE_ROOT}/DEBIAN"` runs immediately after the three `chmod 755` calls on `postinst`/`prerm`/`postrm`, right before `dpkg-deb --build`. | `.github/actions/build-deb-packages/action.yml:123-129` |
| "Systemd service files + README are real checked-in templates, staged as RPM sources and installed via `install -m 644 %{SOURCEn}` in the spec — same idea as the desktop file/icon sources below, replacing what used to be a heredoc nested inside a heredoc" | Confirmed: `nomercy.spec` installs `%{SOURCE3}`, `%{SOURCE4}`, `%{SOURCE5}` with `install -m 644`, matching the pattern already used for `%{SOURCE1}`/`%{SOURCE2}` (desktop file/icon). No heredoc-in-heredoc remains. | `.github/actions/build-rpm-packages/action.yml:55-62`, `.github/actions/build-rpm-packages/templates/nomercy.spec:56-62` |
| "Spec file generated from the real checked-in templates/nomercy.spec by substituting {{VERSION}}/{{CHANGELOG_DATE}} — same pattern as build-arch-packages and generate-repository-website" | Confirmed for the `{{VERSION}}`/`{{CHANGELOG_DATE}}` substitution and for the same pattern in `build-arch-packages` (`{{VERSION}}` substituted into `PKGBUILD`). The `generate-repository-website` action is outside this slice's directories and was not opened, so that half of the claim is not verified here. | `.github/actions/build-rpm-packages/action.yml:64-71`, `.github/actions/build-arch-packages/action.yml:68-73` |
| "A single attempt makes the whole Arch package depend on Docker Hub answering on the first try. When it times out ... the job fails, the release ships without an Arch package, and Arch users silently get no update for that version." | Confirmed the code no longer makes a single attempt: it loops 5 times with an increasing delay (`attempt * 15` seconds) before failing with `::error::`. The comment describes the *old*, single-attempt failure mode as the reason for the current retry loop, consistent with the code that follows it. | `.github/actions/build-arch-packages/action.yml:28-41` |
| "makepkg refuses to run as root and needs real Arch tooling (fakeroot, bsdtar) to produce a correctly-ordered archive with a valid .PKGINFO/.MTREE" | Confirmed the build step creates a non-root `builder` user and runs `makepkg` via `su builder -c ...` rather than as root inside the container. `fakeroot`/`bsdtar` themselves are not explicitly installed in this step — they are assumed part of `archlinux:base-devel` (`pacman -Sy` alone is run, no explicit `pacman -S fakeroot bsdtar`); not verified against the image's actual package list. | `.github/actions/build-arch-packages/action.yml:86-103` |
| "The uid/gid are evaluated on the host and passed as explicit env values (the value-less `-e HOST_UID` form only forwards an already-exported var, which these are not — that left them unbound under the container's set -u)." | Confirmed: both `docker run` invocations use `-e HOST_UID="$(id -u)" -e HOST_GID="$(id -g)"` (explicit values), not the bare `-e HOST_UID` form. | `.github/actions/build-arch-packages/action.yml:96,124` |
| "repo-add is the real Arch tool for sync-db generation — it produces a valid nomercy.db.tar.gz (+ nomercy.db symlink) that pacman -Sy can actually parse, unlike a hand-rolled text file." | Confirmed: the repo-database step runs `repo-add nomercy.db.tar.gz *.pkg.tar.zst` inside the Arch container rather than writing any text file by hand. The `nomercy.db` symlink itself is `repo-add`'s own behavior, not asserted anywhere else in this code — not independently verified beyond trusting the tool's documented behavior. | `.github/actions/build-arch-packages/action.yml:110-131` |

## Traps

| Behavior | Why it surprises | File:line |
|---|---|---|
| DEB `prerm` stops and disables both services unconditionally, with no check on `$1`, while RPM `%preun` explicitly guards the same action behind `[ "$1" -eq 0 ]` (final-uninstall only). | A DEB *upgrade* stops and disables `nomercymediaserver.service`/`nomercylauncher.service`, while an RPM *upgrade* leaves them running and enabled. The two packaging formats behave differently for the identical operation (upgrade), and nothing in `postinst`/`%post` restarts the service afterward on either format. | `.github/actions/build-deb-packages/templates/DEBIAN/prerm:1-9` vs `.github/actions/build-rpm-packages/templates/nomercy.spec:86-92` |
| No maintainer script on any of the three formats ever runs `systemctl --user enable` or `systemctl --user start` for either service. | A user who installs the DEB or RPM or Arch package gets unit files on disk that are neither enabled nor started; the service does not come up after a fresh install without a manual step. The only place this manual step is documented in-package is the RPM's `README` (`templates/README:4-5`) — DEB and Arch ship no equivalent instruction file at all. | `.github/actions/build-deb-packages/templates/DEBIAN/postinst:1-12`, `.github/actions/build-rpm-packages/templates/nomercy.spec:77-84`, `.github/actions/build-arch-packages/templates/PKGBUILD` (no scriptlet exists to check) |
| The Arch package ships no systemd unit at all — `build-arch-packages/action.yml` never stages a `.service` file and `PKGBUILD`'s `package()` never installs one to `/usr/lib/systemd/user/`. | DEB and RPM both ship `nomercymediaserver.service`/`nomercylauncher.service`; Arch installs the same binaries to the same `/opt/nomercy` path but gives the Arch user no systemd-managed way to run them as a service at all — a capability gap between formats that isn't mentioned anywhere in the Arch action or PKGBUILD. | `.github/actions/build-arch-packages/action.yml:43-76` (files staged for the build: payload + desktop files + icon only), `.github/actions/build-arch-packages/templates/PKGBUILD:15-41` |
| The Arch package has no install scriptlet whatsoever (no `.install` file referenced by `PKGBUILD`, no `pre_install`/`post_install`/`pre_remove`/`post_remove` functions defined). | Unlike DEB (`postinst`/`prerm`/`postrm`) and RPM (`%post`/`%preun`/`%postun`), installing, upgrading, or removing the Arch package refreshes no icon cache and no desktop database, and runs no `systemctl daemon-reload` — silent by design, not an oversight visible from the code alone, but a real behavioral gap against the other two formats. | `.github/actions/build-arch-packages/templates/PKGBUILD:1-42` |
| DEB `postrm` only refreshes the icon cache and desktop database when `$1 = "purge"` — a plain `apt remove` (not `apt purge`) skips both refreshes even though the package's files, including the desktop file and icon, have already been removed from disk by that point. | Running `apt remove nomercy` (the common case) leaves stale desktop-database/icon-cache entries pointing at files that no longer exist, until something else triggers a refresh or the user runs `apt purge` instead. | `.github/actions/build-deb-packages/templates/DEBIAN/postrm:3-10` |
| `INSTALL_DIR`/install root `/opt/nomercy` is hardcoded independently in three places — a shell variable in the deb `action.yml`, a literal path in `nomercy.spec`'s `%install`/`%files`, and a literal path in `PKGBUILD`'s `package()` — with no shared source of truth across the three actions. | Changing the install location requires editing three unrelated files in three different template languages (bash heredoc/sed, RPM spec, PKGBUILD); missing one silently leaves that one format installing to the old path while the others move. | `.github/actions/build-deb-packages/action.yml:43`, `.github/actions/build-rpm-packages/templates/nomercy.spec:33`, `.github/actions/build-arch-packages/templates/PKGBUILD:16` |
| The RPM signing step (`Sign RPM repository`) imports a GPG private key with `echo "${{ inputs.gpg-private-key }}" | gpg --batch --import` and the step immediately before it (`Build RPM packages`) explicitly echoes the fully-substituted spec file to the log (`echo "Staged nomercy.spec:" && cat ...`). | The `cat`/`echo` habit used throughout all three actions to show staged file contents in the log is applied right next to a step that handles a private key as a workflow input — the key itself is not echoed, but the pattern sits close enough to warrant a second look if anyone copies the "print what was staged" habit onto the signing step itself. | `.github/actions/build-rpm-packages/action.yml:73-74,87-92` |

No file in this slice contains a comment, docstring, or string addressed to an AI agent or telling the reader/tooling to take an action beyond its own build logic; the explanatory comments found (listed in "Comment versus code" above) are all developer-to-developer rationale for shell/YAML choices, not instructions directed at whoever reads this file. Checked by reading every one of the 14 files above in full.
