import { getDb } from "@/db";
import { PublishPanel } from "@/components/admin/publish-panel";
import { PageHeader, StatusPill, Table } from "@/components/admin/ui";
import { env } from "@/lib/env";
import { formatAdminDate } from "@/lib/forms/dates";
import { listPublishes } from "@/lib/publish";

export const metadata = { title: "Site" };

export default async function SitePage() {
  const publishes = await listPublishes(getDb(), 20);
  return (
    <>
      <PageHeader title="Site" />
      <PublishPanel hookConfigured={Boolean(env.deployHookUrl())} mediaConfigured={Boolean(env.r2())} />
      <h2 className="mt-10 mb-4 text-sm font-medium uppercase tracking-[0.12em] text-muted">Publish history</h2>
      {publishes.length === 0 ? (
        <p className="text-sm text-muted">Nothing published yet.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>When</th>
              <th>Result</th>
              <th>Content</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {publishes.map((p) => (
              <tr key={p.id}>
                <td className="whitespace-nowrap text-muted">
                  {formatAdminDate(p.createdAt)}
                  <div className="text-[11px]">{p.createdBy}</div>
                </td>
                <td>
                  <StatusPill status={p.status === "failed" ? "draft" : "published"} label={p.status} />
                </td>
                <td className="whitespace-nowrap text-muted">
                  {p.posts} posts · {p.publications} publications
                </td>
                <td className="text-muted">
                  {p.message}
                  {p.buildId ? <div className="font-mono text-[11px]">build {p.buildId}</div> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
