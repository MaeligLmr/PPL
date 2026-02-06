import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
  darkMode: boolean
  cherryMode: boolean
  toggleDarkMode: () => void
  toggleCherryMode: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      darkMode: false,
      cherryMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleCherryMode: () => set((state) => ({ cherryMode: !state.cherryMode })),
    }),
    {
      name: 'ui-store',
    }
  )
)

// Apply theme to document
export function applyTheme(darkMode: boolean, cherryMode: boolean) {
  const root = document.documentElement
  if (darkMode) {
    root.classList.add('dark-mode')
  } else {
    root.classList.remove('dark-mode')
  }
  
  if (cherryMode) {
    root.classList.add('cherry-mode')
  } else {
    root.classList.remove('cherry-mode')
  }
}

