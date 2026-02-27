'use client';

import { useState } from 'react';

const themes = {
  minimal: {
    name: "Minimal (심플)",
    wrapper: "bg-white text-black font-mono",
    card: "border border-black p-6 rounded-none shadow-none",
    button: "w-full bg-black text-white py-3 hover:bg-gray-800 transition-all rounded-none",
    badge: "border border-black px-2 py-1 text-xs inline-block mb-2"
  },
  business: {
    name: "Business (신뢰)",
    wrapper: "bg-slate-50 text-slate-800 font-sans",
    card: "bg-white border border-slate-200 p-6 rounded-lg shadow-md",
    button: "w-full bg-blue-700 text-white py-3 hover:bg-blue-800 transition-all rounded-md font-semibold shadow-sm",
    badge: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs inline-block mb-2 font-bold"
  },
  trendy: {
    name: "Trendy (감성)",
    wrapper: "bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900",
    card: "bg-white/80 backdrop-blur-sm border border-white p-6 rounded-3xl shadow-xl",
    button: "w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 hover:opacity-90 transition-all rounded-2xl shadow-lg transform hover:-translate-y-1",
    badge: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-xs inline-block mb-2 shadow-sm"
  }
};

type ThemeKey = keyof typeof themes;

export default function ThemePage() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('minimal');
  const style = themes[currentTheme];

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-10">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🎨 디자인 테마 선택</h2>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => setCurrentTheme('minimal')}
            className={`p-2 text-sm border rounded ${currentTheme === 'minimal' ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
          >
            Minimal
          </button>
          <button 
            onClick={() => setCurrentTheme('business')}
            className={`p-2 text-sm border rounded ${currentTheme === 'business' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-blue-800'}`}
          >
            Business
          </button>
          <button 
            onClick={() => setCurrentTheme('trendy')}
            className={`p-2 text-sm border rounded ${currentTheme === 'trendy' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-purple-800'}`}
          >
            Trendy
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">
          👇 아래 화면이 즉시 변경됩니다.
        </p>
      </div>

      <div className={`w-full max-w-sm transition-all duration-500 p-8 ${style.wrapper} border-4 border-dashed border-gray-300`}>
        <div className={style.card}>
          <span className={style.badge}>New Analysis</span>
          <h1 className="text-2xl font-bold mb-2">프로젝트 분석 결과</h1>
          <p className="opacity-80 mb-6 leading-relaxed">
            사용자가 선택한 <strong>{style.name}</strong> 스타일이 적용된 화면입니다. 
            테두리, 색상, 그림자, 폰트가 모두 달라집니다.
          </p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm opacity-70 border-b pb-2 border-current">
              <span>예상 비용</span>
              <span>₩ 5,000,000</span>
            </div>
            <div className="flex justify-between items-center text-sm opacity-70 border-b pb-2 border-current">
              <span>개발 기간</span>
              <span>4 Weeks</span>
            </div>
          </div>

          <div className="mt-8">
            <button className={style.button}>
              상세 리포트 확인하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
