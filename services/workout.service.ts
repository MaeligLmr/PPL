import { supabase } from "@/lib/supabase";
import { Workout, WorkoutWithDetails } from "@/types/Workout";

export async function getUserWorkouts(userId: string) {
  const { data, error } = await supabase
    .from("workouts")
    .select("*, categorie: id_category ( id, nom )")
    .eq("id_user", userId)
    .order("date", { ascending: false });

  if (error) throw error;

  return data as Workout[];
}

export async function getWorkoutsPaginated(
  userId: string,
  from: number,
  to: number
) {
  const { data, error } = await supabase
    .from("workout")
    .select("*, categorie: id_category(id,nom,svg)")
    .eq("id_user", userId)
    .order("date", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return data;
}


export async function getWorkoutById(workoutId: string) {
  const { data, error } = await supabase
    .from("workout")
    .select(`
      *,
      categorie: id_category (
        id,
        nom
      ),
      workout_line (
        *,
        exercise: id_exo (
          id,
          nom
        ),
        serie (*,
          reps(*)
        )
      )
    `)
    .eq("id", workoutId)
    .single();

  if (error) throw error;

  return data as WorkoutWithDetails;
}

export async function createWorkout(userId: string, date: string, id_category: string) {
  const { data, error } = await supabase
    .from("workout")
    .insert([
      {
        id_user: userId,
        date,
        id_category,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function addExerciseToWorkout(
  id: string
) {
  const { data, error } = await supabase
    .from("workout_line")
    .insert([
      {
        id_workout: id,
        id_exo: null,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateWorkoutLine(
  workoutLineId: string,
  exerciseId: string
) {
  const { data, error } = await supabase
    .from("workout_line")
    .update({
      id_exo: exerciseId,
    })
    .eq("id", workoutLineId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function addSet(
  workoutExerciseId: string,
  ordre: number
) {
  // Créer la série
  const { data: setData, error: setError } = await supabase
    .from("serie")
    .insert([
      {
        id_workout_line: workoutExerciseId,
        ordre: ordre,
      },
    ])
    .select()
    .single();

  if (setError) throw setError;

  // Ajouter automatiquement une première rep avec charge et qte à 0
  const { data: repData, error: repError } = await supabase
    .from("reps")
    .insert([
      {
        id_serie: setData.id,
        charge: 0,
        qte: 0,
      },
    ])
    .select()
    .single();

  if (repError) throw repError;

  return setData;
}

export async function addRep(
  setId: string,
  charge: number,
  qte: number
) {
  const { data, error } = await supabase
    .from("reps")
    .insert([
      {
        id_serie: setId,
        charge,
        qte,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function editRep(
  repId: string,
  charge: number,
  qte: number
) {
  const { data, error } = await supabase
    .from("reps")
    .update({
      charge,
      qte,
    })
    .eq("id", repId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function deleteRep(repId: string) {
  const { data, error } = await supabase
    .from("reps")
    .delete()
    .eq("id", repId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteWorkout(workoutId: string) {
  const { data, error } = await supabase
    .from("workout")
    .delete()
    .eq("id", workoutId)
    .select()
    .single();

    if (error) throw error;

    return data;
}

export async function deleteExercise(workoutLineId: string) {
  const { data, error } = await supabase
    .from("workout_line")
    .delete()
    .eq("id", workoutLineId)
    .select()
    .single();

    if (error) throw error;
    return data;
}

export async function deleteSerie(serieId: string) {
  const { data, error } = await supabase
    .from("serie")
    .delete()
    .eq("id", serieId)
    .select()
    .single();

    if (error) throw error;
    return data;
}