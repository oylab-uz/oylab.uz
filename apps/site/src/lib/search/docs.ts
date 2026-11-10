import type { Locale } from "@oylab/content/locales";
import { resolveTranslation, type Snapshot } from "@oylab/content/snapshot";
import { researchAreas, site, team } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type en from "../../../messages/en.json";
import { htmlToText } from "./html-text";

export type SearchGroup = "sections" | "journal" | "publications" | "people";

export type SearchDoc = {
  id: string;
  group: SearchGroup;
  title: string;
  /** Where the entry lives: a section name, a date, a venue. Empty for the sections themselves. */
  subtitle: string;
  /** Plain text, searched after the title and quoted in the result. */
  text: string;
  /** Locale-free path, as next-intl's Link and router take it. */
  href: string;
  /** Offered before anything is typed. */
  pinned?: true;
};

export type SearchIndex = { version: 1; locale: Locale; docs: SearchDoc[] };

export type Messages = typeof en;

/** A long post is searchable to this many characters; beyond it only its title and summary would matter anyway. */
const MAX_TEXT = 20_000;

const clean = (text: string) => text.normalize("NFC").replace(/\s+/g, " ").trim();

/**
 * Everything a visitor can search in one locale: the landing page section by
 * section, then journal posts and publications from the snapshot. Built at
 * build time and served as a static file; see app/search-index.
 */
export function buildSearchIndex(locale: Locale, m: Messages, snapshot: Snapshot): SearchIndex {
  const docs: SearchDoc[] = [];
  const add = (doc: SearchDoc) =>
    docs.push({ ...doc, title: clean(doc.title), subtitle: clean(doc.subtitle), text: clean(doc.text).slice(0, MAX_TEXT) });

  add({
    id: "home",
    group: "sections",
    title: m.meta.siteName,
    subtitle: "",
    text: `${m.hero.title} ${m.hero.lead}`,
    href: "/",
    pinned: true,
  });

  add({ id: "mission", group: "sections", title: m.mission.eyebrow, subtitle: "", text: m.mission.statement, href: "/#mission", pinned: true });
  m.mission.goals.forEach((goal, i) =>
    add({ id: `mission:${i}`, group: "sections", title: goal.title, subtitle: m.mission.eyebrow, text: goal.body, href: "/#mission" }),
  );

  add({
    id: "research",
    group: "sections",
    title: m.nav.research,
    subtitle: "",
    text: `${m.research.title} ${m.research.lead}`,
    href: "/#research",
    pinned: true,
  });
  for (const area of researchAreas) {
    const copy = m.research.areas[area.id];
    add({ id: `research:${area.id}`, group: "sections", title: copy.title, subtitle: m.nav.research, text: copy.body, href: "/#research" });
  }

  add({
    id: "process",
    group: "sections",
    title: m.nav.process,
    subtitle: "",
    text: `${m.process.title} ${m.process.lead}`,
    href: "/#process",
    pinned: true,
  });
  m.process.steps.forEach((step, i) =>
    add({
      id: `process:${i}`,
      group: "sections",
      title: step.title,
      subtitle: `${m.nav.process} · ${step.phase}`,
      text: step.body,
      href: "/#process",
    }),
  );

  add({ id: "team", group: "sections", title: m.nav.team, subtitle: "", text: `${m.team.title} ${m.team.lead}`, href: "/#team", pinned: true });
  for (const member of team) {
    const copy = m.team.members[member.id];
    add({ id: `person:${member.id}`, group: "people", title: member.name, subtitle: copy.role, text: copy.focus, href: "/#team" });
  }

  add({
    id: "journal",
    group: "journal",
    title: m.nav.journal,
    subtitle: "",
    text: `${m.journal.title} ${m.journal.lead}`,
    href: "/journal",
    pinned: true,
  });
  for (const post of [...snapshot.posts].sort((a, b) => b.publishedAt - a.publishedAt)) {
    const row = resolveTranslation(post.translations, locale, post.primaryLocale)?.row;
    if (!row) continue;
    add({
      id: `post:${post.slug}`,
      group: "journal",
      title: row.title,
      subtitle: formatDate(post.publishedAt, locale),
      text: `${row.summary} ${htmlToText(row.bodyHtml)}`,
      href: `/journal/${post.slug}`,
    });
  }

  add({
    id: "publications",
    group: "publications",
    title: m.nav.publications,
    subtitle: "",
    text: m.publications.lead,
    href: "/publications",
    pinned: true,
  });
  for (const publication of [...snapshot.publications].sort((a, b) => b.year - a.year || b.publishedAt - a.publishedAt)) {
    const row = resolveTranslation(publication.translations, locale, publication.primaryLocale)?.row;
    if (!row) continue;
    add({
      id: `publication:${publication.slug}`,
      group: "publications",
      title: row.title,
      subtitle: `${publication.venue} · ${publication.year}`,
      text: `${publication.authors.map((author) => author.name).join(", ")}. ${htmlToText(row.abstractHtml)}`,
      href: `/publications/${publication.slug}`,
    });
  }

  add({
    id: "contact",
    group: "sections",
    title: m.nav.contact,
    subtitle: "",
    text: `${m.join.title} ${m.join.lead} ${site.email} ${m.join.address}`,
    href: "/#contact",
    pinned: true,
  });
  m.join.roles.forEach((role, i) =>
    add({ id: `role:${i}`, group: "sections", title: role, subtitle: m.join.openRoles, text: "", href: "/#contact" }),
  );

  return { version: 1, locale, docs };
}
