export type Workout = {
  id: string
  date : string
  id_category : string
  id_user : string
}

export type WorkoutLine = {
  id: string
  id_workout: string
  id_exo : string
}

export type Serie = {
  id: string
  id_workout_line: string
}

export type Rep = {
  id: string
  id_serie: string
  charge: number
  qte: number
}