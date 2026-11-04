import { Link } from "@/i18n/navigation";
import { localeLabels } from "@/i18n/routing";
import type { PublicationCard } from "@/lib/content/types";
import { PublicationLinks } from "./publication-links";

export function PublicationGroups({ groups }: { groups: { year: number; items: PublicationCard[] }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {groups.map((group) => (
        <section key={group.year} className="grid gap-6 py-10 md:grid-cols-[6rem_1fr] md:gap-10">
          <h2 className="font-serif text-3xl tabular text-ink-strong">{group.year}</h2>
          <ol className="divide-y divide-line">
            {group.items.map((publication) => (
              <li key={publication.id} className="py-6 first:pt-0 last:pb-0">
                <Link
                  href={`/publications/${publication.slug}`}
                  className="font-serif text-xl tracking-tight text-ink-strong underline-offset-4 hover:underline md:text-2xl"
                >
                  {publication.title}
                </Link>
                {publication.fallback ? (
                  <span className="ml-2 rounded-full border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {localeLabels[publication.locale]}
                  </span>
                ) : null}
                <p className="mt-2 text-sm text-muted">
                  {publication.authors.map((a) => a.name).join(", ")}
                  {publication.venue ? <span className="before:mx-2 before:content-['·']">{publication.venue}</span> : null}
                </p>
                <PublicationLinks publication={publication} className="mt-3" />
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
