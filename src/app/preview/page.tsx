"use client";

import Link from "next/link";
import { useWizard } from "@/context/WizardContext";

export default function PreviewPage() {
  const { specs, selectedTheme } = useWizard();

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in-up space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-secondary">앱 미리보기</h1>
        <p className="text-slate-600 text-sm">
          생성된 MVP 결과물을 확인할 수 있습니다. (실제 빌드 연동은 추후 적용 예정)
        </p>
      </header>

      <div className="card rounded-2xl overflow-hidden">
        <div className="aspect-video bg-slate-100 flex items-center justify-center border-b border-slate-200">
          <div className="text-center text-slate-400">
            <p className="text-sm font-medium">Preview 영역</p>
            <p className="text-xs mt-1">테마: {selectedTheme || "—"}</p>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <h2 className="text-sm font-semibold text-slate-700 mb-2">포함된 기능 ({specs.length}개)</h2>
          <ul className="flex flex-wrap gap-2">
            {specs.map((s) => (
              <li
                key={s.id}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {s.feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 mt-8 border-t border-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          href="/build"
          className="text-slate-500 hover:text-slate-700 underline text-sm"
        >
          ← 빌드 결과로 돌아가기
        </Link>
        <div className="flex gap-3">
          <button
            type="button"
            className="btn btn-outline px-6 py-3 rounded-xl text-sm font-semibold"
          >
            코드 다운로드 (ZIP)
          </button>
          <Link
            href="/"
            className="btn btn-primary px-6 py-3 rounded-xl text-sm font-semibold shadow-md"
          >
            새 프로젝트 시작
          </Link>
        </div>
      </div>
    </div>
  );
}
