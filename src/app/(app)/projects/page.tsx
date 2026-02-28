"use client";

import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="ds-fade-in flex min-h-[360px] flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-5xl font-semibold tracking-tight text-neutral-900">
            프로젝트
          </h1>
          <p className="text-base text-neutral-600">
            새 프로젝트를 시작하려면 아래 버튼을 클릭하세요.
          </p>
        </div>

        <Link
          href="/input"
          className="inline-flex w-full items-center justify-center rounded-lg bg-neutral-900 px-6 py-4 text-base font-medium text-white transition hover:bg-neutral-800"
        >
          새 프로젝트 만들기
        </Link>
      </div>
    </div>
  );
}
