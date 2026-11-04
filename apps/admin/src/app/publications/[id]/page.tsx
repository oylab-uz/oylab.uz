import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { getPublicationAdmin, parseAuthors } from "@/lib/content/publications";
import { PublicationForm } from "@/components/admin/publication-form";

export const metadata = { title: "Edit publication" };

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const found = await getPublicationAdmin(db, id);
  if (!found) notFound();
  return (
    <PublicationForm
      publication={found.publication}
      authors={parseAuthors(found.publication.authorsJson)}
      translations={found.translations}
    />
  );
}
