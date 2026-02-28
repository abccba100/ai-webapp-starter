import Link from "next/link";
import { Container } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-40 pb-20 sm:px-8">
      <Container className="relative text-center">
        <span className="mb-8 inline-block rounded-full border border-border bg-surface2 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
          No-Code AI MVP Maker
        </span>
        <h1 className="mb-8 text-[2.25rem] font-extrabold leading-tight tracking-tight text-text sm:text-4xl" style={{ letterSpacing: "-1px" }}>
          상상만 했던 웹 서비스,
          <br />
          <span className="text-text2">3분 만에 현실로</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-text2">
          개발 지식이 없어도 됩니다. 아이디어 한 줄이면 충분합니다. 지금 바로 AI와 함께 당신만의 MVP를 만들어보세요.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/input"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(108,99,255,0.35)]"
          >
            무료로 시작하기
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-7 py-3 text-sm font-bold text-text transition hover:border-accent hover:text-accent"
          >
            데모 영상 보기
          </button>
        </div>
      </Container>
    </section>
  );
}
