---
title: MediaServer Configuration
description: How to configure NoMercy MediaServer using startup flags, environment variables, and the in-app web UI.
category: "Configuration"
order: 1
---

## There Is No Config File

NoMercy MediaServer has no configuration file. There is no `.conf`, `.ini`, `.yaml`, or `.json` file to edit. Settings are controlled in two places:

- **Startup flags** (or environment variables) — port, IP address, log level, and a few launch-time options
- **Web UI** — everything else: libraries, users, encoder settings, and general preferences

Open `http://<your-server-ip>:7626` after the server starts to reach the dashboard.

---

## Startup Flags

Pass flags directly when launching the server binary. Flags are processed by `NoMercyMediaServer` (the service binary), not by the `nomercy` CLI wrapper.

| Flag | Short | Default | Description |
|:--|:--|:--|:--|
| `--internal-port` | `-i` | `7626` | Port the server listens on for all client traffic |
| `--external-port` | `-x` | `7626` | Port reported to the NoMercy API for external access (set this if your router NATs to a different port) |
| `--internal-ip` | | auto-detected | LAN IP address override — overrides the address the server advertises on your local network |
| `--external-ip` | | auto-detected | Public IP override — overrides the externally reported address |
| `--loglevel` | `-l` | `Information` | Log verbosity. Valid values: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Fatal` |
| `--service` | | off | Run as a platform service (Windows SCM, Linux systemd, macOS launchd). Sets working directory to the executable's location. |
| `--pipe-name` | | platform default | Named pipe (Windows) or Unix socket filename used for the `nomercy` CLI IPC channel |
| `--dev` | `-d` | off | Development mode — points the server at `api-dev.nomercy.tv` and `auth-dev.nomercy.tv` instead of production |
| `--seed` | | off | Seeds the database with sample data on first start |

**Example:**

```bash
# Linux — run on a non-default port with verbose logging
./NoMercyMediaServer --internal-port 8080 --loglevel Debug

# Windows — run as a Windows service
NoMercyMediaServer.exe --service
```

---

## Environment Variables

Every flag has a matching environment variable. Environment variables are applied when the corresponding flag is not passed. This is the primary way to configure Docker deployments.

| Variable | Equivalent Flag | Example |
|:--|:--|:--|
| `NOMERCY_INTERNAL_PORT` | `--internal-port` | `7626` |
| `NOMERCY_EXTERNAL_PORT` | `--external-port` | `7626` |
| `NOMERCY_INTERNAL_IP` | `--internal-ip` | `192.168.1.100` |
| `NOMERCY_EXTERNAL_IP` | `--external-ip` | `1.2.3.4` |
| `NOMERCY_LOG_LEVEL` | `--loglevel` | `Debug` |
| `NOMERCY_DEV` | `--dev` | `true` |
| `NOMERCY_SEED` | `--seed` | `true` |
| `NOMERCY_PIPE_NAME` | `--pipe-name` | `nomercy-ipc` |

---

## Docker: The HOST_IP Requirement

When running in Docker, the container cannot auto-detect your host machine's LAN IP. You must supply it via the `NOMERCY_INTERNAL_IP` environment variable, which the provided compose files map from a `HOST_IP` shell variable.

```bash
# Set HOST_IP to your machine's LAN IP before running compose
export HOST_IP=$(hostname -I | awk '{print $1}')

docker compose up -d
```

The compose file contains:

```yaml
environment:
  - NOMERCY_INTERNAL_IP=${HOST_IP}
```

If you skip this step, the server starts but clients on other devices may not be able to discover or connect to it. You can also hard-code the value directly in the compose file instead of using the shell variable.

For GPU-accelerated transcoding, use the matching compose variant:

```bash
docker compose -f docker-compose.nvidia.yml up -d   # NVIDIA
docker compose -f docker-compose.intel.yml up -d    # Intel Quick Sync
docker compose -f docker-compose.amd.yml up -d      # AMD
```

---

## Adding Libraries via the Web UI

After first login, add your media libraries through the web dashboard. Navigate to **Settings > Libraries**, then click **Add Library**. Choose the library type (Movies, TV Shows, or Music), give it a name, and select the folder path where your media files live. The server will begin scanning immediately.

Library paths must be accessible to the server process. For Docker, this means the folder must be mounted as a volume in your compose file. The provided compose template includes commented-out volume entries under `/media/movies`, `/media/tv`, and `/media/music` — uncomment and adjust those paths to match your actual media locations before starting the container.

---

## Port Forwarding

To access your server from outside your home network, forward port `7626` (or whichever port you configured) on your router to your server's LAN IP. Once a certificate is issued during first-run setup, the server uses HTTPS automatically.

---

## Next Steps

- [MediaServer Overview](/mediaserver/overview) - Return to overview
- [Installation Guide](/apps/installation) - Installation reference
