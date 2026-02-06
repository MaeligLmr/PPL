'use client'
import { usePageTitle } from './PageTitleContext'
import Menu from './Menu'
import { getUser } from '@/services/auth.service'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Profile } from '@/types/Profile'
import { getProfile } from '@/services/profile.service'

export default function ClientMenu() {
    const { title } = usePageTitle()
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        getUser().then((fetchedUser) => {
            setUser(fetchedUser?.data?.user ?? null)
        })
        getProfile().then((fetchedProfile) => {
            setProfile(fetchedProfile ?? null)
        })
    }, [])
    
    if (!user) return null
    return <Menu title={title} profile={profile} />
}