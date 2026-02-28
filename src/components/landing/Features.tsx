import { Container } from "@/components/ui";

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
    <section id="features" className="border-t border-border bg-surface2 py-20">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-text">
            아이디어에서 앱까지, 한 번에
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-text2">
            코딩 없이 AI가 전체 파이프라인을 처리합니다
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="min-w-0 rounded-card border border-border bg-surface p-8 transition hover:border-[#3a3a50] hover:shadow-glow"
            >
              <h3 className="mb-4 text-xl font-semibold text-text">
                {feature.title}
              </h3>
              <p className="min-w-0 break-words text-base leading-relaxed text-text2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
