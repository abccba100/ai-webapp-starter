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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">앱 분위기를 선택해주세요</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {THEMES.map((theme) => (
          <div 
            key={theme.id}
            onClick={() => handleSelect(theme.id)}
            className={`cursor-pointer border-2 rounded-xl p-6 transition-all hover:-translate-y-1
              ${selectedTheme === theme.id ? 'border-blue-600 shadow-lg' : 'border-gray-200 hover:border-gray-400'}
              ${theme.color} h-64 flex flex-col justify-center items-center text-center
            `}>
            <div className="w-16 h-16 bg-white rounded-full shadow mb-4" />
            <h3 className="font-bold text-lg">{theme.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{theme.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <button 
          disabled={!selectedTheme}
          onClick={() => router.push('/build')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed">
          앱 생성하기 🚀
        </button>
      </div>
    </div>
  );
}
