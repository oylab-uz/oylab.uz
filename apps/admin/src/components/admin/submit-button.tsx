"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { buttonClass, type ButtonVariant } from "./ui";

/** Submit button that shows a pending state while its form's action runs. */
export function SubmitButton({
  children,
  pendingLabel,
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { pendingLabel?: string; variant?: ButtonVariant }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      {...props}
      disabled={pending || props.disabled}
      aria-busy={pending}
      className={buttonClass(variant, className)}
    >
      {pending ? (pendingLabel ?? children) : children}
    </button>
  );
}
