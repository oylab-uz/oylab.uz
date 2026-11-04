# Build context is the repository root: docker build -f apps/admin/Dockerfile .
FROM node:22-bookworm-slim AS base
RUN npm install -g pnpm@11.1.2
WORKDIR /repo

FROM base AS deps
# better-sqlite3 compiles its native module when no prebuilt binary matches.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/admin/package.json apps/admin/
COPY packages/content/package.json packages/content/
RUN pnpm install --frozen-lockfile --filter admin...

FROM deps AS build
COPY packages/content packages/content
COPY apps/admin apps/admin
RUN pnpm --filter admin build

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 DATABASE_PATH=/data/oylab.sqlite
WORKDIR /app
# The standalone output mirrors the workspace layout: apps/admin/server.js plus node_modules.
COPY --from=build /repo/apps/admin/.next/standalone ./
COPY --from=build /repo/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=build /repo/apps/admin/public ./apps/admin/public
COPY --from=build /repo/apps/admin/drizzle ./apps/admin/drizzle
RUN mkdir -p /data && chown -R node:node /data /app
USER node
WORKDIR /app/apps/admin
EXPOSE 3000
CMD ["node", "server.js"]
