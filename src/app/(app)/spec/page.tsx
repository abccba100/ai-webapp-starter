"use client";

import { useState } from "react";
import SpecEditor from "@/components/SpecEditor";
import { useRouter } from "next/navigation";
import { useWizard } from "@/context/WizardContext";
import { LoadingButton, PageErrorBanner } from "@/components/ui";
import { mapAnalyzeResultToSpecs } from "@/lib/specUtils";

export default function SpecPage() {
  const router = useRouter();
  const {
    projectName,
    idea,
    specs,
    setSpecs,
    specApproved,
    setSpecApproved,
    specChangeRequest,
    setSpecChangeRequest,
  } = useWizard();
  const [requestDraft, setRequestDraft] = useState("");
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [reanalyzeError, setReanalyzeError] = useState<string | null>(null);

  const p0Specs = specs.filter((s) => s.priority === "P0");
  const p1Specs = specs.filter((s) => s.priority === "P1");

  const handleApprove = () => {
    if (!specs.length) return;
    setSpecApproved(true);
  };

  const handleSubmitRequest = async () => {
    if (specChangeRequest) return;
    const trimmed = requestDraft.trim();
    if (!trimmed) return;

    setIsReanalyzing(true);
    setReanalyzeError(null);

    try {
      const combinedIdea = `${idea}\n\n[사용자 수정 요청]\n${trimmed}`;
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: combinedIdea }),
      });

      const data = await res.json();

      if (!res.ok) {
        setReanalyzeError(data.error || "재분석에 실패했습니다.");
        return;
      }

      const newSpecs = mapAnalyzeResultToSpecs(data);
      setSpecs(newSpecs);
      setSpecChangeRequest(trimmed);
      setSpecApproved(false);
    } catch {
      setReanalyzeError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsReanalyzing(false);
    }
  };

  return (
    <div className="ds-fade-in space-y-10">
      <header className="space-y-2">
        <h1 className="text-5xl font-semibold tracking-tight text-neutral-900">
          AI가 제안하는 앱 설계도입니다
        </h1>
        <p className="text-base text-neutral-600">
          {projectName ? (
            <>
              &quot;<span className="font-medium text-neutral-900">{projectName}</span>&quot;
              에 대한 분석 결과예요.
            </>
          ) : (
            <>
              &quot;
              <span className="font-medium text-neutral-900">
                {idea.slice(0, 20)}
                {idea.length > 20 ? "..." : ""}
              </span>
              &quot;에 대한 분석 결과예요.
            </>
          )}
          <br />
          수정하거나 추가할 내용이 있나요?
        </p>
      </header>

      <SpecEditor />

      {specs.length > 0 && (
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-medium text-neutral-900">
            기능 확인 및 승인
          </h2>
          <p className="text-base text-neutral-600">
            우선순위별로 정리된 기능을 최종 검토한 뒤 승인하거나, 한 번만 수정
            요청 메모를 남길 수 있어요.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-red-600">
                필수 기능 (P0)
              </h3>
              {p0Specs.length ? (
                <ul className="space-y-2 text-base">
                  {p0Specs.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      <span className="text-neutral-900">{item.feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500">
                  등록된 필수 기능이 없습니다.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-base font-medium text-green-600">
                권장 기능 (P1)
              </h3>
              {p1Specs.length ? (
                <ul className="space-y-2 text-base">
                  {p1Specs.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                      <span className="text-neutral-900">{item.feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500">
                  등록된 권장 기능이 없습니다.
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-base font-medium text-neutral-900">
                수정 요청 메모{" "}
                <span className="text-sm text-neutral-500">
                  (1회 입력 가능)
                </span>
              </label>
              <textarea
                rows={3}
                value={specChangeRequest ?? requestDraft}
                onChange={(e) =>
                  !specChangeRequest && setRequestDraft(e.target.value)
                }
                readOnly={!!specChangeRequest}
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 disabled:opacity-60"
                placeholder="기능 명세에 대한 수정이나 보완 요청을 한 번만 남길 수 있어요."
              />
              <p className="mt-2 text-sm text-neutral-500">
                {specChangeRequest
                  ? "이미 수정 요청을 남기셨어요. 내용은 더 이상 변경할 수 없습니다."
                  : "한 번 제출하면 내용을 수정할 수 없습니다."}
              </p>
              {reanalyzeError && (
                <div className="mt-4">
                  <PageErrorBanner
                    message={reanalyzeError}
                    onRetry={() => setReanalyzeError(null)}
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={!specs.length || isReanalyzing}
                  className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-3 text-base font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  기능 명세 승인하기
                </button>
                <LoadingButton
                  onClick={handleSubmitRequest}
                  loading={isReanalyzing}
                  loadingLabel="AI 재분석 중..."
                  disabled={!!specChangeRequest || !requestDraft.trim()}
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 py-3 text-base font-medium text-neutral-900 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  수정 요청 남기기
                </LoadingButton>
              </div>

              {specApproved && (
                <span className="text-sm font-medium text-green-600">
                  기능 명세가 승인되었습니다.
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-col gap-4 border-t border-neutral-200 pt-10 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => router.push("/input")}
          className="text-left text-base text-neutral-600 underline transition hover:text-neutral-900"
        >
          마음에 안 드나요? 다시 입력하기
        </button>
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={() => specApproved && router.push("/design")}
            disabled={!specApproved}
            className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-8 py-4 text-base font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            이대로 진행하기 →
          </button>
          {!specApproved && (
            <p className="text-sm text-neutral-500">
              기능 명세를 승인해야 다음 단계로 이동할 수 있어요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
