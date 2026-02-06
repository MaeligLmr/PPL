import { create } from 'zustand'
import * as authService from '@/services/auth.service'
import { User } from '@supabase/supabase-js'

type AuthState = {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    init: () => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,

    async init() {
        const { data } = await authService.getSession()
        set({ user: data.session?.user ?? null, loading: false })
    },

    async login(email, password) {
        set({ loading: true })
        try {
            const { data, error } = await authService.login(email, password)
            if (!error) set({ user: data.user })
            if (error) throw error
        } finally {
            set({ loading: false })
        }
    },

    async logout() {
        await authService.signOut()
        set({ user: null })
    },

    async signUp(email: string, password: string) {
        set({ loading: true })
        try {
            const { data, error } = await authService.signUp(email, password)
            if (!error) set({ user: data.user })
            if (error) throw error
        } finally {
            set({ loading: false })
        }
    },
}))
