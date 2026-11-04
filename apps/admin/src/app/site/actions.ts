"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { failedState, type FormState } from "@/lib/forms/form-state";
import { getIdentity } from "@/lib/identity";
import { getMediaStore } from "@/lib/media-store";
import { publishSite } from "@/lib/publish";

export async function publishSiteAction(): Promise<FormState> {
  const { email } = await getIdentity();
  const outcome = await publishSite(getDb(), getMediaStore(), email);
  revalidatePath("/site");
  revalidatePath("/");
  if (outcome.status === "failed") return failedState({}, outcome.message);
  return { ok: true, fieldErrors: {}, message: outcome.message, savedAt: Date.now() };
}
