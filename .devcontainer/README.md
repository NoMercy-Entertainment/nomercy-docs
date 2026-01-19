# Dev Container Setup

This project includes a development container configuration for consistent development environments.

## Prerequisites

- Docker and Docker Compose
- VS Code with Remote - Containers extension
- Git

## Quick Start with VS Code

1. **Open in Container**: 
   - Open the project in VS Code
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Select "Dev Containers: Reopen in Container"
   - VS Code will build and start the container

2. **Automatic Setup**:
   - The container will automatically run `npm install`
   - All VS Code extensions will be installed
   - The dev server will be ready to use

3. **Start Development**:
   - Run `npm run dev` in the terminal
   - Access the site at `http://localhost:4321`

## Manual Docker Compose Setup

If you prefer using Docker Compose directly:

```bash
# Build and start the container
docker-compose -f .devcontainer/docker-compose.yml up -d

# Access the running container
docker-compose -f .devcontainer/docker-compose.yml exec app bash

# View logs
docker-compose -f .devcontainer/docker-compose.yml logs -f

# Stop the container
docker-compose -f .devcontainer/docker-compose.yml down
```

## Available Commands

Inside the dev container:

```bash
npm run dev      # Start development server on port 4321
npm run build    # Build for production
npm run preview  # Preview production build
npm run astro    # Run Astro CLI commands
```

## Port Forwarding

- **Port 4321**: Astro dev server (automatically forwarded)

## VS Code Extensions

The following extensions are automatically installed in the dev container:

- **Astro** - Official Astro language support
- **Tailwind CSS IntelliSense** - Tailwind CSS utilities
- **Prettier** - Code formatter
- **ESLint** - JavaScript linter
- **GitHub Copilot** - AI coding assistant

## Environment Variables

The dev container runs with `NODE_ENV=development` by default.

## Troubleshooting

### Container won't start
- Ensure Docker is running
- Check Docker daemon logs
- Try rebuilding: `Dev Containers: Rebuild Container`

### Port 4321 already in use
- Kill existing process: `lsof -ti :4321 | xargs kill -9` (macOS/Linux)
- Or change port in `devcontainer.json`

### npm install failures
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Rebuild container

## Notes

- `node_modules` is isolated in the container to prevent conflicts
- All file changes are synced between host and container
- The container uses Node.js 20 LTS (latest stable)
