/**
 * AI 분석 결과 타입
 */
export interface AnalyzeIdeaResult {
  coreFeatures: string[];
  adminFeatures: string[];
  optionalFeatures: string[];
  summary: string;
}

/**
 * AI Provider 추상화 인터페이스
 * OpenAI, Anthropic, Mock 등으로 교체 가능
 */
export interface AIProvider {
  analyzeIdea(input: string): Promise<AnalyzeIdeaResult>;
}
