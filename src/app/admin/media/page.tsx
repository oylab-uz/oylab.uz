import { FilePdf } from "@phosphor-icons/react/ssr";
import { getDb } from "@/db";
import { listMedia } from "@/lib/media";
import { formatAdminDate } from "@/lib/forms/dates";
import { DeleteMediaButton } from "@/components/admin/delete-media-button";
import { MediaUploader } from "@/components/admin/media-uploader";
import { PageHeader } from "@/components/admin/ui";
import { CopyButton } from "@/components/ui/copy-button";

export const metadata = { title: "Media" };

function formatBytes(n: number) {
  return n >= 1024 * 1024 ? `${(n / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}

export default async function MediaAdminPage() {
  const db = await getDb();
  const rows = await listMedia(db);

  return (
    <>
      <PageHeader title="Media" />
      <MediaUploader />

      {rows.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
          Nothing uploaded yet.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid="media-grid">
          {rows.map((m) => {
            const name = m.key.split("/").pop() ?? m.key;
            const isImage = m.contentType.startsWith("image/");
            return (
              <li key={m.id} className="flex flex-col overflow-hidden rounded-lg border border-line">
                <div className="flex aspect-[3/2] items-center justify-center bg-surface">
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.url} alt={m.alt} className="h-full w-full object-contain" loading="lazy" />
                  ) : (
                    <FilePdf size={40} weight="light" aria-hidden className="text-muted" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink-strong">{m.alt || name}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">
                      {m.contentType} · {formatBytes(m.bytes)}
                      {m.width && m.height ? ` · ${m.width}×${m.height}` : ""}
                    </p>
                    <p className="font-mono text-[11px] text-muted">
                      {formatAdminDate(m.createdAt)} · {m.uploadedBy}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <CopyButton text={m.url} label="Copy URL" copiedLabel="Copied" className="min-h-9 px-4 text-xs" />
                    {isImage ? (
                      <CopyButton text={`![${m.alt}](${m.url})`} label="Copy Markdown" copiedLabel="Copied" className="min-h-9 px-4 text-xs" />
                    ) : null}
                    <DeleteMediaButton id={m.id} name={name} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
