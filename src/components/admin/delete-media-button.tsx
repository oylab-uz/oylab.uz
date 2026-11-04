"use client";

import { useRef } from "react";
import { deleteMediaAction } from "@/app/admin/media/actions";
import { SubmitButton } from "./submit-button";
import { Button } from "./ui";

export function DeleteMediaButton({ id, name }: { id: string; name: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Button variant="danger" className="min-h-9 px-4 text-xs" onClick={() => dialog.current?.showModal()}>
        Delete
      </Button>
      <dialog ref={dialog} className="m-auto w-[min(92vw,26rem)] rounded-xl border border-line bg-bg p-6 text-ink backdrop:bg-ink/40">
        <h2 className="text-lg font-medium text-ink-strong">Delete {name}?</h2>
        <p className="mt-2 text-sm text-muted">
          The file is removed from storage. Any post that still references it will show a broken image.
        </p>
        <form action={deleteMediaAction} className="mt-6 flex justify-end gap-2">
          <input type="hidden" name="id" value={id} />
          <Button variant="ghost" onClick={() => dialog.current?.close()}>
            Cancel
          </Button>
          <SubmitButton variant="danger" pendingLabel="Deleting…">
            Delete
          </SubmitButton>
        </form>
      </dialog>
    </>
  );
}
