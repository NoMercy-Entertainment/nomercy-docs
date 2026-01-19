# Start with Node.js 20 LTS
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bullseye

# Install additional tools
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Expose Astro dev server port
EXPOSE 4321

# Default command
CMD ["npm", "run", "dev"]
