"use client";

import { useEffect } from "react";
import { useWizard } from "@/context/WizardContext";
import { useRouter } from "next/navigation";
import { Button, PageHeader } from "@/components/ui";
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
    color: "bg-surface2",
  },
  {
    id: "business",
    title: "Corporate Trust",
    desc: "신뢰감을 주는 블루톤",
    color: "bg-surface2",
  },
  {
    id: "trendy",
    title: "Vibrant Pop",
    desc: "강렬한 색감과 큰 폰트",
    color: "bg-surface2",
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
    <div className="ds-fade-in space-y-8">
      <PageHeader
        tag="Design"
        title="앱 분위기를 선택해주세요"
        subtitle="앱의 전체적인 분위기를 선택하면 디자인에 반영됩니다."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => handleSelect(theme.id)}
            className={`flex min-h-64 min-w-0 cursor-pointer flex-col items-center justify-center rounded-card border-2 p-8 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
              selectedTheme === theme.id
                ? "border-accent ring-2 ring-accent/30"
                : "border-border hover:border-[#3a3a50]"
            } ${theme.color}`}
          >
            <h3 className="text-lg font-semibold text-text">
              {theme.title}
            </h3>
            <p className="mt-2 text-base text-text2">{theme.desc}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-10 md:flex-row md:items-center md:justify-end">
        <Button
          type="button"
          disabled={!selectedTheme}
          onClick={() => router.push("/build")}
        >
          앱 생성하기
        </Button>
      </div>
    </div>
  );
}
