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
  const normalizedPath = useMemo(() => {
    const raw = pathname || '/'
    const withoutBase = raw.startsWith('/PPL') ? raw.replace('/PPL', '') : raw
    const trimmed = withoutBase.replace(/\/+$/, '')
    return trimmed === '' ? '/' : trimmed
  }, [pathname])
  const isPublicPath = publicPaths.includes(normalizedPath)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session && !isPublicPath) {
        router.replace('/auth/login')
      } else {
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
  }, [router, isPublicPath, supabase])

  // Si on est sur une page publique, pas besoin de vérifier l'authentification
  if (isPublicPath) {
    return <>{children}</>
  }

  if (loading) return null // ou un loader

  return <>{children}</>
}
