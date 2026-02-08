'use client'

import { useState, useEffect } from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '@/components/ui/Avatar'
import { getBestPerfs, getProfile } from '@/services/profile.service'
import { BestPerf, Profile } from '@/types/Profile'
import { BestPerfTile } from '@/components/ui/BestPerfTile'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { usePageTitle } from '@/components/layout/PageTitleContext'


export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [bestPerfList, setBestPerfList] = useState<BestPerf[]>([]) // TODO: Define a proper type for performance data

  const router = useRouter()
  const {setTitle} = usePageTitle()

  useEffect(() => {
    setTitle("Profil")
  }, [setTitle])
  useEffect(() => {
    getProfile().then((fetchedProfile) => {
      setProfile(fetchedProfile)
      setLoading(false)
    })
    getBestPerfs().then((fetchedPerfs) => {
      setBestPerfList(fetchedPerfs)
    })
    
  }, [])

  const goToSettings = () => {
    // Navigate to settings page
    router.push('/settings')
  }


  if (loading) return <div>Chargement...</div>

  return (
    <>
      {/* Avatar + Pseudo Section */}
      <section className="flex py-4">
        <div className="profile-avatar">
         <Avatar profile={profile} dimensions={16} hoverDisabled />
        </div>
        <Button variant="icon-plain" icon={<FontAwesomeIcon icon={faCog} />} onClick={goToSettings} />
      </section>

      {/* Meilleures Performances Section */}
      <section className="performances-section">
        <h2 className="performances-title">Meilleures performances</h2>
       <ul>
        {bestPerfList.map((perf) => (
          <li key={perf.exo_id}>
            <BestPerfTile perf={perf} />
          </li>
        ))}
       </ul>
      </section>
    </>
  )
}
