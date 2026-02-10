import { SelectOption } from "@/components/ui/Select";
import { supabase } from "@/lib/supabase";
import { Exercise, ExerciseRow } from "@/types/Exercise";

export async function getExercisesWithPreferences(id_category: string | null = null): Promise<(Exercise)[]> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const query = supabase
    .from("exo")
    .select(`
      id,
      nom,
      svg,
      exo_categorie(
        categorie(
          id,
          nom
        )
      ),
      user_exo_preferences(hidden)
    `)
   
  if(id_category) {
    query.eq('exo_categorie.id_categorie', id_category)
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map((exo: ExerciseRow) => {
    const categories = exo.exo_categorie?.flatMap((ec) => ec.categorie) ?? [];
    return {
      id: exo.id,
      nom: exo.nom,
      svg: exo.svg,
      hidden: !!exo.user_exo_preferences?.[0]?.hidden,
      categories,
    } as Exercise;
  });
}

export async function getExercisesForSelect(id_category: string): Promise<SelectOption[]> {
  const exercises = await getExercisesWithPreferences(id_category);
  return exercises.map((exo) => ({
    value: String(exo.id),
    label: exo.nom,
  }));
}

export async function toggleExerciseHidden(
  exoId: number,
  hidden: boolean
) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("user_exo_preferences")
    .upsert({
      id_user: user.id,
      id_exo: exoId,
      hidden,
    }, { onConflict: "id_user,id_exo" });

  if (error) throw error;
}
