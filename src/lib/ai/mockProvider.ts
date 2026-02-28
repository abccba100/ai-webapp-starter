import type { AIProvider, AnalyzeIdeaResult } from './provider';

/**
 * 실제 API 없이 고정된 예시 JSON을 반환하는 Mock Provider
 * 수정 요청이 포함된 경우 다른 결과를 반환하여 재분석 시뮬레이션
 */
export const mockProvider: AIProvider = {
  async analyzeIdea(input: string): Promise<AnalyzeIdeaResult> {
    const isReanalysis = input.includes('[사용자 수정 요청]');
    if (isReanalysis) {
      return {
        coreFeatures: ['회원가입', '로그인', '게시글 작성', '수정 반영 기능'],
        adminFeatures: ['사용자 관리', '게시글 관리', '승인 워크플로우'],
        optionalFeatures: ['검색', '알림', '필터링'],
        summary:
          '사용자 수정 요청을 반영하여 업데이트된 기능 명세입니다.',
      };
    }
    return {
      coreFeatures: ['회원가입', '로그인', '게시글 작성'],
      adminFeatures: ['사용자 관리', '게시글 관리'],
      optionalFeatures: ['검색', '알림'],
      summary:
        '사용자가 로그인 후 게시글을 작성할 수 있는 서비스입니다.',
    };
  },
};
