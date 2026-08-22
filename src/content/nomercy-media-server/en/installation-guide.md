---
title: Installation Guide
description: Complete step-by-step guide for installing NoMercy.
---

There is no tarball download or `install.sh`/`install.bat` script. Pick the page for your platform below; each one covers the real installer for that channel.

## Choose your platform

- [Windows](/nomercy-media-server/installation/windows)
- [Linux (.deb)](/nomercy-media-server/installation/linux-deb)
- [Linux (.rpm)](/nomercy-media-server/installation/linux-rpm)
- [Linux (Arch)](/nomercy-media-server/installation/linux-arch)
- [macOS](/nomercy-media-server/installation/macos)
- [Docker](/nomercy-media-server/installation/docker)
- [NAS](/nomercy-media-server/installation/nas)

Linux packages are published to `repo.nomercy.tv` (apt, rpm, and Arch repositories); Docker images are published to `ghcr.io/nomercy-entertainment/nomercymediaserver`.

## After installing

Once the server is running, open the setup page at `http://localhost:7626/setup` (or your server's address) to complete first-run configuration. See [First Run](/nomercy-media-server/first-run).

## Requirements

- **Operating System**: Windows 10+, macOS 10.12+, or Linux (Ubuntu 20.04+ recommended)
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: At least 10GB free space for application and database
- **Network**: Stable internet connection for initial setup

## Troubleshooting

If you encounter installation issues:

- Check that your system meets the minimum requirements
- Ensure port 7626 is available (the server also binds a loopback-only health check on 7627)
- Review the installation logs
- Consult the FAQ or open an issue on GitHub
