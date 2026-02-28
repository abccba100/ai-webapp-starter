"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-neutral-900 transition hover:text-neutral-600"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-white">
            AI
          </span>
          AppBuilder
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-base text-neutral-600 transition hover:text-neutral-900"
          >
            기능
          </Link>
          <Link
            href="#how-it-works"
            className="text-base text-neutral-600 transition hover:text-neutral-900"
          >
            사용법
          </Link>
          <Link
            href="/projects"
            className="text-base text-neutral-600 transition hover:text-neutral-900"
          >
            프로젝트
          </Link>
          <Link
            href="/input"
            className="rounded-lg bg-neutral-900 px-4 py-2 text-base font-medium text-white transition hover:bg-neutral-800"
          >
            시작하기
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-neutral-600 md:hidden"
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
        <div className="flex flex-col gap-4 border-t border-neutral-200 bg-white px-8 py-6 md:hidden">
          <Link
            href="#features"
            className="text-neutral-600 transition hover:text-neutral-900"
            onClick={() => setMobileOpen(false)}
          >
            기능
          </Link>
          <Link
            href="#how-it-works"
            className="text-neutral-600 transition hover:text-neutral-900"
            onClick={() => setMobileOpen(false)}
          >
            사용법
          </Link>
          <Link
            href="/projects"
            className="text-neutral-600 transition hover:text-neutral-900"
            onClick={() => setMobileOpen(false)}
          >
            프로젝트
          </Link>
          <Link
            href="/input"
            className="rounded-lg bg-neutral-900 px-4 py-2 text-center font-medium text-white"
            onClick={() => setMobileOpen(false)}
          >
            시작하기
          </Link>
        </div>
      )}
    </nav>
  );
}
