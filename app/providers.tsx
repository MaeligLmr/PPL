'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { AuthGuard } from '@/auth/AuthGuard'

type Props = {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      {/* <AuthGuard>
        {children}
      </AuthGuard> */}
      {children}
    </ThemeProvider>
  )
}
