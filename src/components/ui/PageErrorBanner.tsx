"use client";

import { Button } from "./Button";

interface PageErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export default function PageErrorBanner({ message, onRetry }: PageErrorBannerProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-accent3/30 bg-accent3/10 px-4 py-3 text-[13px] font-semibold text-accent3"
    >
      <p className="text-base font-medium">{message}</p>
      {onRetry && (
        <Button
          type="button"
          variant="secondary"
          onClick={onRetry}
          className="mt-4"
        >
          다시 시도
        </Button>
      )}
    </div>
  );
}
