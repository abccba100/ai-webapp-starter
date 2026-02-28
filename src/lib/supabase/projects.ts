import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

export async function createProject(
  client: SupabaseClient<Database> | null,
  name: string,
  userId?: string | null
): Promise<{ id: string } | null> {
  if (!client) return null;
  const { data, error } = await client
    .from("projects")
    .insert({
      name: name.trim(),
      user_id: userId ?? null,
    } as ProjectInsert)
    .select("id")
    .single();
  if (error) {
    console.error("createProject", error);
    return null;
  }
  return data ? { id: data.id } : null;
}

export async function listProjects(
  client: SupabaseClient<Database> | null,
  userId?: string | null
): Promise<ProjectRow[]> {
  if (!client) return [];
  let q = client.from("projects").select("*").order("created_at", { ascending: false });
  if (userId !== undefined) {
    q = q.or(`user_id.eq.${userId},user_id.is.null`);
  }
  const { data, error } = await q;
  if (error) {
    console.error("listProjects", error);
    return [];
  }
  return (data ?? []) as ProjectRow[];
}
