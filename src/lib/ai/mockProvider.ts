import type { AIProvider, AnalyzeIdeaResult } from './provider';

/**
 * 실제 API 없이 고정된 예시 JSON을 반환하는 Mock Provider
 */
export const mockProvider: AIProvider = {
  async analyzeIdea(_input: string): Promise<AnalyzeIdeaResult> {
    return {
      coreFeatures: ['회원가입', '로그인', '게시글 작성'],
      adminFeatures: ['사용자 관리', '게시글 관리'],
      optionalFeatures: ['검색', '알림'],
      summary:
        '사용자가 로그인 후 게시글을 작성할 수 있는 서비스입니다.',
    };
  },
};
