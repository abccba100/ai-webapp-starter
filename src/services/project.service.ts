import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { AppError } from "@/lib/errors";
import { createAppError, toAppError } from "@/lib/errors";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

const RECENT_PROJECTS_LIMIT = 10;

export type CreateProjectResult =
  | { ok: true; data: { id: string } }
  | { ok: false; error: AppError };

const NAME_MIN_LENGTH = 3;

/**
 * projects 테이블에 새 프로젝트를 저장합니다.
 * - name은 3자 이상이어야 합니다.
 * - user_id는 로그인된 사용자로 설정됩니다 (RLS 호환).
 */
export async function createProject(
  client: SupabaseClient<Database>,
  userId: string,
  name: string
): Promise<CreateProjectResult> {
  const trimmed = name.trim();
  if (trimmed.length < NAME_MIN_LENGTH) {
    return {
      ok: false,
      error: createAppError(
        "VALIDATION_ERROR",
        "이름은 3자 이상이어야 합니다.",
        400
      ),
    };
  }

  const { data, error } = await client
    .from("projects")
    .insert({
      name: trimmed,
      user_id: userId,
    } as ProjectInsert)
    .select("id")
    .single();

  if (error) {
    return { ok: false, error: toAppError(error) };
  }
  if (!data?.id) {
    return {
      ok: false,
      error: createAppError("INTERNAL_ERROR", "프로젝트 생성에 실패했습니다.", 500),
    };
  }

  return { ok: true, data: { id: data.id } };
}

/**
 * 로그인된 사용자의 최근 프로젝트 10개를 가져옵니다.
 * user_id 기준 조회, created_at desc 정렬.
 * Server Component에서 createClient() + getCurrentUser() 후 호출하면 됩니다.
 */
export async function getRecentProjects(
  client: SupabaseClient<Database>,
  userId: string
): Promise<ProjectRow[]> {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(RECENT_PROJECTS_LIMIT);

  if (error) {
    return [];
  }
  return (data ?? []) as ProjectRow[];
}
