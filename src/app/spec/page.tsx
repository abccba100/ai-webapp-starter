\"use client\";
import { useState } from 'react';
import SpecEditor from '@/components/SpecEditor';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/context/WizardContext';

export default function SpecPage() {
  const router = useRouter();
  const {
    idea,
    specs,
    specApproved,
    setSpecApproved,
    specChangeRequest,
    setSpecChangeRequest,
  } = useWizard();
  const [requestDraft, setRequestDraft] = useState('');

  const p0Specs = specs.filter((s) => s.priority === 'P0');
  const p1Specs = specs.filter((s) => s.priority === 'P1');

  const handleApprove = () => {
    if (!specs.length) return;
    setSpecApproved(true);
  };

  const handleSubmitRequest = () => {
    if (specChangeRequest) return;
    const trimmed = requestDraft.trim();
    if (!trimmed) return;
    setSpecChangeRequest(trimmed);
    setSpecApproved(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in-up">
      <div className="mb-8">
        <span className="text-sm font-semibold text-blue-600 mb-1 block">Step 2. 기능 명세</span>
        <h1 className="text-3xl font-bold mb-3">AI가 제안하는 앱 설계도입니다</h1>
        <p className="text-gray-600">
          &quot;<span className="font-medium text-gray-900">{idea.slice(0, 20)}{idea.length > 20 ? '...' : ''}</span>&quot;에 대한 분석 결과예요.<br/>
          수정하거나 추가할 내용이 있나요?
        </p>
      </div>
      
      <SpecEditor />

      {specs.length > 0 && (
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">기능 확인 및 승인</h2>
          <p className="text-sm text-slate-500">
            우선순위별로 정리된 기능을 최종 검토한 뒤 승인하거나, 한 번만 수정 요청 메모를 남길 수 있어요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="text-sm font-semibold text-red-600 mb-2">필수 기능 (P0)</h3>
              {p0Specs.length ? (
                <ul className="space-y-2 text-sm">
                  {p0Specs.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                      <span>{item.feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">등록된 필수 기능이 없습니다.</p>
              )}
            </div>

            <div className="card">
              <h3 className="text-sm font-semibold text-emerald-600 mb-2">권장 기능 (P1)</h3>
              {p1Specs.length ? (
                <ul className="space-y-2 text-sm">
                  {p1Specs.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>{item.feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-400">등록된 권장 기능이 없습니다.</p>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                수정 요청 메모 <span className="text-xs text-slate-400">(1회 입력 가능)</span>
              </label>
              <textarea
                rows={3}
                value={specChangeRequest ?? requestDraft}
                onChange={(e) =>
                  !specChangeRequest && setRequestDraft(e.target.value)
                }
                readOnly={!!specChangeRequest}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:bg-slate-50"
                placeholder="기능 명세에 대한 수정이나 보완 요청을 한 번만 남길 수 있어요."
              />
              <p className="mt-1 text-xs text-slate-400">
                {specChangeRequest
                  ? '이미 수정 요청을 남기셨어요. 내용은 더 이상 변경할 수 없습니다.'
                  : '한 번 제출하면 내용을 수정할 수 없습니다.'}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={!specs.length}
                  className="btn btn-primary text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  기능 명세 승인하기
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  disabled={!!specChangeRequest || !requestDraft.trim()}
                  className="btn border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  수정 요청 남기기
                </button>
              </div>

              {specApproved && (
                <span className="text-xs font-medium text-emerald-600">
                  ✅ 기능 명세가 승인되었습니다.
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="mt-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
        <button 
          onClick={() => router.push('/input')}
          className="text-gray-500 hover:text-gray-800 underline text-sm"
        >
          마음에 안 드나요? 다시 입력하기
        </button>

        <button 
          onClick={() => specApproved && router.push('/design')}
          disabled={!specApproved}
          className="btn btn-primary px-8 py-3 text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          이대로 진행하기 →
        </button>
        {!specApproved && (
          <p className="text-xs text-slate-400 md:text-right">
            기능 명세를 승인해야 다음 단계(Design)로 이동할 수 있어요.
          </p>
        )}
      </div>
    </div>
  );
}
