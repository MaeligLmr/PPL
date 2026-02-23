import { CustomSelectOption } from "@/components/ui/Select";
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

export async function getCategoriesForSelect(): Promise<CustomSelectOption[]> {
  const categories = await getCategories();
  return categories.map(c => ({ label: c.nom, value: c.id.toString() }));
}