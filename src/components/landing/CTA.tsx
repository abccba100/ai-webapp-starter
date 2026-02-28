import Link from "next/link";
import { Container } from "@/components/ui";

export function CTA() {
  return (
    <section className="py-20">
      <Container>
        <div className="min-w-0 overflow-hidden rounded-card border border-border bg-surface px-4 py-16 text-center sm:px-8 sm:py-20">
          <h2 className="mb-4 text-2xl font-semibold text-text sm:text-3xl">
            지금 바로 시작하세요
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-text2">
            회원가입 없이 무료로 사용할 수 있습니다. 아이디어 한 줄로 당신만의 앱을 만들어보세요.
          </p>
          <Link
            href="/input"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(108,99,255,0.35)]"
          >
            무료로 시작하기
          </Link>
        </div>
      </Container>
    </section>
  );
}
