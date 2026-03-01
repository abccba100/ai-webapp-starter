import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { Json } from "@/types/supabase";
import type { AppError } from "@/lib/errors";
import { createAppError, toAppError } from "@/lib/errors";

type SpecInsert = Database["public"]["Tables"]["specs"]["Insert"];
type SpecUpdate = Database["public"]["Tables"]["specs"]["Update"];

export type SaveSpecInput = {
  project_id: string;
  raw_input: string;
  ai_output: Json;
};

export type SaveSpecResult =
  | { ok: true; data: { id: string } }
  | { ok: false; error: AppError };

/**
 * AI 분석 결과를 specs 테이블에 저장합니다.
 * - project_id 연결
 * - raw_input, ai_output(JSON) 저장
 * - revision_count 기본값 0, design_locked 기본값 false
 */
export async function saveSpec(
  client: SupabaseClient<Database>,
  input: SaveSpecInput
): Promise<SaveSpecResult> {
  const insert: SpecInsert = {
    project_id: input.project_id,
    raw_input: input.raw_input,
    ai_output: input.ai_output,
    revision_count: 0,
    design_locked: false,
    approved: false,
  };

  const { data, error } = await client
    .from("specs")
    .insert(insert)
    .select("id")
    .single();

  if (error) {
    return { ok: false, error: toAppError(error) };
  }
  if (!data?.id) {
    return {
      ok: false,
      error: createAppError("INTERNAL_ERROR", "스펙 저장에 실패했습니다.", 500),
    };
  }

  return { ok: true, data: { id: data.id } };
}

export type ApproveSpecResult =
  | { ok: true }
  | { ok: false; error: AppError };

/**
 * 스펙을 승인합니다. approved를 true로 업데이트합니다.
 */
export async function approveSpec(
  client: SupabaseClient<Database>,
  specId: string
): Promise<ApproveSpecResult> {
  const update: SpecUpdate = { approved: true };
  const { error } = await client.from("specs").update(update).eq("id", specId);

  if (error) {
    return { ok: false, error: toAppError(error) };
  }
  return { ok: true };
}
