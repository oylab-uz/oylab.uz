import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { getPostAdmin } from "@/lib/content/posts";
import { listMedia } from "@/lib/media";
import { PostForm } from "@/components/admin/post-form";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const found = await getPostAdmin(db, id);
  if (!found) notFound();
  const media = (await listMedia(db)).filter((m) => m.contentType.startsWith("image/"));

  return (
    <PostForm
      post={found.post}
      translations={found.translations}
      media={media.map((m) => ({ id: m.id, url: m.url, alt: m.alt }))}
    />
  );
}
