"use client";

interface LoadingStateProps {
  title?: string;
  description?: string;
}

const defaultTitle = "로딩 중입니다";
const defaultDescription = "잠시만 기다려주세요.";

export default function LoadingState({
  title = defaultTitle,
  description = defaultDescription,
}: LoadingStateProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white px-8 py-16 text-center shadow-sm">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" />
        <h2 className="mb-2 text-2xl font-medium text-neutral-900">{title}</h2>
        <p className="mx-auto max-w-md text-base text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  );
}
