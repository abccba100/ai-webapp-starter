// src/app/page.tsx
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
        No-Code AI MVP Maker
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold text-secondary mb-6 leading-tight">
        상상만 했던 웹 서비스,<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
          3분 만에 현실로
        </span>
      </h1>

      <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
        개발 지식이 없어도 됩니다. 아이디어 한 줄이면 충분합니다.<br />
        지금 바로 AI와 함께 당신만의 MVP를 만들어보세요.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        <Link
          href="/input"
          className="btn btn-primary px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center"
        >
          무료로 시작하기 🚀
        </Link>
        <button
          type="button"
          className="btn border border-slate-200 bg-white text-slate-700 px-8 py-4 rounded-xl text-lg font-medium hover:bg-slate-50 transition shadow-sm text-center"
        >
          데모 영상 보기
        </button>
      </div>

      {/* Social Proof Section */}
      <div className="mt-20 pt-10 border-t border-gray-100 w-full">
        <p className="text-gray-500 mb-6">이미 5,000개 이상의 아이디어가 앱으로 탄생했습니다</p>
        <div className="flex justify-center gap-8 opacity-50 grayscale">
           {/* 로고 placeholder */}
           <div className="h-8 w-24 bg-gray-300 rounded"></div>
           <div className="h-8 w-24 bg-gray-300 rounded"></div>
           <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
