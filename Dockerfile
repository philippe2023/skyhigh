# syntax = docker/dockerfile:1

FROM node:18-alpine as base

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
#RUN apt-get update -qq && \
#    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link package-lock.json package.json ./
# force needed to install canary version of next when also using next-auth
# https://github.com/nextauthjs/next-auth/pull/5657#pullrequestreview-1161391092
RUN npm ci --include=dev --force

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
# force see npm ci comment above
RUN npm prune --omit=dev --force

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
#ENV DATABASE_URL="file:///data/sqlite.db"
CMD [ "npm", "run", "start" ]
