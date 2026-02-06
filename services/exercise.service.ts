import { supabase } from "@/lib/supabase";
import { Exercise, ExerciseRow } from "@/types/Exercise";

export async function getExercisesWithPreferences(): Promise<Exercise[]> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
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
    `);

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
