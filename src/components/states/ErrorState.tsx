"use client";

import type { ReactNode } from "react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const defaultTitle = "문제가 발생했습니다";
const defaultDescription =
  "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

export default function ErrorState({
  title = defaultTitle,
  description = defaultDescription,
  children,
}: ErrorStateProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white px-8 py-16 text-center shadow-sm">
        <h2 className="mb-2 text-2xl font-medium text-neutral-900">{title}</h2>
        {description && (
          <p className="mx-auto mb-6 max-w-md text-base text-neutral-600">
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
