// ThemeProvider.tsx
'use client'

import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { themes } from './themes'

type ThemeMode = 'light' | 'dark'
type ColorMode = 'blue' | 'cherry'

type ThemeContextType = {
  mode: ThemeMode
  color: ColorMode
  theme: typeof themes.light.blue
  setMode: (mode: ThemeMode) => void
  setColor: (color: ColorMode) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light')
  const [color, setColor] = useState<ColorMode>('blue')

  const theme = useMemo(() => {
    return themes[mode][color]
  }, [mode, color])

  return (
    <ThemeContext.Provider
      value={{
        mode,
        color,
        theme,
        setMode,
        setColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return ctx
}
