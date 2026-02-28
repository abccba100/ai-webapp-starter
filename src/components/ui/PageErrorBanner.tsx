"use client";

interface PageErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export default function PageErrorBanner({ message, onRetry }: PageErrorBannerProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive"
    >
      <p className="text-sm font-medium">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 btn btn-outline rounded-lg px-4 py-2 text-sm"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
