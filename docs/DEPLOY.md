# Deploying oylab.uz

Read `ARCHITECTURE.md` first. Two deployables: the static site on Cloudflare Workers, the
admin container on the Hetzner box. Nothing here changes DNS; those steps are listed for
the account owner.

## Public site: Cloudflare Workers Static Assets

Worker `oylab`, assets-only (`apps/site/wrangler.jsonc` has no `main`), custom domain
`oylab.uz`, `workers.dev` and preview URLs off.

```
pnpm build        # next build -> apps/site/out  (fetches the snapshot first)
pnpm run preview  # build, then wrangler dev on http://localhost:8787
pnpm run deploy   # build, then wrangler deploy ("run" matters: pnpm has a built-in "deploy")
```

`pnpm wrangler deploy --dry-run` checks the configuration without
uploading.

One-time setup, in order:

1. Zone `oylab.uz` active on the Cloudflare account (nameservers switched at the
   registrar; mail records imported first).
2. `pnpm wrangler login` once on the deploying machine (the root `wrangler` script targets apps/site), then `pnpm run deploy`. Wrangler
   creates the Worker, the DNS record and the certificate for `oylab.uz`. Check `/`,
   `/uz`, `/ru`, `/en` (301), `/nope` (404).
3. `www.oylab.uz`: proxied `AAAA` record `www` pointing at `100::`, Redirect Rule
   "Redirect from WWW to root", 301.
4. Continuous builds: Workers & Pages, `oylab`, Settings, Builds, connect
   `oylab-uz/oylab.uz`. Root directory `/`, build command `pnpm --filter site build`,
   deploy command `pnpm --filter site exec wrangler deploy`, production branch `main`.
   The build needs no secrets: the snapshot is public.
5. Deploy hook: Settings, Builds, Deploy Hooks, create one for `main`. Its URL is a
   secret; it goes into the admin's `.env` as `DEPLOY_HOOK_URL`.

After the first deploy, Worker metrics show no invocations for page views.

## Media: R2

1. `pnpm wrangler r2 bucket create oylab-media`.
2. R2, `oylab-media`, Settings, Custom Domains: add `media.oylab.uz`. Enable
   Transformations for the zone if resized images are wanted later.
3. R2, Manage API tokens: a token with Object Read & Write on `oylab-media`. Its
   Access Key ID and Secret Access Key go into the admin's `.env`, with the account id.

## Admin: Hetzner box

Already in place on the box (`ssh server`, user `dev`):

- `~/apps/admin.oylab.uz/`: `repo` (clone of this repository), `docker-compose.yml` and
  `update.sh` (copies of `apps/admin/deploy/`), `.env` (secrets, not in git).
- Container `oylab-admin`, image built from `apps/admin/Dockerfile`, SQLite on the
  volume `oylab_admin_data` at `/data`, joined to `caddy_network`, health check on
  `/healthz`.
- Caddy block in `~/apps/caddy/Caddyfile`:
  `admin.oylab.uz { reverse_proxy oylab-admin:3000 }`.

Until `.env` has the Access values, every request answers 401 (fail closed); until it has
the R2 values, uploads and snapshots go to the container's local folder.

### `.env` on the box

See `apps/admin/.env.example`. Required for production: `CF_ACCESS_TEAM_DOMAIN`,
`CF_ACCESS_AUD`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
`R2_BUCKET=oylab-media`, `MEDIA_PUBLIC_URL=https://media.oylab.uz`, `DEPLOY_HOOK_URL`,
`DATABASE_PATH=/data/oylab.sqlite`.

### Cloudflare side for the admin

1. DNS: a **proxied** (orange cloud) `AAAA` record `admin` to the box's IPv6 (and an `A`
   record to its IPv4 if the box has one). Access only works on proxied records. Caddy
   obtains its certificate over HTTP-01 through the proxy; keep the zone's SSL mode on
   "Full".
2. Zero Trust, Access, Applications: self-hosted application "OY Lab Admin" for
   `admin.oylab.uz`. Login method: one-time PIN by email to start (Google can be added
   later). Policy: Allow, the lab's email addresses. Copy the team domain
   (`<team>.cloudflareaccess.com`) and the application's Audience tag into `.env`.
3. Fill the R2 values and the deploy hook URL, then on the box:
   `cd ~/apps/admin.oylab.uz && docker compose up -d`.

### Updating the admin

```
ssh server
cd ~/apps/admin.oylab.uz && ./update.sh      # git pull, rebuild image, restart
docker compose logs -f oylab-admin           # logs
```

### Backup

The whole state is one SQLite file plus R2. Copy the file out of the volume:

```
docker run --rm -v oylab_admin_data:/data -v "$PWD":/backup alpine \
  sh -c "cp /data/oylab.sqlite /backup/oylab-$(date +%F).sqlite"
```

## What is still untested end to end

The admin → R2 → deploy hook → Workers Builds leg needs the bucket, token and hook to
exist. Everything up to the snapshot file and everything from a snapshot file to the
served site has been verified locally and in the Workers runtime.

## Versions

`next` 16.4.5, `wrangler` 4.157.0 (`compatibility_date` no later than 2026-11-03),
`better-sqlite3` 13, Node 22 in the image. Pinned in the package files.
