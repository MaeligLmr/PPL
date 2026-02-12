import { create } from 'zustand'
import { Profile } from '@/types/Profile'
import { getProfile } from '@/services/profile.service'

type ProfileState = {
  profile: Profile | null
  loading: boolean
  refreshProfile: () => Promise<void>
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,

  async refreshProfile() {
    set({ loading: true })
    try {
      const profile = await getProfile()
      set({ profile, loading: false })
    } catch (error) {
      set({ loading: false })
    }
  },
}))
