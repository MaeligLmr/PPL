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
    console.log("Fetching workouts for user", userId, "from", from, "to", to);
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
          rep (*)
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
  id:string
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
) {
  const { data, error } = await supabase
    .from("sets")
    .insert([
      {
        exercise_id: workoutExerciseId,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
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
        set_id: setId,
        charge,
        qte,
      },
    ])
    .select()
    .single(); 

    return data;

  if (error) throw error;
}

