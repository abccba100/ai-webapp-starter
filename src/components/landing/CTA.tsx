import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white px-8 py-16 text-center shadow-sm sm:px-16 sm:py-20">
          <h2 className="mb-4 text-2xl font-medium text-neutral-900 sm:text-3xl">
            지금 바로 시작하세요
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base text-neutral-600">
            회원가입 없이 무료로 사용할 수 있습니다.
            <br />
            아이디어 한 줄로 당신만의 앱을 만들어보세요.
          </p>
          <Link
            href="/input"
            className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-8 py-4 text-base font-medium text-white transition hover:bg-neutral-800"
          >
            무료로 시작하기
          </Link>
        </div>
      </div>
    </section>
  );
}
