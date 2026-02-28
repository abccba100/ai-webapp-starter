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
    <div className="w-full min-w-0">
      <div className="flex flex-col items-center justify-center rounded-card border border-border bg-surface px-8 py-16 text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />
        <h2 className="mb-2 text-2xl font-semibold text-text">{title}</h2>
        <p className="mx-auto max-w-md text-base text-text2">
          {description}
        </p>
      </div>
    </div>
  );
}
