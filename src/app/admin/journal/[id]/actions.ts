"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { getIdentity } from "@/app/admin/identity";
import { deletePost, publishPost, savePost, unpublishPost } from "@/lib/content/posts";
import type { FieldErrors } from "@/lib/content/types";
import { getEnv } from "@/lib/env";
import { formToObject, parsePostForm, BODY_MAX } from "@/lib/forms/post-schema";
import type { PostFormState } from "@/lib/forms/post-state";
import { renderMarkdown } from "@/lib/markdown";

function failed(fieldErrors: FieldErrors, message = "Fix the fields marked below."): PostFormState {
  return { ok: false, fieldErrors, message, savedAt: null };
}

/**
 * One action for the whole editor. The submit button sets `intent`:
 * save (default), publish, unpublish or delete. Publish and unpublish save
 * first so edits in the form are never lost.
 */
export async function postFormAction(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const { email } = await getIdentity();
  const db = await getDb();
  const intent = String(formData.get("intent") ?? "save");
  const id = String(formData.get("id") ?? "");

  if (intent === "delete") {
    const result = await deletePost(db, id);
    if (!result.ok) return failed(result.fieldErrors, result.fieldErrors.status ?? "Could not delete");
    revalidatePath("/admin/journal");
    redirect("/journal");
  }

  const parsed = parsePostForm(formToObject(formData));
  if (!parsed.ok) return failed(parsed.fieldErrors);
  const env = await getEnv();
  const saved = await savePost(db, parsed.data, { email, mediaOrigin: env.MEDIA_PUBLIC_URL });
  if (!saved.ok) return failed(saved.fieldErrors);

  if (intent === "publish") {
    const result = await publishPost(db, id, email);
    if (!result.ok) return failed(result.fieldErrors, "Saved, but not published yet.");
  } else if (intent === "unpublish") {
    const result = await unpublishPost(db, id, email);
    if (!result.ok) return failed(result.fieldErrors);
  }

  revalidatePath("/admin/journal");
  const message = intent === "publish" ? "Published." : intent === "unpublish" ? "Unpublished." : "Saved.";
  return { ok: true, fieldErrors: {}, message, savedAt: Date.now() };
}

export async function renderPreviewAction(markdown: string): Promise<string> {
  await getIdentity();
  const env = await getEnv();
  const { html } = await renderMarkdown(markdown.slice(0, BODY_MAX), { mediaOrigin: env.MEDIA_PUBLIC_URL });
  return html;
}
