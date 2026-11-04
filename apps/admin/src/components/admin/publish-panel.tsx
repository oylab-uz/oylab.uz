"use client";

import { useActionState } from "react";
import { publishSiteAction } from "@/app/site/actions";
import { initialFormState } from "@/lib/forms/form-state";
import { SubmitButton } from "./submit-button";
import { Banner } from "./ui";

export function PublishPanel({ hookConfigured, mediaConfigured }: { hookConfigured: boolean; mediaConfigured: boolean }) {
  const [state, action] = useActionState(publishSiteAction, initialFormState);
  return (
    <form action={action} className="rounded-lg border border-line p-5">
      <p className="max-w-[60ch] text-sm text-muted">
        Publishing writes every published post and publication to the media bucket as one snapshot and asks
        Cloudflare to rebuild the static site. The site updates in one to three minutes.
      </p>
      {!mediaConfigured ? (
        <p className="mt-3 text-xs text-muted">R2 is not configured: the snapshot is written to the local uploads folder.</p>
      ) : null}
      {!hookConfigured ? (
        <p className="mt-3 text-xs text-muted">No deploy hook configured: the site rebuilds on the next push to main instead.</p>
      ) : null}
      <div className="mt-5 flex items-center gap-3">
        <SubmitButton pendingLabel="Publishing…">Publish site</SubmitButton>
      </div>
      {state.message ? (
        <div className="mt-4">
          <Banner tone={state.ok ? "success" : "error"}>{state.message}</Banner>
        </div>
      ) : null}
    </form>
  );
}
