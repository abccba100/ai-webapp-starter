import Link from "next/link";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-text">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
              AI
            </span>
            AppBuilder
          </div>
          <div className="flex items-center gap-8 text-base text-text2">
            <Link href="#" className="transition hover:text-text">
              이용약관
            </Link>
            <Link href="#" className="transition hover:text-text">
              개인정보처리방침
            </Link>
            <Link href="/projects" className="transition hover:text-text">
              프로젝트
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-text2">
          © {new Date().getFullYear()} AI App Builder
        </p>
      </Container>
    </footer>
  );
}
