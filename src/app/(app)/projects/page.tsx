"use client";

import Link from "next/link";
import { Button, PageHeader } from "@/components/ui";

export default function ProjectsPage() {
  return (
    <div className="ds-fade-in flex min-h-[360px] flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 text-center">
        <PageHeader
          tag="Projects"
          title="프로젝트"
          subtitle="새 프로젝트를 시작하려면 아래 버튼을 클릭하세요."
        />

        <Link
          href="/input"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(108,99,255,0.35)]"
        >
          새 프로젝트 만들기
        </Link>
      </div>
    </div>
  );
}
