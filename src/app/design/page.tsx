// src/app/design/page.tsx
"use client";
import { useEffect } from 'react';
import { useWizard } from '@/context/WizardContext';
import { useRouter } from 'next/navigation';
import { DesignTheme } from '@/types';

const THEMES: { id: DesignTheme; title: string; desc: string; color: string }[] = [
  { id: 'minimal', title: 'Minimal Clean', desc: '여백이 많고 깔끔한 스타일', color: 'bg-gray-50' },
  { id: 'business', title: 'Corporate Trust', desc: '신뢰감을 주는 블루톤', color: 'bg-blue-50' },
  { id: 'trendy', title: 'Vibrant Pop', desc: '강렬한 색감과 큰 폰트', color: 'bg-purple-50' },
];

export default function DesignPage() {
  const { selectedTheme, setTheme, specApproved } = useWizard();
  const router = useRouter();

  useEffect(() => {
    if (!specApproved) {
      router.replace('/spec');
    }
  }, [specApproved, router]);

  const handleSelect = (id: DesignTheme) => {
    setTheme(id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in-up space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-center">앱 분위기를 선택해주세요</h1>
        <p className="text-gray-500 text-sm text-center">
          앱의 전체적인 분위기를 선택하면 디자인에 반영됩니다.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => handleSelect(theme.id)}
            className={`text-left cursor-pointer border-2 rounded-xl p-6 transition-all hover:-translate-y-1
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              ${selectedTheme === theme.id ? 'border-primary shadow-lg ring-2 ring-primary/30' : 'border-slate-200 hover:border-slate-400'}
              ${theme.color} h-64 flex flex-col justify-center items-center text-center
            `}
          >
            <div className="w-16 h-16 bg-white rounded-full shadow mb-4" />
            <h3 className="font-bold text-lg">{theme.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{theme.desc}</p>
          </button>
        ))}
      </div>
      <div className="pt-6 mt-8 border-t border-slate-200 flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
        <button
          type="button"
          disabled={!selectedTheme}
          onClick={() => router.push('/build')}
          className="btn btn-primary px-8 py-3 rounded-xl text-sm font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          앱 생성하기 🚀
        </button>
      </div>
    </div>
  );
}
