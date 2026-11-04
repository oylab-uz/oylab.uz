# Graph Report - .  (2026-11-04)

## Corpus Check
- Corpus is ~12,071 words - fits in a single context window. You may not need a graph.

## Summary
- 224 nodes · 540 edges · 11 communities detected
- Extraction: 81% EXTRACTED · 18% INFERRED · 1% AMBIGUOUS · INFERRED: 95 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output (the pipeline does not capture subagent usage; the 3 extraction subagents used ~594k tokens, per their task notifications)
- Import edges: graphify's TS extractor targeted module stems, so 83 internal `imports_from` edges were retargeted to file nodes by `graphify-out/resolve_imports.py` before the merge. External package imports are left out.

## Community Hubs (Navigation)
- [[_COMMUNITY_Landing Page Sections|Landing Page Sections]]
- [[_COMMUNITY_Cloudflare Deployment|Cloudflare Deployment]]
- [[_COMMUNITY_Section Components & Motion|Section Components & Motion]]
- [[_COMMUNITY_Content Platform Spec|Content Platform Spec]]
- [[_COMMUNITY_Header, Theme & Locale Switch|Header, Theme & Locale Switch]]
- [[_COMMUNITY_i18n Routing & SEO|i18n Routing & SEO]]
- [[_COMMUNITY_Live Moon Phase|Live Moon Phase]]
- [[_COMMUNITY_Placeholder Content & Images|Placeholder Content & Images]]
- [[_COMMUNITY_Visual Identity & Typography|Visual Identity & Typography]]
- [[_COMMUNITY_Admin Access & Hosting|Admin Access & Hosting]]
- [[_COMMUNITY_Shared Utils & Fallback Pages|Shared Utils & Fallback Pages]]

## God Nodes (most connected - your core abstractions)
1. `getMoonTonight()` - 16 edges
2. `routing` - 12 edges
3. `Cloudflare Workers via OpenNext (one Worker)` - 12 edges
4. `Hero()` - 12 edges
5. `SiteHeader()` - 12 edges
6. `LocaleLayout()` - 11 edges
7. `Live moon-phase mark (the O in OY)` - 11 edges
8. `Single-page anchored section structure` - 11 edges
9. `Content platform: journal, publications, admin (sub-project 2 of 4)` - 11 edges
10. `RevealGroup()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ThemeToggle()` --conceptually_related_to--> `Live moon-phase mark (the O in OY)`  [AMBIGUOUS]
  /Users/jr/dev/oylab.uz/src/components/header/theme-toggle.tsx → docs/DESIGN.md
- `generateStaticParams()` --conceptually_related_to--> `Per-request rendering, no cache bindings`  [INFERRED]
  /Users/jr/dev/oylab.uz/src/app/[locale]/layout.tsx → docs/DEPLOY.md
- `PlaceholderTag()` --implements--> `Placeholder content policy (placeholder flag and visible tag)`  [INFERRED]
  /Users/jr/dev/oylab.uz/src/components/ui/placeholder-tag.tsx → README.md
- `Public journal and publications pages` --conceptually_related_to--> `LocaleLayout()`  [INFERRED]
  docs/superpowers/specs/2026-11-04-content-platform-design.md → src/app/[locale]/layout.tsx
- `geist` --implements--> `Typography: Spectral, Geist, Geist Mono`  [INFERRED]
  src/app/[locale]/layout.tsx → docs/DESIGN.md

