// app/layout.tsx
import type { Metadata } from 'next'
import Providers from './providers'


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
          {children}
        </Providers>
      </body>
    </html>
  )
}
