"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { getIdentity } from "@/app/admin/identity";
import {
  deletePublication,
  publishPublication,
  savePublication,
  unpublishPublication,
} from "@/lib/content/publications";
import { getEnv } from "@/lib/env";
import { failedState, type FormState } from "@/lib/forms/form-state";
import { formToObject } from "@/lib/forms/post-schema";
import { parsePublicationForm } from "@/lib/forms/publication-schema";

/** Same contract as the journal editor: the submit button's `intent` picks save, publish, unpublish or delete. */
export async function publicationFormAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const { email } = await getIdentity();
  const db = await getDb();
  const intent = String(formData.get("intent") ?? "save");
  const id = String(formData.get("id") ?? "");

  if (intent === "delete") {
    const result = await deletePublication(db, id);
    if (!result.ok) return failedState(result.fieldErrors, result.fieldErrors.status ?? "Could not delete");
    revalidatePath("/admin/publications");
    redirect("/publications");
  }

  const parsed = parsePublicationForm(formToObject(formData));
  if (!parsed.ok) return failedState(parsed.fieldErrors);
  const env = await getEnv();
  const saved = await savePublication(db, parsed.data, { email, mediaOrigin: env.MEDIA_PUBLIC_URL });
  if (!saved.ok) return failedState(saved.fieldErrors);

  if (intent === "publish") {
    const result = await publishPublication(db, id, email);
    if (!result.ok) return failedState(result.fieldErrors, "Saved, but not published yet.");
  } else if (intent === "unpublish") {
    const result = await unpublishPublication(db, id, email);
    if (!result.ok) return failedState(result.fieldErrors);
  }

  revalidatePath("/admin/publications");
  const message = intent === "publish" ? "Published." : intent === "unpublish" ? "Unpublished." : "Saved.";
  return { ok: true, fieldErrors: {}, message, savedAt: Date.now() };
}
