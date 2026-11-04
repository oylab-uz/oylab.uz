"use client";

import { useActionState } from "react";
import { uploadMediaAction } from "@/app/media/actions";
import { initialFormState } from "@/lib/forms/form-state";
import { ALLOWED_UPLOAD_TYPES } from "@/lib/media";
import { SubmitButton } from "./submit-button";
import { Banner, Field, Input } from "./ui";

export function MediaUploader() {
  const [state, formAction] = useActionState(uploadMediaAction, initialFormState);
  return (
    <form
      action={formAction}
      // A new key after each success clears the file input.
      key={state.savedAt ?? "fresh"}
      className="grid gap-4 rounded-lg border border-line p-5 md:grid-cols-[1fr_1fr_auto] md:items-end"
    >
      <Field label="File" htmlFor="file" helper="PNG, JPEG, WebP, GIF, SVG or PDF up to 10 MB. Images wider or taller than 2000 px are scaled down." error={state.fieldErrors.file}>
        <Input id="file" name="file" type="file" accept={ALLOWED_UPLOAD_TYPES.join(",")} required className="py-2 file:mr-3 file:rounded-full file:border-0 file:bg-surface-strong file:px-3 file:py-1 file:text-xs file:text-ink" />
      </Field>
      <Field label="Alt text" htmlFor="alt" helper="What the image shows, for readers who cannot see it">
        <Input id="alt" name="alt" placeholder="The moon over the lab roof" />
      </Field>
      <SubmitButton pendingLabel="Uploading…">Upload</SubmitButton>
      {state.message ? (
        <div className="md:col-span-3">
          <Banner tone={state.ok ? "success" : "error"}>{state.message}</Banner>
        </div>
      ) : null}
    </form>
  );
}
