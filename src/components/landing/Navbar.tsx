"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex h-14 max-w-[960px] items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-text transition hover:text-text2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            AI
          </span>
          AppBuilder
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-base text-text2 transition hover:text-text"
          >
            기능
          </Link>
          <Link
            href="#how-it-works"
            className="text-base text-text2 transition hover:text-text"
          >
            사용법
          </Link>
          <Link
            href="/projects"
            className="text-base text-text2 transition hover:text-text"
          >
            프로젝트
          </Link>
          <Link
            href="/input"
            className="rounded-lg bg-accent px-4 py-2 text-base font-bold text-white transition hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(108,99,255,0.35)]"
          >
            시작하기
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-text2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-4 border-t border-border bg-surface px-4 py-6 sm:px-8 md:hidden">
          <Link
            href="#features"
            className="text-text2 transition hover:text-text"
            onClick={() => setMobileOpen(false)}
          >
            기능
          </Link>
          <Link
            href="#how-it-works"
            className="text-text2 transition hover:text-text"
            onClick={() => setMobileOpen(false)}
          >
            사용법
          </Link>
          <Link
            href="/projects"
            className="text-text2 transition hover:text-text"
            onClick={() => setMobileOpen(false)}
          >
            프로젝트
          </Link>
          <Link
            href="/input"
            className="rounded-lg bg-accent px-4 py-2 text-center font-bold text-white"
            onClick={() => setMobileOpen(false)}
          >
            시작하기
          </Link>
        </div>
      )}
    </nav>
  );
}
