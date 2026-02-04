// app/layout.tsx
import type { Metadata } from 'next'
import Providers from './providers'
import Menu from '@/components/layout/Menu'
import './global.css'


export const metadata: Metadata = {
  title: 'My App',
  description: 'Next.js + Supabase + Theme system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Menu />
          {children}
        </Providers>
      </body>
    </html>
  )
}