## Hyperedges (group relationships)
- **i18n routing stack driven by one routing config** — routing_routing, src_proxy_ts, src_i18n_request_ts, src_i18n_navigation_ts, layout_generatestaticparams, layout_generatemetadata, sitemap_sitemap [INFERRED 0.85]
- **Live moon per-request flow (moon math to header, hero and footer)** — moon_moonphase, moon_illumination, moon_phasename, moon_tonight_getmoontonight, moon_tonight_moontonight, layout_localelayout, page_homepage, src_components_header_site_header_tsx, src_components_sections_hero_tsx, src_components_site_footer_tsx [INFERRED 0.85]
- **Planned admin request path (Access gate, proxy host split, JWT check, admin tree, server actions)** — 2026_11_04_content_platform_design_cloudflare_access, 2026_11_04_content_platform_design_host_split_proxy, 2026_11_04_content_platform_design_access_jwt_verification, 2026_11_04_content_platform_design_admin_root_layout, 2026_11_04_content_platform_design_server_actions_contract, src_proxy_ts [INFERRED 0.80]
- **Reduced-motion handling across motion layers** — providers_providers, hero_hero, marquee_marquee, research_visuals_tokenstream, research_visuals_surrogatecurve, research_visuals_latticepulse, research_visuals_fieldgraph [INFERRED 0.90]
- **DOM-driven interactions without React state** — spotlight_tile_spotlighttile, magnetic_button_magneticbutton, theme_toggle_themetoggle [INFERRED 0.85]
- **Dark-mode persistence across paint, remount and toggle** — theme_init_themeinit, theme_init_bootstrap, theme_theme_storage_key, providers_providers, theme_applystoredtheme, theme_toggle_themetoggle [EXTRACTED 1.00]
- **OY Lab Moon Mark Rendering** — icon_moon_glyph, src_components_moon_moon_disc_tsx, moon_moonpath [INFERRED 0.80]

## Communities

### Community 0 - "Landing Page Sections"
Cohesion: 0.13
Nodes (17): Landing publications read from D1 (placeholder array leaves content.ts), publications, researchAreas, stats, Why paper titles stay in English across locales (as on arXiv), CSS-only hero reveal (keyframe stagger), Hero: 7/5 split, live moon disc, magnetic CTA, stats row, Single-page anchored section structure (+9 more)

### Community 1 - "Cloudflare Deployment"
Cohesion: 0.13
Nodes (23): D1 database 'oylab' with Drizzle ORM (src/db), ISR upgrade path (R2 incremental cache, DO queue, D1 tag cache), Local dev bindings via initOpenNextCloudflareForDev, Testing strategy (Vitest, workerd integration, browser flow, CI), Why ISR is deferred: more moving parts than the traffic justifies, Next.js agent rules: read node_modules/next/dist/docs before coding, Why read the bundled docs: this Next.js has breaking changes vs training data, Cache Components disabled (cacheComponents, partialPrefetching) (+15 more)

### Community 2 - "Section Components & Motion"
Cohesion: 0.17
Nodes (25): a11y translation namespace, Motion principles: springs, staggered reveals, reduced motion, Hero(), Hero readable before JavaScript, Join(), MagneticButton(), Band(), Marquee() (+17 more)

### Community 3 - "Content Platform Spec"
Cohesion: 0.11
Nodes (24): Admin editor (per-locale tabs, CodeMirror 6, renderPreview), Worker bundle budget (1.4 of 3 MiB gzip; Workers Paid above 2.5 MiB), Content platform: journal, publications, admin (sub-project 2 of 4), Markdown pipeline (src/lib/markdown.ts: remark, rehype, KaTeX, sanitize), media table, post_translations table, posts table, Primary language plus optional translations, with fallback notice (+16 more)

### Community 4 - "Header, Theme & Locale Switch"
Cohesion: 0.18
Nodes (14): Client Component, Locale switcher (EN, UZ, RU labels), Nav: sticky bar with moon mark, locale switch, theme toggle, Surface and Night themes (dark class, no theme library), Locale switch remounts layout, LocaleSwitcher(), Providers(), localeLabels (+6 more)

### Community 5 - "i18n Routing & SEO"
Cohesion: 0.19
Nodes (14): Translation-aware SEO (hreflang, canonical, sitemap entries), Why fallback pages canonicalize to the primary URL: no duplicate bodies indexed, site, English default locale at / (/uz and /ru prefixed), Locale detection off (choice kept in a cookie), Why English at /: switched from uz on 2026-11-04 at the user's request, Next.js app/icon.svg Auto-Favicon Convention, generateMetadata() (+6 more)

