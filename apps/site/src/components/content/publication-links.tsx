import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";
import type { PublicationCard } from "@/lib/snapshot";
import { cn } from "@/lib/cn";

/** PDF, arXiv, code and DOI links as small pills. Renders nothing when there are none. */
export async function PublicationLinks({ publication, className }: { publication: PublicationCard; className?: string }) {
  const t = await getTranslations("publications");
  const links = [
    publication.pdfUrl ? { href: publication.pdfUrl, label: t("pdf") } : null,
    publication.arxivUrl ? { href: publication.arxivUrl, label: t("arxiv") } : null,
    publication.codeUrl ? { href: publication.codeUrl, label: t("code") } : null,
    publication.doi ? { href: `https://doi.org/${publication.doi}`, label: t("doi") } : null,
  ].filter((l): l is { href: string; label: string } => l !== null);
  if (links.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-9 items-center gap-1 rounded-full border border-line px-3.5 text-xs text-ink transition-colors hover:bg-surface"
          >
            {link.label}
            <ArrowUpRight size={12} weight="light" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
