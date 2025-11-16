# Use the official Bun image (includes Node, npm, etc.)
FROM oven/bun:latest

# Install dependencies for better-auth
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      python3 build-essential pkg-config sqlite3 && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Expose default dev port
EXPOSE 3000

# Default command: interactive shell
CMD ["bash"]