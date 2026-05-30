---
title: Installation Guide
description: Complete step-by-step guide for installing NoMercy.
---

## Installation Requirements

Before installing NoMercy, ensure your system meets the following requirements:

- **Operating System**: Windows 10+, macOS 10.12+, or Linux (Ubuntu 20.04+ recommended)
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: At least 10GB free space for application and database
- **Network**: Stable internet connection for initial setup

## Installation Steps

### 1. Download NoMercy

Visit the official NoMercy GitHub repository and download the latest release suitable for your operating system.

### 2. Extract Files

Extract the downloaded archive to your preferred installation directory:

```bash
# Example on Linux/macOS
tar -xzf nomercy-latest.tar.gz -C /opt/nomercy

# Or on Windows, use your preferred extraction tool
```

### 3. Run Installation Script

Execute the installation script appropriate for your system:

```bash
# Linux/macOS
cd /opt/nomercy
./install.sh

# Windows
cd C:\Program Files\NoMercy
.\install.bat
```

### 4. Configure Basic Settings

During installation, you'll be prompted to:

- Set the installation directory
- Configure database connection
- Set up initial admin account
- Configure media storage paths

### 5. Start the Service

After installation, start the NoMercy service:

```bash
# Linux/macOS
sudo systemctl start nomercy

# Windows
net start NoMercyService
```

## Verification

To verify successful installation, access the NoMercy web interface:

- **URL**: http://localhost:7000 (default)
- **Admin Account**: Use the credentials you created during installation

## Next Steps

Once installed:

1. [Configure MediaServer](/mediaserver/configuration) - Set up media storage
2. [Add Content](/apps/getting-started) - Start adding your entertainment files
3. Access the web interface to begin organizing your library

## Troubleshooting

If you encounter installation issues:

- Check that your system meets the minimum requirements
- Ensure all required ports are available (default: 7000, 7001)
- Review the installation logs in the `/logs` directory
- Consult the FAQ or open an issue on GitHub

## Getting Help

For additional support:

- Visit the [NoMercy Documentation](/apps/getting-started)
- Check out the [MediaServer Guide](/mediaserver/overview)
- Open an issue on the GitHub repository
