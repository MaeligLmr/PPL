export type Workout = {
  id: string
  date: string
  id_category: string
  id_user: string
  categorie?: {
    id: number
    nom: string
  } | null
}

export type WorkoutLine = {
  id: string
  id_workout: string
  id_exo: string
}

export type Serie = {
  id: string
  id_workout_line: string
  reps: Rep[]
  ordre: number
}

export type Rep = {
  id: string
  id_serie: string
  charge: number
  qte: number
}

export type WorkoutWithDetails = Workout & {
  workout_line: WorkoutLineWithDetails[]
}

export type WorkoutLineWithDetails = WorkoutLine & {
  exercise: {
    id: string
    nom: string
  },
  serie: Serie[]
}