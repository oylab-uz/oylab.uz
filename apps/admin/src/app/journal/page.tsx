import Link from "next/link";
import { getDb } from "@/db";
import { listPostsAdmin } from "@/lib/content/posts";
import { formatAdminDate } from "@/lib/forms/dates";
import { LOCALES } from "@oylab/content/locales";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHeader, Select, StatusPill, Table } from "@/components/admin/ui";
import { cn } from "@/lib/cn";
import { createPostAction } from "./actions";

export const metadata = { title: "Journal" };

const filters = [
  { value: undefined, label: "All" },
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
] as const;

export default async function JournalAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status === "draft" || status === "published" ? status : undefined;
  const db = getDb();
  const rows = await listPostsAdmin(db, { status: filter });

  return (
    <>
      <PageHeader
        title="Journal"
        action={
          <form action={createPostAction} className="flex items-center gap-2">
            <label htmlFor="new-locale" className="sr-only">
              Primary language of the new post
            </label>
            <Select id="new-locale" name="primaryLocale" defaultValue="en" className="w-28">
              {LOCALES.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </Select>
            <SubmitButton pendingLabel="Creating…">New post</SubmitButton>
          </form>
        }
      />

      <nav aria-label="Filter" className="mb-4 flex gap-1">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.value ? `/journal?status=${f.value}` : "/journal"}
            aria-current={filter === f.value ? "page" : undefined}
            className={cn(
              "inline-flex min-h-9 items-center rounded-full px-3.5 text-sm",
              filter === f.value ? "bg-surface-strong text-ink-strong" : "text-muted hover:text-ink",
            )}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
          No posts yet. Create one with the button above.
        </p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Languages</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-surface/60">
                <td>
                  <Link href={`/journal/${row.id}`} className="font-medium text-ink-strong hover:underline">
                    {row.title || <span className="text-muted">(untitled)</span>}
                  </Link>
                  <div className="mt-0.5 font-mono text-[11px] text-muted">/{row.slug}</div>
                </td>
                <td>
                  <StatusPill status={row.status} />
                </td>
                <td className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                  {row.locales.join(" · ")}
                </td>
                <td className="whitespace-nowrap text-muted">
                  {formatAdminDate(row.updatedAt)}
                  <div className="text-[11px]">{row.updatedBy}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
