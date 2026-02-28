import type { SpecInput, SpecResult } from '@/types/domain';
import type { AppError } from '@/lib/errors';
import { toAppError } from '@/lib/errors';
import { createAIProvider } from '../../lib/ai/providerFactory';

export type GenerateMvpSpecResult =
  | { ok: true; data: SpecResult }
  | { ok: false; error: AppError };

/**
 * AIProvider를 호출해 MVP 명세를 생성합니다.
 * 에러는 AppError로 정규화되어 반환됩니다.
 * UI는 이 함수를 호출한 뒤 ok/data 또는 ok/error만 처리하면 됩니다.
 */
export async function generateMvpSpec(
  input: SpecInput
): Promise<GenerateMvpSpecResult> {
  try {
    const provider = createAIProvider();
    const data = await provider.generateSpec(input);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: toAppError(err) };
  }
}
