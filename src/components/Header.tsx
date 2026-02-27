// src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition">
            AI
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            App<span className="text-blue-600">Builder</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-600">
          <Link href="#" className="hover:text-blue-600">가이드</Link>
          <Link href="#" className="hover:text-blue-600">로그인</Link>
        </nav>
      </div>
    </header>
  );
}
