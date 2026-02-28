import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { SpecItem } from "@/types";

type SpecInsert = Database["public"]["Tables"]["specifications"]["Insert"];

export async function saveSpecifications(
  client: SupabaseClient<Database> | null,
  ideaId: string,
  specs: SpecItem[]
): Promise<{ id: string } | null> {
  if (!client) return null;
  const { data, error } = await client
    .from("specifications")
    .insert({
      idea_id: ideaId,
      specs: specs as SpecInsert["specs"],
    })
    .select("id")
    .single();
  if (error) {
    console.error("saveSpecifications", error);
    return null;
  }
  return data ? { id: data.id } : null;
}

export async function getSpecificationsByIdeaId(
  client: SupabaseClient<Database> | null,
  ideaId: string
): Promise<SpecItem[] | null> {
  if (!client) return null;
  const { data, error } = await client
    .from("specifications")
    .select("specs")
    .eq("idea_id", ideaId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  if (error || !data) return null;
  const raw = data.specs;
  if (Array.isArray(raw)) return raw as SpecItem[];
  return null;
}
