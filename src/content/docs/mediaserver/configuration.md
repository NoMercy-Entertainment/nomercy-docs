---
title: MediaServer Configuration
description: Detailed guide for configuring NoMercy MediaServer.
---

## Configuration Overview

MediaServer configuration involves setting up media paths, database connections, streaming parameters, and monitoring options.

## Configuration Files

MediaServer uses a configuration file typically located at:

```
/etc/nomercy/mediaserver.conf (Linux/macOS)
C:\ProgramData\NoMercy\mediaserver.conf (Windows)
```

## Basic Configuration

### 1. Media Paths

Define the directories where your media files are stored:

```conf
[media]
movie_path = /media/movies
tv_path = /media/tv
music_path = /media/music
images_path = /media/images
```

### 2. Database Connection

Configure the database connection for storing media metadata:

```conf
[database]
type = postgresql
host = localhost
port = 5432
name = nomercy_media
user = mediauser
password = secure_password
```

### 3. Indexing Settings

Control how MediaServer indexes your content:

```conf
[indexing]
auto_scan = true
scan_interval = 3600
deep_scan = false
follow_symlinks = true
```

### 4. Streaming Configuration

Set up streaming parameters:

```conf
[streaming]
max_connections = 10
default_bitrate = 5000
enable_transcoding = true
cache_enabled = true
cache_size = 5GB
```

## Advanced Configuration

### Performance Tuning

Optimize MediaServer performance:

```conf
[performance]
worker_threads = 4
connection_pool_size = 20
cache_ttl = 3600
```

### Monitoring & Logging

Enable monitoring and logging:

```conf
[monitoring]
enable_monitoring = true
log_level = info
log_path = /var/log/nomercy/mediaserver.log
health_check_interval = 300
```

## Configuration Best Practices

1. **Security**
   - Use strong database passwords
   - Restrict file permissions on configuration files
   - Keep credentials out of version control

2. **Performance**
   - Adjust worker threads based on CPU cores
   - Configure appropriate cache sizes
   - Monitor system resources during initial setup

3. **Backup**
   - Regularly backup your media metadata database
   - Create snapshots of your configuration
   - Test restore procedures periodically

4. **Updates**
   - Review configuration after updates
   - Test changes in development before production
   - Maintain version history of configurations

## Troubleshooting

### High CPU Usage
- Reduce worker threads
- Disable deep scanning
- Check for indexing issues

### Slow Streaming
- Increase cache size
- Reduce maximum concurrent connections
- Enable transcoding optimization

### Missing Media Files
- Verify media paths are correct
- Check file permissions
- Run a full scan of media directories

## Next Steps

- [MediaServer Overview](/mediaserver/overview) - Return to overview
- [Getting Started](/apps/getting-started) - Back to main guide
- [Installation Guide](/apps/installation) - Installation reference

## Need Help?

For configuration issues:
- Check the system logs for error messages
- Verify directory permissions and accessibility
- Consult the troubleshooting section above
- Contact support or open an issue on GitHub
