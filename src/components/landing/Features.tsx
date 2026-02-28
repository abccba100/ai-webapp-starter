const FEATURES = [
  {
    title: "아이디어만 입력",
    description:
      "하고 싶은 서비스를 한 줄로 설명하세요. AI가 요구사항을 분석하고 스펙으로 변환합니다.",
  },
  {
    title: "AI 스펙 생성",
    description:
      "기능 정의, 데이터 모델, API 구조까지 자동으로 생성됩니다. 수정도 바로 가능합니다.",
  },
  {
    title: "실시간 빌드",
    description:
      "생성된 스펙을 기반으로 실제 동작하는 웹 앱이 자동 빌드됩니다. 바로 배포까지.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-neutral-50 py-20 px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-2xl font-medium text-neutral-900">
            아이디어에서 앱까지, 한 번에
          </h2>
          <p className="mx-auto max-w-2xl text-base text-neutral-600">
            코딩 없이 AI가 전체 파이프라인을 처리합니다
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:shadow"
            >
              <h3 className="mb-4 text-xl font-medium text-neutral-900">
                {feature.title}
              </h3>
              <p className="text-base leading-relaxed text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
