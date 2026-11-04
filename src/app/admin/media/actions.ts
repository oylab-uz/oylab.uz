"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { getIdentity } from "@/app/admin/identity";
import { getEnv } from "@/lib/env";
import { failedState, type FormState } from "@/lib/forms/form-state";
import { deleteMedia, putMedia, validateUpload } from "@/lib/media";

export async function uploadMediaAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const { email } = await getIdentity();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return failedState({ file: "Choose a file to upload" });
  const valid = validateUpload({ type: file.type, size: file.size });
  if (!valid.ok) return failedState({ file: valid.error });

  const env = await getEnv();
  const db = await getDb();
  try {
    const row = await putMedia(db, env.MEDIA, {
      bytes: await file.arrayBuffer(),
      contentType: file.type,
      alt: String(formData.get("alt") ?? "").trim(),
      email,
      publicUrl: env.MEDIA_PUBLIC_URL,
    });
    revalidatePath("/admin/media");
    return { ok: true, fieldErrors: {}, message: `Uploaded ${file.name} as ${row.key}`, savedAt: Date.now() };
  } catch (error) {
    console.error("media upload failed", error);
    return failedState({}, "Upload failed. Storage did not accept the file; try again.");
  }
}

export async function deleteMediaAction(formData: FormData): Promise<void> {
  await getIdentity();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const env = await getEnv();
  const db = await getDb();
  await deleteMedia(db, env.MEDIA, id);
  revalidatePath("/admin/media");
}
