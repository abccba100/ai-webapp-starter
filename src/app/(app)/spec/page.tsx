"use client";

import { useState } from "react";
import SpecEditor from "@/components/SpecEditor";
import { useRouter } from "next/navigation";
import { useWizard } from "@/context/WizardContext";
import { LoadingButton, PageErrorBanner, Button, Card, PageHeader } from "@/components/ui";
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

  const displayName = projectName || (idea.length > 20 ? `${idea.slice(0, 20)}...` : idea);

  return (
    <div className="ds-fade-in space-y-8">
      <PageHeader
        tag="Spec"
        title="AI가 제안하는 앱 설계도입니다"
        subtitle={
          projectName
            ? `"${projectName}"에 대한 분석 결과예요. 수정하거나 추가할 내용이 있나요?`
            : `"${displayName}"에 대한 분석 결과예요. 수정하거나 추가할 내용이 있나요?`
        }
      />

      <SpecEditor />

      {specs.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-text">
            기능 확인 및 승인
          </h2>
          <p className="max-w-none text-base leading-relaxed text-text2">
            우선순위별로 정리된 기능을 최종 검토한 뒤 승인하거나, 한 번만 수정 요청 메모를 남길 수 있어요.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="mb-0">
              <h3 className="mb-4 text-base font-semibold text-accent3">
                필수 기능 (P0)
              </h3>
              {p0Specs.length ? (
                <ul className="min-w-0 space-y-2 break-words text-base text-text">
                  {p0Specs.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent3" />
                      <span>{item.feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-text2">
                  등록된 필수 기능이 없습니다.
                </p>
              )}
            </Card>

            <Card className="mb-0">
              <h3 className="mb-4 text-base font-semibold text-accent2">
                권장 기능 (P1)
              </h3>
              {p1Specs.length ? (
                <ul className="min-w-0 space-y-2 break-words text-base text-text">
                  {p1Specs.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                      <span>{item.feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-text2">
                  등록된 권장 기능이 없습니다.
                </p>
              )}
            </Card>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-base font-medium text-text">
                수정 요청 메모{" "}
                <span className="text-sm text-text2">(1회 입력 가능)</span>
              </label>
              <textarea
                rows={3}
                value={specChangeRequest ?? requestDraft}
                onChange={(e) =>
                  !specChangeRequest && setRequestDraft(e.target.value)
                }
                readOnly={!!specChangeRequest}
                className="ds-input w-full"
                placeholder="기능 명세에 대한 수정이나 보완 요청을 한 번만 남길 수 있어요."
              />
              <p className="mt-2 text-sm text-text2">
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
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleApprove}
                  disabled={!specs.length || isReanalyzing}
                >
                  기능 명세 승인하기
                </Button>
                <LoadingButton
                  onClick={handleSubmitRequest}
                  loading={isReanalyzing}
                  loadingLabel="AI 재분석 중..."
                  disabled={!!specChangeRequest || !requestDraft.trim()}
                  variant="secondary"
                >
                  수정 요청 남기기
                </LoadingButton>
              </div>

              {specApproved && (
                <span className="text-sm font-semibold text-accent2">
                  기능 명세가 승인되었습니다.
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-col gap-4 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => router.push("/input")}
          className="text-left text-base text-text2 underline transition hover:text-text"
        >
          마음에 안 드나요? 다시 입력하기
        </button>
        <div className="flex flex-col items-end gap-1">
          <Button
            type="button"
            onClick={() => specApproved && router.push("/design")}
            disabled={!specApproved}
          >
            이대로 진행하기 →
          </Button>
          {!specApproved && (
            <p className="text-sm text-text2">
              기능 명세를 승인해야 다음 단계로 이동할 수 있어요.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
