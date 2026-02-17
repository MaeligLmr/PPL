'use client'

import { useState, useEffect } from 'react'
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '@/components/ui/Avatar'
import { getBestPerfs, getExoPerfs, getProfile } from '@/services/profile.service'
import { BestPerf, ExoPerf, Profile } from '@/types/Profile'
import { BestPerfTile } from '@/components/ui/BestPerfTile'
import ExoGraph from '@/components/ui/ExoGraph'
import Tabs, { TabItem } from '@/components/ui/Tabs'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { usePageTitle } from '@/components/layout/PageTitleContext'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [bestPerfList, setBestPerfList] = useState<BestPerf[]>([])
  const [exoPerfList, setExoPerfList] = useState<ExoPerf[]>([])
  const [activeTab, setActiveTab] = useState<'list' | 'graph'>('list')

  const router = useRouter()
  const { setTitle } = usePageTitle()

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
    getExoPerfs().then((fetchedExoPerfs) => {
      setExoPerfList(fetchedExoPerfs ?? [])
    })
  }, [])

  const goToSettings = () => {
    router.push('/settings')
  }

  const tabItems: TabItem[] = [
    {
      key: 'list',
      label: 'Liste',
      content: (
        <>
          <h2 className="performances-title">Meilleures performances</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-10)' }}>
            {bestPerfList.map((perf) => (
              <li key={perf.exo_id}>
                <BestPerfTile perf={perf} />
              </li>
            ))}
          </ul>
        </>
      )
    },
    {
      key: 'graph',
      label: 'Graphique',
      content: (
        <>
          <h2 className="performances-title">Évolution des performances</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-20)',
          }}>
            {exoPerfList.map((exoPerf) => (
              <div key={exoPerf.exo_id} style={{
                background: 'var(--theme-tile-bg)',
                paddingBottom: 'var(--spacing-20)',
                borderBottom: '1px solid var(--theme-tile-border)'
              }}>
                <h3 style={{ marginBottom: 'var(--spacing-15)', color: 'var(--theme-title-text)' }}>
                  {exoPerf.exo_nom}
                </h3>
                <ExoGraph data={exoPerf} />
              </div>
            ))}
            {exoPerfList.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-20)',
                color: 'var(--theme-text)'
              }}>
                Aucune donnée de performance disponible
              </div>
            )}
          </div>
        </>
      )
    }
  ]

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

      {/* Onglets de navigation */}
      <section className="performances-section">
        <Tabs
          items={tabItems}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as 'list' | 'graph')}
        />
      </section>
    </>
  )
}
