'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '@/components/ui/Avatar'
import { getBestPerfs, getProfile } from '@/services/profile.service'
import { BestPerf, Profile } from '@/types/Profile'
import { BestPerfTile } from '@/components/ui/BestPerfTile'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [bestPerfList, setBestPerfList] = useState<BestPerf[]>([]) // TODO: Define a proper type for performance data

  useEffect(() => {
    getProfile().then((fetchedProfile) => {
      setProfile(fetchedProfile)
      setLoading(false)
    })
    getBestPerfs().then((fetchedPerfs) => {
      setBestPerfList(fetchedPerfs)
    })
    
  }, [])

  if (loading) return <div>Chargement...</div>

  return (
    <main className="profile-container">
      {/* Avatar + Pseudo Section */}
      <section className="profile-header">
        <div className="profile-avatar">
         <Avatar profile={profile} dimensions={16} />
        </div>
        <Link href="/settings" className="icon-btn settings-icon" title="Paramètres">
          <FontAwesomeIcon icon={faCog} />
        </Link>
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
    </main>
  )
}
