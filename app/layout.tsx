// app/layout.tsx
import type { Metadata } from 'next'
import Providers from './providers'
import './global.css'
import { PageTitleProvider } from '@/components/layout/PageTitleContext'
import ClientMenu from '@/components/layout/ClientMenu'


export const metadata: Metadata = {
  title: 'PPL',
  description: "Push, Pull, Legs - L'application qui enregistre toutes les performances de vos séances de musculation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="fr">
      <body>
        <PageTitleProvider>
          <Providers>
            <ClientMenu />
            {children}
          </Providers>
        </PageTitleProvider>
      </body>
    </html>
  )
}
