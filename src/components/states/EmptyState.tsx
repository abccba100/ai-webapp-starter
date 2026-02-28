"use client";

import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col items-center justify-center rounded-card border border-border bg-surface px-8 py-16 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-text">{title}</h2>
        {description && (
          <p className="mx-auto mb-6 max-w-md text-base leading-relaxed text-text2">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
