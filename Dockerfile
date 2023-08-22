# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Next.js"

# Set production environment
ENV NEXT_TELEMETRY_DISABLED="1" \
    NODE_ENV="production" \
    NEXTAUTH_URL="https://skyhigh.fly.dev" \
    AUTH0_ISSUER="https://dev-wfbwpywu48mcvudq.eu.auth0.com"

# Setup sqlite3 on a separate volume
RUN mkdir -p /data
VOLUME /data
COPY skyhigh_dev.sqlite /data/skyhigh.sqlite

# Next.js app lives here
WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
#ENV DATABASE_URL="file:///data/sqlite.db"
CMD [ "npm", "run", "start" ]
