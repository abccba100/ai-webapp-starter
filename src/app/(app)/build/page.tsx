"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/context/WizardContext";
import Link from "next/link";

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
          <div className="absolute inset-0 rounded-full border-4 border-neutral-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-neutral-900 border-t-transparent" />
        </div>

        <h2 className="mb-6 text-2xl font-medium text-neutral-900">
          앱을 생성하고 있어요
        </h2>

        <div className="flex h-48 w-full max-w-md flex-col justify-end overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 font-mono text-sm text-neutral-700 shadow-sm">
          {LOG_MESSAGES.slice(0, logIndex + 1).map((msg, idx) => (
            <div key={idx} className="mb-1 opacity-90">
              <span className="mr-2 text-neutral-500">&gt;</span>
              {msg}
              {idx === logIndex && idx < LOG_MESSAGES.length && (
                <span className="ml-1 animate-pulse">_</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-base text-neutral-600">
          잠시만 기다려주세요. 약 1분 정도 소요됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="ds-fade-in space-y-10">
      <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-500 to-neutral-900" />

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span className="text-3xl">🎉</span>
        </div>

        <h1 className="mb-4 text-5xl font-semibold tracking-tight text-neutral-900">
          나만의 앱이 완성되었습니다!
        </h1>
        <p className="mb-10 text-base text-neutral-600">
          이제 아래 링크에서 바로 확인하거나 코드를 다운로드할 수 있습니다.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/preview"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-8 py-4 text-base font-medium text-white transition hover:bg-neutral-800"
          >
            결과물 보러가기
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-8 py-4 text-base font-medium text-neutral-900 transition hover:bg-neutral-50"
          >
            코드 다운로드 (ZIP)
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-2xl font-medium text-neutral-900">
          생성 요약
        </h3>
        <div className="space-y-2 text-base text-neutral-600">
          <div className="flex justify-between">
            <span>선택 테마</span>
            <span className="font-medium text-neutral-900 capitalize">
              {selectedTheme || "선택 안함"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>구현된 기능</span>
            <span className="font-medium text-neutral-900">
              {specs.length}개 모듈
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-neutral-200 pt-10 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          onClick={resetWizard}
          className="text-center text-base text-neutral-600 underline transition hover:text-neutral-900 md:text-left"
        >
          새로운 프로젝트 만들기
        </Link>
      </div>
    </div>
  );
}
