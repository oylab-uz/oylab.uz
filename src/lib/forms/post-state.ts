import type { FieldErrors } from "@/lib/content/types";

/** Shared with the client form; kept out of the "use server" module, which may only export async functions. */
export type PostFormState = {
  ok: boolean;
  fieldErrors: FieldErrors;
  message: string | null;
  /** Changes on every successful action so the form can reset its dirty flag. */
  savedAt: number | null;
};

export const initialPostFormState: PostFormState = { ok: true, fieldErrors: {}, message: null, savedAt: null };
