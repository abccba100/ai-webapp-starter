"use client";

import { useEffect } from "react";
import { useWizard } from "@/context/WizardContext";
import { useRouter } from "next/navigation";
import { DesignTheme } from "@/types";

const THEMES: {
  id: DesignTheme;
  title: string;
  desc: string;
  color: string;
}[] = [
  {
    id: "minimal",
    title: "Minimal Clean",
    desc: "여백이 많고 깔끔한 스타일",
    color: "bg-neutral-50",
  },
  {
    id: "business",
    title: "Corporate Trust",
    desc: "신뢰감을 주는 블루톤",
    color: "bg-neutral-100",
  },
  {
    id: "trendy",
    title: "Vibrant Pop",
    desc: "강렬한 색감과 큰 폰트",
    color: "bg-neutral-100",
  },
];

export default function DesignPage() {
  const { selectedTheme, setTheme, specApproved, buildComplete } = useWizard();
  const router = useRouter();

  useEffect(() => {
    if (!specApproved) {
      router.replace("/spec");
      return;
    }
    if (buildComplete) {
      router.replace("/build");
    }
  }, [specApproved, buildComplete, router]);

  const handleSelect = (id: DesignTheme) => {
    setTheme(id);
  };

  return (
    <div className="ds-fade-in space-y-10">
      <header className="space-y-2 text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-neutral-900">
          앱 분위기를 선택해주세요
        </h1>
        <p className="text-center text-base text-neutral-600">
          앱의 전체적인 분위기를 선택하면 디자인에 반영됩니다.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => handleSelect(theme.id)}
            className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-8 text-center shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 ${
              selectedTheme === theme.id
                ? "border-neutral-900 ring-2 ring-neutral-300"
                : "border-neutral-200 hover:border-neutral-300"
            } ${theme.color}`}
          >
            <h3 className="text-lg font-medium text-neutral-900">
              {theme.title}
            </h3>
            <p className="mt-2 text-base text-neutral-600">{theme.desc}</p>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 border-t border-neutral-200 pt-10 md:flex-row md:items-center md:justify-end">
        <button
          type="button"
          disabled={!selectedTheme}
          onClick={() => router.push("/build")}
          className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-8 py-4 text-base font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          앱 생성하기
        </button>
      </div>
    </div>
  );
}
