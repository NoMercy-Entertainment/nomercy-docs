# Node.js 22, the same major as .nvmrc and package.json engines (>=22.12.0)
FROM mcr.microsoft.com/devcontainers/javascript-node:22-bullseye

# Install additional tools
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./

# Install dependencies
RUN corepack enable && yarn install --immutable

# Expose Astro dev server port
EXPOSE 4321

# Default command
CMD ["yarn", "dev"]
