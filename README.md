# oylab.uz

OY Lab, a frontier research lab for computing and science in Tashkent. Three languages
(English at `/`, Uzbek at `/uz`, Russian at `/ru`), a moon-grey palette.

- `apps/site`: the public site, a static export served by Cloudflare Workers Static Assets.
- `apps/admin`: the editor for journal posts and publications, a Next.js server in a
  Docker container on the lab's Hetzner box, behind Cloudflare Access.
- `packages/content`: shared locale list, snapshot contract, Markdown pipeline, slug rules.

How the pieces fit, with diagrams: `docs/ARCHITECTURE.md`. Runbook: `docs/DEPLOY.md`.
Visual design decisions: `docs/DESIGN.md`.

## Commands

```
pnpm install
pnpm dev                    # site, http://localhost:3000
pnpm dev:admin              # admin, http://localhost:3300 (no login in development)
pnpm --filter admin seed    # sample posts and draft publications
pnpm lint && pnpm typecheck && pnpm test
pnpm build                  # static site -> apps/site/out
pnpm preview                # serve the export with wrangler
pnpm deploy                 # publish the site (needs wrangler login)
```

## Content rules

One primary language per post or publication, optional translations, fallback to the
primary with a notice. Markdown with tables, footnotes, KaTeX math and fenced code,
rendered on save. Slugs come from the title and lock once published. Uzbek copy uses
U+02BC (ʼ) for oʼ and gʼ.

Placeholder content (team, stats) lives in `apps/site/src/lib/content.ts` and is flagged
`placeholder: true` until real data replaces it.
