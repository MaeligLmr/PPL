'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { AuthGuard } from '@/auth/AuthGuard'
import { Toaster } from 'sonner'

type Props = {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      <Toaster richColors position="bottom-center" />
      <AuthGuard>
        {children}
      </AuthGuard>
    </ThemeProvider>
  )
}

