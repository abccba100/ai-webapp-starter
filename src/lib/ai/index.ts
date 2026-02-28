import type { AIProvider } from './provider';
import { mockProvider } from './mockProvider';

export type { AIProvider, AnalyzeIdeaResult } from './provider';
export { mockProvider } from './mockProvider';

/**
 * 환경 변수 AI_PROVIDER에 따라 Provider 반환
 * 없거나 "mock"이면 Mock Provider 사용
 */
export function getProvider(): AIProvider {
  const providerKey = process.env.AI_PROVIDER;
  if (!providerKey || providerKey === 'mock') {
    return mockProvider;
  }
  // 향후: openai, anthropic 등 확장
  return mockProvider;
}
