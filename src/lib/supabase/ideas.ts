import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type IdeaRow = Database["public"]["Tables"]["ideas"]["Row"];
type IdeaInsert = Database["public"]["Tables"]["ideas"]["Insert"];

export async function createIdea(
  client: SupabaseClient<Database> | null,
  projectId: string,
  content: string
): Promise<{ id: string } | null> {
  if (!client) return null;
  const { data, error } = await client
    .from("ideas")
    .insert({
      project_id: projectId,
      content: content.trim(),
    } as IdeaInsert)
    .select("id")
    .single();
  if (error) {
    console.error("createIdea", error);
    return null;
  }
  return data ? { id: data.id } : null;
}

export async function getIdea(
  client: SupabaseClient<Database> | null,
  ideaId: string
): Promise<IdeaRow | null> {
  if (!client) return null;
  const { data, error } = await client.from("ideas").select("*").eq("id", ideaId).single();
  if (error || !data) return null;
  return data as IdeaRow;
}
