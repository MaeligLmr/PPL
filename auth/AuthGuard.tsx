'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Props = {
  children: ReactNode
}

export function AuthGuard({ children }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace('/login')
      } else {
        setLoading(false)
      }
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) return null // ou un loader

  return <>{children}</>
}
