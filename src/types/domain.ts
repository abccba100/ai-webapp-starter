/**
 * 도메인 모델 타입 (MVP 명세 통합)
 * - SpecInput / SpecResult: 명세 분석 입출력
 * - Project: 프로젝트 엔티티
 * - AIRequest / AIResponse: AI API 요청/응답
 * - AppError: 앱/API 오류 표현
 */

/** 명세 분석 요청 시 사용하는 입력 (아이디어 텍스트) */
export interface SpecInput {
  idea: string;
}

/** AI 명세 분석 결과 (핵심/관리/선택 기능 + 요약) */
export interface SpecResult {
  coreFeatures: string[];
  adminFeatures: string[];
  optionalFeatures: string[];
  summary: string;
}

/** 프로젝트 도메인 모델 (id, 이름, 생성일) */
export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

/** AI 분석 API 요청 본문 */
export interface AIRequest {
  idea: string;
}

/** AI 분석 API 응답 (AnalyzeIdeaResult와 동일 구조) */
export interface AIResponse {
  coreFeatures: string[];
  adminFeatures: string[];
  optionalFeatures: string[];
  summary: string;
}

/** 앱/API 오류 응답 (에러 메시지) */
export interface AppError {
  error: string;
}
