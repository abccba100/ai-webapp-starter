import { Container } from "@/components/ui";

const STEPS = [
  {
    number: "01",
    title: "아이디어 입력",
    desc: "템플릿을 선택하거나 직접 서비스 아이디어를 작성해주세요.",
  },
  {
    number: "02",
    title: "스펙 확인·수정",
    desc: "AI가 생성한 스펙을 검토하고 편집기에서 수정할 수 있습니다.",
  },
  {
    number: "03",
    title: "디자인 선택",
    desc: "테마와 색상을 선택해 앱의 브랜딩을 맞춤 설정합니다.",
  },
  {
    number: "04",
    title: "빌드 및 배포",
    desc: "한 번의 클릭으로 앱을 빌드하고 배포 URL을 받습니다.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-text">
            4단계로 완성
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-text2">
            복잡한 설정 없이, 직관적인 단계만 따라오세요
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative min-w-0">
              {i < STEPS.length - 1 && (
                <div className="absolute left-full top-12 z-0 hidden h-px w-full -translate-y-1/2 bg-border lg:block" />
              )}
              <div className="relative z-10 min-w-0 rounded-card border border-border bg-surface p-6 text-center">
                <span className="mb-4 inline-block text-2xl font-semibold text-accent">
                  {step.number}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-text">
                  {step.title}
                </h3>
                <p className="min-w-0 break-words text-base leading-relaxed text-text2">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
