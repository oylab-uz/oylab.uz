# Deploying oylab.uz to Cloudflare Workers

The site runs as one Cloudflare Worker built with the OpenNext adapter
(`@opennextjs/cloudflare`). Every page renders per request; static assets
(`/_next/static`, `public/`) are served by Workers Static Assets. There are no
cache bindings yet. When articles and the admin land, the same Worker gains
R2, D1 and a Durable Object queue, and `admin.oylab.uz` becomes a second route
entry in `wrangler.jsonc`.

## Why not Cache Components

Next 16 Cache Components (`cacheComponents`, `partialPrefetching`) do not work
on Workers through OpenNext yet: the static shell is served without the dynamic
parts, or the request hangs (opennextjs-cloudflare issues 1115, 1225, 1349,
1450). They are off, and `getMoonTonight()` waits for the request with
`connection()` instead of using `"use cache"`.

## One-time setup (account owner)

1. Add `oylab.uz` as a zone in the Cloudflare account and switch the
   nameservers at the .uz registrar to the two that Cloudflare shows. Custom
   domains for Workers require the zone to be active on the same account.
   Wait until the zone status is Active.
2. Log in once on the machine that deploys:

   ```
   pnpm wrangler login
   ```

3. Deploy:

   ```
   pnpm run deploy
   ```

   This runs `next build`, converts the output with OpenNext and uploads the
   Worker. Wrangler creates the DNS record and the TLS certificate for
   `oylab.uz` from the `routes` entry. Check `https://oylab.uz`, `/uz` and
   `/ru`.

4. `www.oylab.uz`: add a proxied `AAAA` record `www` pointing to `100::`, then
   Rules, Redirect Rules, template "Redirect from WWW to root", status 301.
   No code involved.

5. Continuous deploys: Workers & Pages, `oylab`, Settings, Builds, connect the
   GitHub repository `oylab-uz/oylab.uz`. Build command
   `pnpm exec opennextjs-cloudflare build`, deploy command
   `pnpm exec opennextjs-cloudflare deploy`, production branch `main`. Every
   push to `main` then deploys; other branches get preview URLs.

If the zone is not active yet and you want to see the Worker on its
`workers.dev` URL first, set `"workers_dev": true` and remove the `routes`
block in `wrangler.jsonc` temporarily, then put both back. The `workers.dev`
hostname stays off in normal operation: it would duplicate the site and, once
the admin exists, bypass Cloudflare Access, which protects hostnames, not the
Worker.

## Known warning: Node.js middleware

`src/proxy.ts` (the next-intl locale router, later also the admin host router)
runs as Next.js Node.js middleware. The OpenNext build prints
`WARN Node.js middleware support is experimental in cloudflare`. Locale
prefixes, the `/en` redirect to `/` and 404s were verified in the workerd
preview on 2026-11-04. Re-check this after every adapter upgrade.

## Local preview in the Workers runtime

```
pnpm run preview
```

Builds and serves the Worker with workerd on localhost. This is the closest
check to production; `pnpm dev` runs the Node.js dev server and does not
exercise the Worker build.

## Images

`images.unoptimized` is on because the Worker has no image optimizer. The team
portraits are placeholders today. When real photos arrive, upload them to
Cloudflare Images and switch `next.config.ts` to the Cloudflare Images loader
described at https://opennext.js.org/cloudflare/howtos/image.

## Versions

Pinned in `package.json`: `next` 16.4.5 (the adapter's minimum for the 16
line), `@opennextjs/cloudflare` 1.20.16, `wrangler` 4.157.0. The
`compatibility_date` in `wrangler.jsonc` must not be later than the workerd
build that ships with the pinned wrangler.
