"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { getIdentity } from "@/lib/identity";
import { createDraftPublication } from "@/lib/content/publications";
import { localeSchema } from "@/lib/forms/post-schema";

export async function createPublicationAction(formData: FormData) {
  const { email } = await getIdentity();
  const parsed = localeSchema.safeParse(formData.get("primaryLocale"));
  const primaryLocale = parsed.success ? parsed.data : "en";
  const db = getDb();
  const { id } = await createDraftPublication(db, { primaryLocale, email });
  redirect(`/publications/${id}`);
}
