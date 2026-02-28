import type { AIProvider } from './AIProvider';
import type { SpecInput, SpecResult } from '../../src/types/domain';

export class MockAIProvider implements AIProvider {
  async generateSpec(input: SpecInput): Promise<SpecResult> {
    return {
      coreFeatures: ['Mock core feature'],
      adminFeatures: ['Mock admin feature'],
      optionalFeatures: ['Mock optional feature'],
      summary: `Mock summary for: ${input.idea}`,
    };
  }
}
