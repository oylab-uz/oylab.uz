import type { FieldErrors } from "@/lib/content/types";

/** Shared by the client forms; kept out of "use server" modules, which may only export async functions. */
export type FormState = {
  ok: boolean;
  fieldErrors: FieldErrors;
  message: string | null;
  /** Changes on every successful action so a form can reset its dirty flag. */
  savedAt: number | null;
};

export const initialFormState: FormState = { ok: true, fieldErrors: {}, message: null, savedAt: null };

export function failedState(fieldErrors: FieldErrors, message = "Fix the fields marked below."): FormState {
  return { ok: false, fieldErrors, message, savedAt: null };
}
