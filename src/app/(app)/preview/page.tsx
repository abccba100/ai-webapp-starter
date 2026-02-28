"use client";

import Link from "next/link";
import { useWizard } from "@/context/WizardContext";

export default function PreviewPage() {
  const { specs, selectedTheme } = useWizard();

  return (
    <div className="ds-fade-in space-y-10">
      <header className="space-y-2">
        <h1 className="text-5xl font-semibold tracking-tight text-neutral-900">
          앱 미리보기
        </h1>
        <p className="text-base text-neutral-600">
          생성된 MVP 결과물을 확인할 수 있습니다. (실제 빌드 연동은 추후 적용
          예정)
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex aspect-video items-center justify-center border-b border-neutral-200 bg-neutral-50">
          <div className="text-center text-neutral-500">
            <p className="text-base font-medium">Preview 영역</p>
            <p className="mt-2 text-sm">테마: {selectedTheme || "—"}</p>
          </div>
        </div>
        <div className="border-t border-neutral-200 bg-white p-6">
          <h2 className="mb-4 text-2xl font-medium text-neutral-900">
            포함된 기능 ({specs.length}개)
          </h2>
          <ul className="flex flex-wrap gap-2">
            {specs.map((s) => (
              <li
                key={s.id}
                className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900"
              >
                {s.feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-neutral-200 pt-10 md:flex-row md:items-center md:justify-between">
        <Link
          href="/build"
          className="text-base text-neutral-600 underline transition hover:text-neutral-900"
        >
          ← 빌드 결과로 돌아가기
        </Link>
        <div className="flex gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 py-4 text-base font-medium text-neutral-900 transition hover:bg-neutral-50"
          >
            코드 다운로드 (ZIP)
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-4 text-base font-medium text-white transition hover:bg-neutral-800"
          >
            새 프로젝트 시작
          </Link>
        </div>
      </div>
    </div>
  );
}
