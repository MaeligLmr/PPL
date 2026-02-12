'use client'
import { usePageTitle } from './PageTitleContext'
import Menu from './Menu'
import { getUser } from '@/services/auth.service'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useProfileStore } from '@/stores/profile.store'

export default function ClientMenu() {
    const { title } = usePageTitle()
    const [user, setUser] = useState<User | null>(null)
    const { profile, refreshProfile } = useProfileStore()

    useEffect(() => {
        getUser().then((fetchedUser) => {
            setUser(fetchedUser?.data?.user ?? null)
        })
        refreshProfile()
    }, [])
    
    if (!user) return null
    return <Menu title={title} profile={profile} />
}