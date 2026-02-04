'use client'
import { usePageTitle } from './PageTitleContext'
import Menu from './Menu'
import { getUser } from '@/services/auth.service'
import { useEffect, useState } from 'react'

export default function ClientMenu() {
    const { title } = usePageTitle()
    const [user, setUser] = useState<unknown>(null)

    useEffect(() => {
        getUser().then((fetchedUser) => {
            setUser(fetchedUser)
        })
    }, [])

    console.log(user);
    if (!user) return null
    return <Menu title={title} />
}