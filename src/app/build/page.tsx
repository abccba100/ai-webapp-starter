"use client";
import { useEffect, useState } from 'react';
import { useWizard } from '@/context/WizardContext';
import Link from 'next/link';

const LOG_MESSAGES = [
  "서버 환경을 구축하고 있습니다...",
  "데이터베이스 스키마를 생성 중입니다...",
  "사용자 인증 모듈을 연결하고 있습니다...",
  "선택하신 디자인 테마를 입히는 중입니다...",
  "모바일 반응형 레이아웃을 최적화 중입니다...",
  "최종 마무리 중..."
];

export default function BuildPage() {
  const { specs, selectedTheme, resetWizard } = useWizard();
  const [logIndex, setLogIndex] = useState(0);

  const isComplete = logIndex >= LOG_MESSAGES.length;

  useEffect(() => {
    if (!isComplete) {
      const timeout = setTimeout(() => {
        setLogIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [logIndex, isComplete]);

  if (!isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] animate-fade-in-up">
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">앱을 생성하고 있어요</h2>
        
        <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 shadow-xl h-48 overflow-hidden flex flex-col justify-end">
          {LOG_MESSAGES.slice(0, logIndex + 1).map((msg, idx) => (
            <div key={idx} className="mb-1 opacity-80">
              <span className="mr-2 text-gray-500">&gt;</span>
              {msg}
              {idx === logIndex && idx < LOG_MESSAGES.length && <span className="animate-pulse ml-1">_</span>}
            </div>
          ))}
        </div>
        <p className="mt-4 text-gray-400 text-sm">잠시만 기다려주세요. 약 1분 정도 소요됩니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in-up">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-8 text-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
        
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">나만의 앱이 완성되었습니다!</h1>
        <p className="text-gray-600 mb-8">
          이제 아래 링크에서 바로 확인하거나 코드를 다운로드할 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition flex items-center justify-center gap-2">
            <span>🚀 결과물 보러가기</span>
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
            코드 다운로드 (ZIP)
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-gray-700 mb-4">생성 요약</h3>
        <div className="space-y-2 text-sm text-gray-600">
           <div className="flex justify-between">
             <span>선택 테마</span>
             <span className="font-medium text-gray-900 capitalize">{selectedTheme || '선택 안함'}</span>
           </div>
           <div className="flex justify-between">
             <span>구현된 기능</span>
             <span className="font-medium text-gray-900">{specs.length}개 모듈</span>
           </div>
        </div>
      </div>

      <div className="mt-8 text-center">
         <Link href="/" onClick={resetWizard} className="text-gray-400 hover:text-gray-600 underline text-sm">
           새로운 프로젝트 만들기
         </Link>
      </div>
    </div>
  );
}
