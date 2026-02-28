"use client";

interface PageErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export default function PageErrorBanner({ message, onRetry }: PageErrorBannerProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700"
    >
      <p className="text-base font-medium">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-base text-neutral-900 transition hover:bg-neutral-50"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
