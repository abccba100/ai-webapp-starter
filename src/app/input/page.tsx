"use client";
import { useState } from 'react';
import { useWizard } from '@/context/WizardContext';
import { useRouter } from 'next/navigation';

const EXAMPLES = ["🥕 동네 주민 중고 거래 마켓", "✅ 팀 프로젝트 일정 관리 툴", "🏠 인테리어 견적 비교 플랫폼"];

export default function InputPage() {
  const { idea, setIdea, setSpecs } = useWizard();
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNext = async () => {
    if (idea.trim().length < 10) {
      alert("아이디어를 조금 더 구체적으로 적어주세요! (최소 10자)");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setSpecs([
        { id: '1', feature: '회원가입/로그인', priority: 'P0' },
        { id: '2', feature: '상품 목록 리스트', priority: 'P0' },
        { id: '3', feature: '실시간 채팅', priority: 'P1' },
        { id: '4', feature: '관리자 대시보드', priority: 'P1' },
      ]);
      setIsAnalyzing(false);
      router.push('/spec');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in-up">
      <h1 className="text-3xl font-bold mb-2">어떤 앱을 만들고 싶으신가요?</h1>
      <p className="text-gray-500 mb-6">대상 사용자와 핵심 기능을 자유롭게 이야기해주세요.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setIdea(ex)}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-100 transition"
          >
            💡 {ex}
          </button>
        ))}
      </div>

      <div className="relative">
        <textarea
          className="w-full h-56 p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg leading-relaxed shadow-sm transition"
          placeholder="예: 위치 기반으로 가까운 사람들과 취미를 공유하는 모임 앱을 만들고 싶어요. 채팅 기능과 일정 투표 기능이 꼭 필요해요."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          disabled={isAnalyzing}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          disabled={isAnalyzing}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg
            ${isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-1'}
          `}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              AI가 분석 중...
            </>
          ) : (
            <>AI 분석 시작하기 ✨</>
          )}
        </button>
      </div>
    </div>
  );
}
