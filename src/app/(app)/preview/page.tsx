"use client";

import Link from "next/link";
import { useWizard } from "@/context/WizardContext";
import { Badge, Button, PageHeader } from "@/components/ui";

export default function PreviewPage() {
  const { specs, selectedTheme } = useWizard();

  return (
    <div className="ds-fade-in space-y-8">
      <PageHeader
        tag="Preview"
        title="앱 미리보기"
        subtitle="생성된 MVP 결과물을 확인할 수 있습니다. (실제 빌드 연동은 추후 적용 예정)"
      />

      <div className="min-w-0 overflow-hidden rounded-card border border-border bg-surface">
        <div className="flex aspect-video items-center justify-center border-b border-border bg-surface2">
          <div className="text-center text-text2">
            <p className="text-base font-semibold">Preview 영역</p>
            <p className="mt-2 text-sm">테마: {selectedTheme || "—"}</p>
          </div>
        </div>
        <div className="border-t border-border bg-surface p-6">
          <h2 className="mb-4 text-2xl font-semibold text-text">
            포함된 기능 ({specs.length}개)
          </h2>
          <ul className="flex min-w-0 flex-wrap gap-2">
            {specs.map((s) => (
              <li key={s.id}>
                <Badge variant="core">{s.feature}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
        <Link
          href="/build"
          className="text-base text-text2 underline transition hover:text-text"
        >
          ← 빌드 결과로 돌아가기
        </Link>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="secondary">
            코드 다운로드 (ZIP)
          </Button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(108,99,255,0.35)]"
          >
            새 프로젝트 시작
          </Link>
        </div>
      </div>
    </div>
  );
}
