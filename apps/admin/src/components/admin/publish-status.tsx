import Link from "next/link";
import type { SitePublish } from "@/db/schema";
import { formatAdminDate } from "@/lib/forms/dates";

/** Dashboard card: when the site was last published and how it went. */
export function PublishStatus({ last }: { last: SitePublish | null }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line px-5 py-4">
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.12em] text-muted">Public site</p>
        <p className="mt-1 text-sm text-ink">
          {last
            ? `${last.status === "failed" ? "Last publish failed" : "Last published"} ${formatAdminDate(last.createdAt)} · ${last.posts} posts, ${last.publications} publications`
            : "Not published yet. Publish from the Site page once content is ready."}
        </p>
        {last && last.status === "failed" ? <p className="mt-1 text-xs text-muted [overflow-wrap:anywhere]">{last.message}</p> : null}
      </div>
      <Link href="/site" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-ink hover:bg-surface">
        Site
      </Link>
    </div>
  );
}
