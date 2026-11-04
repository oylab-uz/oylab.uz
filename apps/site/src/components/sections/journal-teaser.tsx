import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import { localeLabels, type Locale } from "@/i18n/routing";
import { cn, container } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { PostCard } from "@/lib/snapshot";

/** Three latest posts on the landing page. Hidden entirely when there are none. */
export async function JournalTeaser({ posts, locale }: { posts: PostCard[]; locale: Locale }) {
  if (posts.length === 0) return null;
  const t = await getTranslations("journal");

  return (
    <section id="journal" className="scroll-mt-16 border-t border-line">
      <div className={cn(container, "py-20 md:py-24")}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t("teaserEyebrow")}</p>
            <h2 className="mt-4 font-serif text-3xl font-light tracking-tight leading-[1.05] text-ink-strong md:text-4xl">{t("title")}</h2>
          </div>
          <Link href="/journal" className="inline-flex min-h-11 items-center gap-2 text-sm text-ink underline-offset-4 hover:underline">
            {t("all")}
            <ArrowUpRight size={14} weight="light" aria-hidden />
          </Link>
        </div>
        <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3" stagger={0.06} amount={0.1}>
          {posts.map((post) => (
            <RevealItem key={post.id} className="bg-bg">
              <Link href={`/journal/${post.slug}`} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-surface/60">
                <p className="eyebrow tabular flex flex-wrap gap-x-3">
                  <span>{formatDate(post.publishedAt, locale)}</span>
                  <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
                  {post.fallback ? <span className="rounded-full border border-line px-1.5">{localeLabels[post.locale]}</span> : null}
                </p>
                <h3 className="font-serif text-xl tracking-tight text-ink-strong md:text-2xl">{post.title}</h3>
                {post.summary ? <p className="line-clamp-3 text-sm leading-relaxed text-muted">{post.summary}</p> : null}
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
