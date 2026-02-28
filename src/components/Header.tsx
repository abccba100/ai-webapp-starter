import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-14 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
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

        <nav className="hidden items-center gap-8 text-base font-medium text-text2 md:flex">
          <Link href="/" className="transition hover:text-text">
            홈
          </Link>
          <Link href="/projects" className="transition hover:text-text">
            프로젝트
          </Link>
        </nav>
      </div>
    </header>
  );
}
