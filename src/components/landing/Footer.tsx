import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-12 px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2 font-semibold text-neutral-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-sm font-bold text-white">
            AI
          </span>
          AppBuilder
        </div>
        <div className="flex items-center gap-8 text-base text-neutral-600">
          <Link href="#" className="transition hover:text-neutral-900">
            이용약관
          </Link>
          <Link href="#" className="transition hover:text-neutral-900">
            개인정보처리방침
          </Link>
          <Link href="/projects" className="transition hover:text-neutral-900">
            프로젝트
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-4xl text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} AI App Builder
      </p>
    </footer>
  );
}
