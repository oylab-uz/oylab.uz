import Link from "next/link";
import { getDb } from "@/db";
import { listPostsAdmin } from "@/lib/content/posts";
import { listPublicationsAdmin } from "@/lib/content/publications";
import { formatAdminDate } from "@/lib/forms/dates";
import { PageHeader, StatusPill, Table } from "@/components/admin/ui";
import { listPublishes } from "@/lib/publish";
import { PublishStatus } from "@/components/admin/publish-status";

export default async function AdminDashboard() {
  const db = getDb();
  const [posts, publications, publishes] = await Promise.all([listPostsAdmin(db, {}), listPublicationsAdmin(db, {}), listPublishes(db, 1)]);
  const count = (rows: { status: string }[], status: string) => rows.filter((r) => r.status === status).length;
  const recent = [
    ...posts.map((p) => ({ ...p, kind: "Journal", href: `/journal/${p.id}` })),
    ...publications.map((p) => ({ ...p, kind: "Publication", href: `/publications/${p.id}` })),
  ]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5);

  const stats = [
    { label: "Published posts", value: count(posts, "published"), href: "/journal?status=published" },
    { label: "Draft posts", value: count(posts, "draft"), href: "/journal?status=draft" },
    { label: "Published publications", value: count(publications, "published"), href: "/publications?status=published" },
    { label: "Draft publications", value: count(publications, "draft"), href: "/publications?status=draft" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" />
      <PublishStatus last={publishes[0] ?? null} />
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-bg px-5 py-5 hover:bg-surface/60">
            <dt className="text-xs uppercase tracking-[0.12em] text-muted">{s.label}</dt>
            <dd className="mt-2 font-mono text-3xl tabular text-ink-strong">{s.value}</dd>
          </Link>
        ))}
      </dl>

      <h2 className="mt-10 mb-4 text-sm font-medium uppercase tracking-[0.12em] text-muted">Recently edited</h2>
      {recent.length === 0 ? (
        <p className="text-sm text-muted">Nothing yet.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Kind</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={`${r.kind}-${r.id}`}>
                <td>
                  <Link href={r.href} className="font-medium text-ink-strong hover:underline">
                    {r.title || "(untitled)"}
                  </Link>
                </td>
                <td className="text-muted">{r.kind}</td>
                <td>
                  <StatusPill status={r.status} />
                </td>
                <td className="whitespace-nowrap text-muted">
                  {formatAdminDate(r.updatedAt)}
                  <div className="text-[11px]">{r.updatedBy}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
