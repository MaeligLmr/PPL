import { supabase } from "@/lib/supabase";
import { Category } from "@/types/Category";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categorie")
    .select("*")
    .order("nom");

  if (error) throw error;

  return data ?? [];
}
