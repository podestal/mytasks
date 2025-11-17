# Use the official Bun image (includes Node, npm, etc.)
FROM oven/bun:latest

# Install dependencies including Node.js v20 for Wrangler
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      python3 build-essential pkg-config sqlite3 curl ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get remove -y nodejs npm 2>/dev/null || true && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Expose default dev port
EXPOSE 3000

# Default command: interactive shell
CMD ["bash"]