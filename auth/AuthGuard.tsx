'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase'

type Props = {
  children: ReactNode
}

export function AuthGuard({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [loading, setLoading] = useState(true)

  // Pages publiques qui ne nécessitent pas d'authentification
  const publicPaths = ['/auth/login', '/auth/register']
  const isPublicPath = publicPaths.includes(pathname)

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Checking session...')
        const { data, error } = await supabase.auth.getSession()
        console.log('Session result:', { data, error })

        if (!data.session && !isPublicPath) {
          console.log('No session, redirecting to login')
          router.replace('/auth/login')
        } else {
          console.log('Session OK or public path, setting loading to false')
          setLoading(false)
        }
      } catch (err) {
        console.error('Error checking session:', err)
        setLoading(false)
      }
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isPublicPath) {
        router.replace('/auth/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router, isPublicPath])

  // Si on est sur une page publique, pas besoin de vérifier l'authentification
  if (isPublicPath) {
    return <>{children}</>
  }

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Chargement...</div>

  return <>{children}</>
}
