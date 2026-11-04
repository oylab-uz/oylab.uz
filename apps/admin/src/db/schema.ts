import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { LOCALES } from "@oylab/content/locales";

export { LOCALES };
export const STATUSES = ["draft", "published"] as const;

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  url: text("url").notNull(),
  contentType: text("content_type").notNull(),
  bytes: integer("bytes").notNull(),
  width: integer("width"),
  height: integer("height"),
  alt: text("alt").notNull().default(""),
  createdAt: integer("created_at").notNull(),
  uploadedBy: text("uploaded_by").notNull(),
});

export const posts = sqliteTable(
  "posts",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    primaryLocale: text("primary_locale", { enum: LOCALES }).notNull(),
    status: text("status", { enum: STATUSES }).notNull().default("draft"),
    publishedAt: integer("published_at"),
    coverMediaId: text("cover_media_id").references(() => media.id, { onDelete: "set null" }),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
    updatedBy: text("updated_by").notNull(),
  },
  (t) => [index("posts_status_published_idx").on(t.status, t.publishedAt)],
);

export const postTranslations = sqliteTable(
  "post_translations",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    locale: text("locale", { enum: LOCALES }).notNull(),
    title: text("title").notNull().default(""),
    summary: text("summary").notNull().default(""),
    bodyMd: text("body_md").notNull().default(""),
    bodyHtml: text("body_html").notNull().default(""),
    readingMinutes: integer("reading_minutes").notNull().default(1),
    updatedAt: integer("updated_at").notNull(),
  },
  (t) => [primaryKey({ columns: [t.postId, t.locale] })],
);

export const publications = sqliteTable(
  "publications",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    primaryLocale: text("primary_locale", { enum: LOCALES }).notNull(),
    status: text("status", { enum: STATUSES }).notNull().default("draft"),
    publishedAt: integer("published_at"),
    year: integer("year").notNull(),
    venue: text("venue").notNull().default(""),
    authorsJson: text("authors_json").notNull().default("[]"),
    pdfUrl: text("pdf_url"),
    arxivUrl: text("arxiv_url"),
    codeUrl: text("code_url"),
    doi: text("doi"),
    bibtex: text("bibtex"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
    updatedBy: text("updated_by").notNull(),
  },
  (t) => [index("publications_status_year_idx").on(t.status, t.year, t.publishedAt)],
);

export const publicationTranslations = sqliteTable(
  "publication_translations",
  {
    publicationId: text("publication_id")
      .notNull()
      .references(() => publications.id, { onDelete: "cascade" }),
    locale: text("locale", { enum: LOCALES }).notNull(),
    title: text("title").notNull().default(""),
    abstractMd: text("abstract_md").notNull().default(""),
    abstractHtml: text("abstract_html").notNull().default(""),
    updatedAt: integer("updated_at").notNull(),
  },
  (t) => [primaryKey({ columns: [t.publicationId, t.locale] })],
);

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type PostTranslation = typeof postTranslations.$inferSelect;
export type NewPostTranslation = typeof postTranslations.$inferInsert;
export type Publication = typeof publications.$inferSelect;
export type NewPublication = typeof publications.$inferInsert;
export type PublicationTranslation = typeof publicationTranslations.$inferSelect;
export type NewPublicationTranslation = typeof publicationTranslations.$inferInsert;

/** One row per "Publish site" click: what was exported and what the deploy hook answered. */
export const sitePublishes = sqliteTable("site_publishes", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at").notNull(),
  createdBy: text("created_by").notNull(),
  posts: integer("posts").notNull(),
  publications: integer("publications").notNull(),
  /** "uploaded" (snapshot on R2, no hook configured), "triggered", or "failed". */
  status: text("status", { enum: ["uploaded", "triggered", "failed"] }).notNull(),
  buildId: text("build_id"),
  message: text("message").notNull().default(""),
});

export type SitePublish = typeof sitePublishes.$inferSelect;
