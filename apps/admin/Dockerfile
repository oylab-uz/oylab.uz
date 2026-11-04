# Build context is the repository root: docker build -f apps/admin/Dockerfile .
# bun installs and builds; the server runs on Node (Next.js standalone output).
FROM node:22-bookworm-slim AS base
COPY --from=oven/bun:1.3 /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /repo

FROM base AS deps
# better-sqlite3 compiles its native module when no prebuilt binary matches.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY package.json bun.lock ./
COPY apps/site/package.json apps/site/
COPY apps/admin/package.json apps/admin/
COPY packages/content/package.json packages/content/
RUN bun install --frozen-lockfile

FROM deps AS build
COPY packages/content packages/content
COPY apps/admin apps/admin
RUN bun run --filter admin build
# Output tracing drops better-sqlite3's compiled binary (loaded through "bindings" at runtime).
# Copy the real package and its helpers next to the standalone server.
COPY apps/admin/deploy/copy-native.cjs /tmp/copy-native.cjs
RUN cd apps/admin && node /tmp/copy-native.cjs

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 DATABASE_PATH=/data/oylab.sqlite
WORKDIR /app
# The standalone output mirrors the workspace layout: apps/admin/server.js plus node_modules.
COPY --from=build /repo/apps/admin/.next/standalone ./
COPY --from=build /repo/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=build /repo/apps/admin/drizzle ./apps/admin/drizzle
RUN mkdir -p /data && chown -R node:node /data /app
USER node
WORKDIR /app/apps/admin
EXPOSE 3000
CMD ["node", "server.js"]
