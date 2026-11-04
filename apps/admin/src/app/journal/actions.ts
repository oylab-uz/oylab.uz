"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { getIdentity } from "@/lib/identity";
import { createDraftPost } from "@/lib/content/posts";
import { localeSchema } from "@/lib/forms/post-schema";

export async function createPostAction(formData: FormData) {
  const { email } = await getIdentity();
  const parsed = localeSchema.safeParse(formData.get("primaryLocale"));
  const primaryLocale = parsed.success ? parsed.data : "en";
  const db = getDb();
  const { id } = await createDraftPost(db, { primaryLocale, email });
  redirect(`/journal/${id}`);
}
