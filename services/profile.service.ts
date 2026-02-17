import { supabase } from "@/lib/supabase"
import { Preferences, Profile, BestPerf, PistePoids, ExoPerf } from "@/types/Profile"

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

export async function updateProfile(values: Partial<Profile>, file?: File) {
  const userId = await getCurrentUserId()
  const url = file ? await uploadAvatar(file) : undefined

  const { error } = await supabase
    .from('profil')
    .update({
      ...values,
      photo_url: url ?? values.photo_url,
    })
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

export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    // 1. Récupérer l'utilisateur courant
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("Utilisateur non connecté");

    // 2. Ré-authentifier avec l'ancien mot de passe
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: oldPassword,
    });

    if (signInError) {
      throw new Error("Ancien mot de passe incorrect");
    }

    // 3. Mettre à jour le mot de passe
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) throw updateError;

    return { success: true, message: "Mot de passe mis à jour" };

  } catch (err) {
    throw new Error((err as Error)?.message || "Erreur lors du changement de mot de passe");
  }
}

async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ppl-avatars"); // nom preset
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
}

export async function getWeightHistory(): Promise<PistePoids[]> {
  const userId = await getCurrentUserId()
  const { data: historique } = await supabase
    .from("historique_poids")
    .select("poids, date")
    .eq("user_id", userId)
    .order("date", { ascending: true });

const chartData: PistePoids[] = historique?.map((item) => ({
  date: item.date.slice(0, 10) as string,
  poids: item.poids as number,
})) ?? []; 
  return chartData;
}

export async function getExoPerfs(): Promise<ExoPerf[] | null> {
  const userId = await getCurrentUserId()
  const { data, error } = await supabase
    .rpc("get_exo_perfs", { user_uuid: userId });

  if (error) {
    console.error("Erreur getExoPerfs:", error);
    return null;
  }

  // Supabase retourne JSONB sous forme de string, on parse
  return data as ExoPerf[];
}