"use server";

import { revalidatePath } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";
import { getDb } from "@/db";
import { getIdentity } from "@/lib/identity";
import { deletePost, publishPost, savePost, unpublishPost } from "@/lib/content/posts";
import { env } from "@/lib/env";
import { formToObject, parsePostForm, BODY_MAX } from "@/lib/forms/post-schema";
import { failedState, type FormState } from "@/lib/forms/form-state";
import { renderMarkdown } from "@oylab/content/markdown";

/**
 * One action for the whole editor. The submit button sets `intent`:
 * save (default), publish, unpublish or delete. Publish and unpublish save
 * first so edits in the form are never lost.
 */
export async function postFormAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const { email } = await getIdentity();
  const db = getDb();
  const intent = String(formData.get("intent") ?? "save");
  const id = String(formData.get("id") ?? "");
  try {
    return await run();
  } catch (error) {
    unstable_rethrow(error);
    console.error("post action failed", error);
    return failedState({}, "Could not save. Storage did not accept the change; try again.");
  }

  async function run(): Promise<FormState> {
  if (intent === "delete") {
    const result = await deletePost(db, id);
    if (!result.ok) return failedState(result.fieldErrors, result.fieldErrors.status ?? "Could not delete");
    revalidatePath("/journal");
    redirect("/journal");
  }

  const parsed = parsePostForm(formToObject(formData));
  if (!parsed.ok) return failedState(parsed.fieldErrors);
  const saved = await savePost(db, parsed.data, { email, mediaOrigin: env.mediaPublicUrl() });
  if (!saved.ok) return failedState(saved.fieldErrors);

  if (intent === "publish") {
    const result = await publishPost(db, id, email);
    if (!result.ok) {
      revalidatePath("/journal");
      return { ok: true, fieldErrors: result.fieldErrors, message: "Saved. Not published yet: fix the fields marked below.", savedAt: Date.now() };
    }
  } else if (intent === "unpublish") {
    const result = await unpublishPost(db, id, email);
    if (!result.ok) return failedState(result.fieldErrors);
  }

  revalidatePath("/journal");
  const message = intent === "publish" ? "Published." : intent === "unpublish" ? "Unpublished." : "Saved.";
  return { ok: true, fieldErrors: {}, message, savedAt: Date.now() };
  }
}

export async function renderPreviewAction(markdown: string): Promise<string> {
  await getIdentity();
  const { html } = await renderMarkdown(markdown.slice(0, BODY_MAX), { mediaOrigin: env.mediaPublicUrl() });
  return html;
}
