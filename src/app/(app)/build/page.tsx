"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/context/WizardContext";
import Link from "next/link";
import { Button, Card, PageHeader } from "@/components/ui";

const LOG_MESSAGES = [
  "서버 환경을 구축하고 있습니다...",
  "데이터베이스 스키마를 생성 중입니다...",
  "사용자 인증 모듈을 연결하고 있습니다...",
  "선택하신 디자인 테마를 입히는 중입니다...",
  "모바일 반응형 레이아웃을 최적화 중입니다...",
  "최종 마무리 중...",
];

export default function BuildPage() {
  const router = useRouter();
  const { specs, selectedTheme, specApproved, setBuildComplete, resetWizard } =
    useWizard();
  const [logIndex, setLogIndex] = useState(0);

  const isComplete = logIndex >= LOG_MESSAGES.length;

  useEffect(() => {
    if (!specApproved) {
      router.replace("/spec");
      return;
    }
    if (!selectedTheme) {
      router.replace("/design");
      return;
    }
  }, [specApproved, selectedTheme, router]);

  useEffect(() => {
    if (isComplete) {
      setBuildComplete(true);
    }
  }, [isComplete, setBuildComplete]);

  useEffect(() => {
    if (!isComplete) {
      const timeout = setTimeout(() => {
        setLogIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [logIndex, isComplete]);

  if (!isComplete) {
    return (
      <div className="ds-fade-in flex min-h-[500px] flex-col items-center justify-center">
        <div className="relative mb-10 h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-border" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-accent border-t-transparent" />
        </div>

        <h2 className="mb-6 text-2xl font-semibold text-text">
          앱을 생성하고 있어요
        </h2>

        <div className="flex h-48 w-full max-w-md min-w-0 flex-col justify-end overflow-hidden rounded-card border border-border bg-surface p-6 font-mono text-sm text-text2">
          {LOG_MESSAGES.slice(0, logIndex + 1).map((msg, idx) => (
            <div key={idx} className="mb-1 min-w-0 opacity-90">
              <span className="mr-2 text-text2">&gt;</span>
              {msg}
              {idx === logIndex && idx < LOG_MESSAGES.length && (
                <span className="ml-1 animate-pulse">_</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-base text-text2">
          잠시만 기다려주세요. 약 1분 정도 소요됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="ds-fade-in space-y-8">
      <div className="relative overflow-hidden rounded-card border border-border bg-surface p-10 text-center">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-accent2 to-accent" />

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent2/20">
          <span className="text-3xl">🎉</span>
        </div>

        <PageHeader
          tag="Build"
          title="나만의 앱이 완성되었습니다!"
          subtitle="이제 아래 링크에서 바로 확인하거나 코드를 다운로드할 수 있습니다."
        />

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(108,99,255,0.35)]"
          >
            결과물 보러가기
          </Link>
          <Button type="button" variant="secondary">
            코드 다운로드 (ZIP)
          </Button>
        </div>
      </div>

      <Card>
        <h3 className="mb-4 text-2xl font-semibold text-text">
          생성 요약
        </h3>
        <div className="space-y-2 text-base text-text2">
          <div className="flex justify-between gap-4">
            <span>선택 테마</span>
            <span className="font-semibold capitalize text-text">
              {selectedTheme || "선택 안함"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span>구현된 기능</span>
            <span className="font-semibold text-text">
              {specs.length}개 모듈
            </span>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-4 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          onClick={resetWizard}
          className="text-center text-base text-text2 underline transition hover:text-text md:text-left"
        >
          새로운 프로젝트 만들기
        </Link>
      </div>
    </div>
  );
}
