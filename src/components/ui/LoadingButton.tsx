"use client";

import type { ButtonHTMLAttributes } from "react";
import { Button } from "./Button";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingLabel?: string;
  variant?: "primary" | "secondary" | "success";
}

const Spinner = () => (
  <svg className="h-4 w-4 shrink-0 animate-spin" viewBox="0 0 24 24" aria-hidden>
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);

export default function LoadingButton({
  loading = false,
  loadingLabel,
  children,
  disabled,
  variant = "primary",
  className = "",
  ...rest
}: LoadingButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      disabled={disabled ?? loading}
      className={className}
      aria-busy={loading}
      aria-live="polite"
      {...rest}
    >
      {loading && <Spinner />}
      <span>{loading && loadingLabel ? loadingLabel : children}</span>
    </Button>
  );
}
