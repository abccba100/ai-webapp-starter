import type { AIProvider } from './AIProvider';
import { MockAIProvider } from './MockAIProvider';

export function createAIProvider(): AIProvider {
  return new MockAIProvider();
}
