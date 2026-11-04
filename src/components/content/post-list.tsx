import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localeLabels, type Locale } from "@/i18n/routing";
import type { PostCard } from "@/lib/content/types";
import { formatDate } from "@/lib/content/format";

export async function PostList({ posts, locale }: { posts: PostCard[]; locale: Locale }) {
  const t = await getTranslations("journal");
  return (
    <ol className="divide-y divide-line border-y border-line">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/journal/${post.slug}`}
            className="group grid gap-3 py-8 transition-colors hover:bg-surface/60 md:grid-cols-[10rem_1fr] md:gap-8 md:px-3"
          >
            <div className="eyebrow tabular flex flex-wrap items-center gap-x-3 md:flex-col md:items-start md:gap-y-1">
              {post.publishedAt ? <time dateTime={new Date(post.publishedAt).toISOString()}>{formatDate(post.publishedAt, locale)}</time> : null}
              <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
              {post.fallback ? <span className="rounded-full border border-line px-1.5 py-0.5">{localeLabels[post.locale]}</span> : null}
            </div>
            <div>
              <h2 className="font-serif text-2xl tracking-tight text-ink-strong md:text-3xl">{post.title}</h2>
              {post.summary ? <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted">{post.summary}</p> : null}
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
