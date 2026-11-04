"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { getIdentity } from "@/lib/identity";
import { env } from "@/lib/env";
import { failedState, type FormState } from "@/lib/forms/form-state";
import { deleteMedia, putMedia, validateUpload } from "@/lib/media";
import { getMediaStore } from "@/lib/media-store";

export async function uploadMediaAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const { email } = await getIdentity();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return failedState({ file: "Choose a file to upload" });
  const valid = validateUpload({ type: file.type, size: file.size });
  if (!valid.ok) return failedState({ file: valid.error });

  const db = getDb();
  try {
    const row = await putMedia(db, getMediaStore(), {
      bytes: await file.arrayBuffer(),
      contentType: file.type,
      alt: String(formData.get("alt") ?? "").trim(),
      email,
      publicUrl: env.mediaPublicUrl(),
    });
    revalidatePath("/media");
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
  const db = getDb();
  await deleteMedia(db, getMediaStore(), id);
  revalidatePath("/media");
}
