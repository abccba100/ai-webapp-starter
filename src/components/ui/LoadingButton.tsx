"use client";

import type { ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingLabel?: string;
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
  className = "",
  ...rest
}: LoadingButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled ?? loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-4 text-base font-medium text-white transition hover:bg-neutral-800 disabled:opacity-70 ${className}`}
      aria-busy={loading}
      aria-live="polite"
      {...rest}
    >
      {loading && <Spinner />}
      <span>{loading && loadingLabel ? loadingLabel : children}</span>
    </button>
  );
}
