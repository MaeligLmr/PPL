// ThemeProvider.tsx
'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import '@/theme/colors.css'
import '@/theme/tokens.css'
import '@/theme/spacing.css'
import '@/theme/typography.css'

type ThemeMode = 'light' | 'dark'
type ColorMode = 'blue' | 'cherry'

type ThemeContextType = {
  mode: ThemeMode
  color: ColorMode
  setMode: (mode: ThemeMode) => void
  setColor: (color: ColorMode) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return (window.localStorage.getItem('theme-mode') as ThemeMode) || 'light'
    }
    return 'light'
  })
  const [color, setColor] = useState<ColorMode>(() => {
    if (typeof window !== 'undefined') {
      return (window.localStorage.getItem('theme-color') as ColorMode) || 'blue'
    }
    return 'blue'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-color', color)
      document.documentElement.setAttribute('data-mode', mode)
      window.localStorage.setItem('theme-mode', mode)
      window.localStorage.setItem('theme-color', color)
    }
  }, [mode, color])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-color', color)
      document.documentElement.setAttribute('data-mode', mode)
      window.localStorage.setItem('theme-mode', mode)
      window.localStorage.setItem('theme-color', color)
    }
  }, [mode, color])

  return (
    <ThemeContext.Provider value={{ mode, color, setMode, setColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
