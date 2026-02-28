import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-8 pt-40 pb-20">
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-8 inline-block rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-neutral-600">
          No-Code AI MVP Maker
        </span>
        <h1 className="mb-8 text-5xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
          상상만 했던 웹 서비스,
          <br />
          <span className="text-neutral-700">3분 만에 현실로</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-neutral-600">
          개발 지식이 없어도 됩니다. 아이디어 한 줄이면 충분합니다.
          <br className="hidden sm:block" />
          지금 바로 AI와 함께 당신만의 MVP를 만들어보세요.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/input"
            className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-8 py-4 text-base font-medium text-white transition hover:bg-neutral-800"
          >
            무료로 시작하기
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-8 py-4 text-base font-medium text-neutral-900 transition hover:bg-neutral-50"
          >
            데모 영상 보기
          </button>
        </div>
      </div>
    </section>
  );
}
