// app/layout.tsx
import type { Metadata } from 'next'
import { Lilita_One, Inter } from 'next/font/google'
import Providers from './providers'
import './global.css'
import { PageTitleProvider } from '@/components/layout/PageTitleContext'
import ClientMenu from '@/components/layout/ClientMenu'

const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita-one',
})

const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
})

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
    <html lang="fr" className={`${lilitaOne.variable} ${inter.variable}`}>
      <body>
        <PageTitleProvider>
          <Providers>
            <ClientMenu />
            <main className='content'>
              {children}
            </main>
          </Providers>
        </PageTitleProvider>
      </body>
    </html>
  )
}
