import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-neutral-900 transition hover:text-neutral-600"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 font-bold text-white text-sm">
            AI
          </span>
          AppBuilder
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-neutral-600">
          <Link href="/" className="transition hover:text-neutral-900">
            홈
          </Link>
          <Link href="/projects" className="transition hover:text-neutral-900">
            프로젝트
          </Link>
        </nav>
      </div>
    </header>
  );
}
