import { Container } from "@/components/ui";

export function SocialProof() {
  return (
    <section className="border-t border-border py-20">
      <Container className="text-center">
        <p className="mb-8 text-base text-text2">
          이미 5,000개 이상의 아이디어가 앱으로 탄생했습니다
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
          <div className="h-8 w-28 rounded-lg border border-border bg-surface2" />
          <div className="h-8 w-28 rounded-lg border border-border bg-surface2" />
          <div className="h-8 w-28 rounded-lg border border-border bg-surface2" />
        </div>
      </Container>
    </section>
  );
}
