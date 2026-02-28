import type { SpecInput, SpecResult } from '../../src/types/domain';

export interface AIProvider {
  generateSpec(input: SpecInput): Promise<SpecResult>;
}
