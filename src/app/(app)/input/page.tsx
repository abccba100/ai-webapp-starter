"use client";

import { useState } from "react";
import { useWizard } from "@/context/WizardContext";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { createProject } from "@/lib/supabase/projects";
import { createIdea } from "@/lib/supabase/ideas";
import { saveSpecifications } from "@/lib/supabase/specifications";
import { LoadingButton, PageErrorBanner } from "@/components/ui";
import { mapAnalyzeResultToSpecs } from "@/lib/specUtils";

const MIN_IDEA_LENGTH = 50;
const MIN_PROJECT_NAME = 2;

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

export default function InputPage() {
  const {
    projectName,
    setProjectName,
    oneLineDesc,
    setOneLineDesc,
    idea,
    setIdea,
    setSpecs,
    setSpecApproved,
    setCurrentProjectId,
    setCurrentIdeaId,
  } = useWizard();
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const supabase = createSupabaseClient();

  const handleNext = async () => {
    const trimmedName = projectName.trim();
    const trimmedDesc = oneLineDesc.trim();
    const trimmedIdea = idea.trim();

    if (trimmedName.length < MIN_PROJECT_NAME) {
      setError("프로젝트 이름을 2자 이상 입력해주세요.");
      return;
    }
    if (trimmedIdea.length < MIN_IDEA_LENGTH) {
      setError(
        `만들고 싶은 프로그램을 최소 ${MIN_IDEA_LENGTH}자 이상 입력해주세요. (현재 ${trimmedIdea.length}자)`
      );
      return;
    }

    setError(null);
    setApiError(null);
    setIsAnalyzing(true);

    let projectId: string | null = null;
    let ideaId: string | null = null;

    if (supabase) {
      const proj = await createProject(supabase, trimmedName);
      if (proj) projectId = proj.id;
      if (projectId) {
        const ideaRow = await createIdea(supabase, projectId, trimmedIdea);
        if (ideaRow) ideaId = ideaRow.id;
      }
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: trimmedIdea }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "AI 분석에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        setIsAnalyzing(false);
        return;
      }

      const specs = mapAnalyzeResultToSpecs(data);
      if (supabase && ideaId) {
        await saveSpecifications(supabase, ideaId, specs);
      }
      if (projectId) setCurrentProjectId(projectId);
      if (ideaId) setCurrentIdeaId(ideaId);
      setSpecs(specs);
      setSpecApproved(false);
      router.push("/spec");
    } catch {
      setApiError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectTemplate = (id: string) => {
    const template = TEMPLATES.find((t) => t.id === id);
    if (!template) return;
    setSelectedTemplateId(id);
    setOneLineDesc(template.desc);
    setIdea(template.example);
    setError(null);
    setApiError(null);
  };

  const currentLength = idea.trim().length;

  return (
    <div className="ds-fade-in space-y-10">
      <header className="space-y-2">
        <h1 className="text-5xl font-semibold tracking-tight text-neutral-900">
          어떤 앱을 만들고 싶으신가요?
        </h1>
        <p className="text-base text-neutral-600">
          프로젝트 이름과 한 줄 설명을 입력한 뒤, 만들고 싶은 프로그램을
          자유롭게 서술해 주세요.
        </p>
      </header>

      {apiError && (
        <PageErrorBanner
          message={apiError}
          onRetry={() => setApiError(null)}
        />
      )}

      <section className="space-y-4">
        <h2 className="text-2xl font-medium text-neutral-900">
          예시 템플릿 선택
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TEMPLATES.map((tpl) => {
            const isActive = selectedTemplateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl.id)}
                className={`text-left rounded-xl border-2 p-6 shadow-sm transition ${
                  isActive
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 bg-white hover:border-neutral-300"
                }`}
              >
                <h3 className="mb-1 text-base font-medium text-neutral-900">
                  {tpl.title}
                </h3>
                <p className="mb-2 text-sm text-neutral-600">{tpl.desc}</p>
                <p className="line-clamp-3 text-sm text-neutral-500">
                  {tpl.example}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="projectName"
            className="block text-base font-medium text-neutral-900"
          >
            프로젝트 이름
          </label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            disabled={isAnalyzing}
            placeholder="예: 동네 마켓"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300/50"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="oneLineDesc"
            className="block text-base font-medium text-neutral-900"
          >
            한 줄 설명 (자연어)
          </label>
          <input
            id="oneLineDesc"
            type="text"
            value={oneLineDesc}
            onChange={(e) => setOneLineDesc(e.target.value)}
            disabled={isAnalyzing}
            placeholder="예: 중고 거래 / 나눔 / 동네 소통"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300/50"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="idea"
            className="block text-base font-medium text-neutral-900"
          >
            만들고 싶은 프로그램 (자유롭게 서술)
          </label>
          <div className="relative">
            <textarea
              id="idea"
              aria-invalid={!!error}
              aria-describedby="idea-hint idea-count"
              className={`h-64 w-full resize-none rounded-xl border bg-white p-6 text-base leading-relaxed text-neutral-900 transition focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-neutral-200 focus:border-neutral-400 focus:ring-neutral-300/50"
              }`}
              placeholder="예: 위치 기반으로 가까운 사람들과 취미를 공유하는 모임 앱을 만들고 싶어요. 채팅 기능과 일정 투표 기능이 꼭 필요해요. 어떤 사람들이 주로 사용할지, 어떤 상황에서 유용할지도 함께 적어주세요."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>
          <div
            className="mt-2 flex items-center justify-between text-sm"
            id="idea-hint"
          >
            <span
              id="idea-count"
              role={error ? "alert" : undefined}
              className={error ? "text-red-600" : "text-neutral-600"}
            >
              {error
                ? error
                : `최소 ${MIN_IDEA_LENGTH}자 이상, 구체적으로 작성할수록 더 좋은 결과를 얻을 수 있어요.`}
            </span>
            <span
              className={
                currentLength < MIN_IDEA_LENGTH ? "text-red-600" : "text-green-600"
              }
            >
              {currentLength} / {MIN_IDEA_LENGTH}자
            </span>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 border-t border-neutral-200 pt-10 md:flex-row md:items-center md:justify-end">
        <LoadingButton
          onClick={handleNext}
          loading={isAnalyzing}
          loadingLabel="AI 분석 중..."
          className={`px-8 py-4 text-base ${
            isAnalyzing ? "cursor-not-allowed" : ""
          }`}
        >
          다음 단계로
        </LoadingButton>
      </div>
    </div>
  );
}
