"use client";
import { useState } from "react";
import { useWizard } from "@/context/WizardContext";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { createProject } from "@/lib/supabase/projects";
import { createIdea } from "@/lib/supabase/ideas";
import { saveSpecifications } from "@/lib/supabase/specifications";
import { LoadingButton } from "@/components/ui";

const MIN_LENGTH = 50;

const TEMPLATES = [
  {
    id: "market",
    title: "동네 마켓",
    desc: "중고 거래 / 나눔 / 동네 소통",
    example:
      "우리 동네 주민들이 직접 중고 물건을 올리고, 채팅으로 가격을 협의해서 거래할 수 있는 동네 기반 중고 거래 앱을 만들고 싶어요. 안전한 거래를 위해 인증된 동네만 이용 가능했으면 좋겠고, 거래 후기와 평점 기능도 필요해요.",
  },
  {
    id: "project",
    title: "팀 프로젝트 관리",
    desc: "칸반 보드 / 일정 / 알림",
    example:
      "스타트업 팀이 스프린트 단위로 업무를 관리할 수 있는 프로젝트 관리 툴을 만들고 싶어요. 칸반 보드 방식으로 업무를 드래그해서 이동할 수 있고, 마감일 전에는 슬랙이나 이메일로 자동 리마인드가 가면 좋겠어요.",
  },
  {
    id: "interior",
    title: "인테리어 견적",
    desc: "사진 기반 견적 비교",
    example:
      "집 인테리어를 맡기고 싶은 사람들이 집 사진과 원하는 스타일을 올리면, 여러 인테리어 업체가 견적을 제안하는 플랫폼을 만들고 싶어요. 견적서 비교 화면과 업체 포트폴리오, 후기 기능이 꼭 필요해요.",
  },
];

const MOCK_SPECS = [
  { id: "1", feature: "회원가입/로그인", priority: "P0" as const },
  { id: "2", feature: "상품 목록 리스트", priority: "P0" as const },
  { id: "3", feature: "실시간 채팅", priority: "P1" as const },
  { id: "4", feature: "관리자 대시보드", priority: "P1" as const },
];

export default function InputPage() {
  const { idea, setIdea, setSpecs, setCurrentProjectId, setCurrentIdeaId } = useWizard();
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const supabase = createSupabaseClient();

  const handleNext = async () => {
    const trimmed = idea.trim();

    if (trimmed.length < MIN_LENGTH) {
      setError(
        `아이디어를 최소 ${MIN_LENGTH}자 이상 입력해주세요. (현재 ${trimmed.length}자)`
      );
      return;
    }

    setError(null);
    setIsAnalyzing(true);

    const projectName = trimmed.length > 50 ? `${trimmed.slice(0, 47)}...` : trimmed;
    let projectId: string | null = null;
    let ideaId: string | null = null;

    if (supabase) {
      const proj = await createProject(supabase, projectName);
      if (proj) projectId = proj.id;
      if (projectId) {
        const ideaRow = await createIdea(supabase, projectId, trimmed);
        if (ideaRow) ideaId = ideaRow.id;
      }
    }

    const specs = MOCK_SPECS;
    if (supabase && ideaId) {
      await saveSpecifications(supabase, ideaId, specs);
    }
    if (projectId) setCurrentProjectId(projectId);
    if (ideaId) setCurrentIdeaId(ideaId);
    setSpecs(specs);
    await new Promise((r) => setTimeout(r, 800));
    setIsAnalyzing(false);
    router.push("/spec");
  };

  const handleSelectTemplate = (id: string) => {
    const template = TEMPLATES.find((t) => t.id === id);
    if (!template) return;
    setSelectedTemplateId(id);
    setIdea(template.example);
    setError(null);
  };

  const currentLength = idea.trim().length;

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in-up space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">어떤 앱을 만들고 싶으신가요?</h1>
        <p className="text-gray-500 text-sm">
          대상 사용자, 해결하고 싶은 문제, 꼭 필요한 핵심 기능을 자연스럽게 적어주세요.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-700">
          예시 템플릿 선택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEMPLATES.map((tpl) => {
            const isActive = selectedTemplateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl.id)}
                className={`text-left rounded-xl border-2 p-4 bg-white shadow-sm transition-all hover:-translate-y-0.5
                  ${
                    isActive
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-slate-200 hover:border-slate-400"
                  }
                `}
              >
                <div className="mb-1 text-xs font-semibold text-primary uppercase tracking-wide">
                  템플릿
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                  {tpl.title}
                </h3>
                <p className="text-xs text-slate-500 mb-2">{tpl.desc}</p>
                <p className="text-[11px] text-slate-400 line-clamp-3">
                  {tpl.example}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-2">
        <label
          htmlFor="idea"
          className="block text-sm font-semibold text-slate-700"
        >
          아이디어 입력
        </label>
        <div className="relative">
          <textarea
            id="idea"
            aria-invalid={!!error}
            aria-describedby="idea-hint idea-count"
            className={`w-full h-72 p-5 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-base leading-relaxed shadow-sm transition bg-white ${
              error ? "border-destructive" : "border-slate-300"
            }`}
            placeholder="예: 위치 기반으로 가까운 사람들과 취미를 공유하는 모임 앱을 만들고 싶어요. 채팅 기능과 일정 투표 기능이 꼭 필요해요. 어떤 사람들이 주로 사용할지, 어떤 상황에서 유용할지도 함께 적어주세요."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isAnalyzing}
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-xs" id="idea-hint">
          <span
            id="idea-count"
            role={error ? "alert" : undefined}
            className={error ? "text-destructive" : "text-slate-500"}
          >
            {error
              ? error
              : `최소 ${MIN_LENGTH}자 이상, 구체적으로 작성할수록 더 좋은 결과를 얻을 수 있어요.`}
          </span>
          <span
            className={
              currentLength < MIN_LENGTH ? "text-destructive" : "text-success"
            }
          >
            {currentLength} / {MIN_LENGTH}자
          </span>
        </div>
      </section>

      <div className="pt-6 mt-8 border-t border-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
        <LoadingButton
          onClick={handleNext}
          loading={isAnalyzing}
          loadingLabel="다음 단계로 이동 중..."
          className={`btn btn-primary px-8 py-3 rounded-xl text-sm font-semibold shadow-md ${
            isAnalyzing ? "opacity-80 cursor-not-allowed" : "hover:-translate-y-0.5"
          }`}
        >
          다음 단계로
        </LoadingButton>
      </div>
    </div>
  );
}
