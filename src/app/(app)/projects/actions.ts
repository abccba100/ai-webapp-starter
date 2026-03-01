"use server";

import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { createProject } from "@/services/project.service";
import type { AppError } from "@/lib/errors";
import { createAppError } from "@/lib/errors";

export type CreateProjectActionResult =
  | { ok: true; data: { id: string } }
  | { ok: false; error: AppError };

/**
 * 로그인된 사용자로 새 프로젝트를 저장하는 서버 액션.
 * - 이름 3자 이상 검증
 * - 실패 시 AppError 반환
 */
export async function createProjectAction(
  formData: FormData
): Promise<CreateProjectActionResult> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      ok: false,
      error: createAppError("UNAUTHORIZED", "로그인이 필요합니다.", 401),
    };
  }

  const name = formData.get("name")?.toString() ?? "";
  const supabase = await createClient();
  return createProject(supabase, user.id, name);
}
