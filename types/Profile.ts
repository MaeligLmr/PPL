export type Profile = {
  id: string
  prenom: string | null
  nom: string | null
  pseudo: string | null
  mail: string
  photo_url: string | null
  poids: number | null
  taille: number | null
}

export type Preferences = {
  theme: 'light' | 'dark'
  color_mode: 'blue' | 'cherry'
}

export type BestPerf = {
  exo_id: string
  exo_nom: string
  charge: number
  reps: number
  workout_id: string
  workout_date: string
}

