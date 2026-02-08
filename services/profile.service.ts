import { supabase } from "@/lib/supabase"
import { Preferences, Profile, BestPerf } from "@/types/Profile"

 async function getCurrentUserId() {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    throw new Error('Utilisateur non connecté')
  }

  return data.user.id
}

export async function getProfile(): Promise<Profile> {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .from('profil')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error

  return data
}

export async function updateProfile(values: Partial<Profile>) {
  const userId = await getCurrentUserId()

  const { error } = await supabase
    .from('profil')
    .update(values)
    .eq('id', userId)

  if (error) throw error
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) throw error
}

export async function updatePreferences(prefs: Preferences) {
  const userId = await getCurrentUserId()

  const { error } = await supabase
    .from('user_ui_preference')
    .upsert({
      id_user: userId,
      ...prefs,
    })

  if (error) throw error
}

export async function getPreferences(): Promise<Preferences | null> {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .from('user_ui_preference')
    .select('*')
    .eq('id_user', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error

  return data
}

export async function getBestPerfs() {
  const userId = await getCurrentUserId()

  const { data, error } = await supabase
    .rpc('get_best_perfs', { user_id_input: userId })

  if (error) throw error

  return data as BestPerf[]
}

