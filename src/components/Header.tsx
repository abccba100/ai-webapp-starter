// src/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-secondary sticky top-0 z-50 border-b border-secondary/40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-primary/90 transition">
            AI
          </div>
          <span className="font-bold text-xl text-white tracking-tight">
            App<span className="text-accent">Builder</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-4 text-sm font-medium text-slate-200">
          <Link href="#" className="hover:text-accent">
            가이드
          </Link>
          <Link href="#" className="hover:text-accent">
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}