### Community 6 - "Live Moon Phase"
Cohesion: 0.2
Nodes (15): Live moon-phase mark (the O in OY), Moon Glyph Favicon (fixed waxing gibbous ~73% lit, thick 3-unit rim), Static Grey Hex Palette #8a8a8a/#f4f4f2/#5a5a5a (no CSS vars in favicon), MoonDisc(), moonPath(), moonPhase(), phaseName(), moon.phases translation namespace (+7 more)

### Community 7 - "Placeholder Content & Images"
Cohesion: 0.21
Nodes (13): Cloudflare Image Transformations loader (src/lib/image-loader.ts), Next spec: site customization (site_settings, team_members), PLACEHOLDER_CONTENT, team, Cloudflare Images loader (planned for real portraits), images.unoptimized on the Worker, Why images.unoptimized: the Worker has no image optimizer, i.pravatar.cc placeholder portraits (+5 more)

### Community 8 - "Visual Identity & Typography"
Cohesion: 0.19
Nodes (14): .prose-moon typography class, Achromatic OKLCH palette (chroma 0), Lunar regolith material (achromatic, hairlines, grain overlay), Concept: the moon as a system, Research in phases: Question, Experiment, Publish, Deploy, Typography: Spectral, Geist, Geist Mono, Why every face needs Cyrillic: Russian sits beside Uzbek and English, Why no accent color: emphasis by inversion, weight and spacing (+6 more)

### Community 9 - "Admin Access & Hosting"
Cohesion: 0.17
Nodes (13): Access JWT verification (src/lib/access.ts, jose), Admin nav file src/app/admin/nav.ts (Roles, Applications, Site slots reserved), Admin root layout (src/app/admin/layout.tsx, English only), Cloudflare Access gate (one-time PIN, lab email allowlist), Host split in proxy.ts (admin host rewrite, /admin 404 elsewhere), Next spec: HR (roles, applications, private CV bucket), One Worker, two hostnames (oylab.uz, admin.oylab.uz), Why 401, never a redirect: a misconfigured Access cannot loop (+5 more)

### Community 10 - "Shared Utils & Fallback Pages"
Cohesion: 0.29
Nodes (6): Header links through next-intl Link; Journal and Publications routes, cn(), container, Link, NotFound(), CatchAllPage()

## Ambiguous Edges - Review These
- `next.config.ts` → `Placeholder content policy (placeholder flag and visible tag)`  [AMBIGUOUS]
  README.md · relation: references
- `next.config.ts` → `i.pravatar.cc placeholder portraits`  [AMBIGUOUS]
  docs/DESIGN.md · relation: references
- `process.tsx` → `MoonTonight`  [AMBIGUOUS]
  docs/DESIGN.md · relation: shares_data_with
- `ThemeToggle()` → `Live moon-phase mark (the O in OY)`  [AMBIGUOUS]
  docs/DESIGN.md · relation: conceptually_related_to
- `getMoonTonight()` → `DESIGN.md`  [AMBIGUOUS]
  docs/DESIGN.md · relation: references
- `DESIGN.md` → `routing`  [AMBIGUOUS]
  docs/DESIGN.md · relation: references
- `Cloudflare Workers via OpenNext (one Worker)` → `ISR upgrade path (R2 incremental cache, DO queue, D1 tag cache)`  [AMBIGUOUS]
  docs/DEPLOY.md · relation: conceptually_related_to

## Knowledge Gaps
- **24 isolated node(s):** `container`, `PLACEHOLDER_CONTENT`, `stats`, `researchAreas`, `localeLabels` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `next.config.ts` and `Placeholder content policy (placeholder flag and visible tag)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `next.config.ts` and `i.pravatar.cc placeholder portraits`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `process.tsx` and `MoonTonight`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **What is the exact relationship between `ThemeToggle()` and `Live moon-phase mark (the O in OY)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `getMoonTonight()` and `DESIGN.md`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `DESIGN.md` and `routing`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Cloudflare Workers via OpenNext (one Worker)` and `ISR upgrade path (R2 incremental cache, DO queue, D1 tag cache)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._