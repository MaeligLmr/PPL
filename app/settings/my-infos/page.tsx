'use client'

import { useState, useEffect } from 'react'
import { getProfile, getWeightHistory, updateProfile } from '@/services/profile.service'
import { Profile, PistePoids } from '@/types/Profile'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import WeightGraph from '@/components/ui/WeightGraph'
import Loader from '@/components/ui/Loader'
import { usePageTitle } from '@/components/layout/PageTitleContext'
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'sonner'
import { useProfileStore } from '@/stores/profile.store'

export default function MyInfosPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [weightHistory, setWeightHistory] = useState<PistePoids[]>([])
  const [poids, setPoids] = useState<string>('')
  const [taille, setTaille] = useState<string>('')
  const { refreshProfile } = useProfileStore()

  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('Mes informations')
  }, [setTitle])

  useEffect(() => {
    Promise.all([getProfile(), getWeightHistory()])
      .then(([profileData, historyData]) => {
        setProfile(profileData)
        setWeightHistory(historyData)
        setPoids(profileData?.poids?.toString() || '')
        setTaille(profileData?.taille?.toString() || '')
      })
      .catch((err) => {
        toast.error((err as Error)?.message || 'Erreur lors du chargement')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({
        poids: poids ? Number(poids) : null,
        taille: taille ? Number(taille) : null,
      })
      await refreshProfile()
      const [profileData, historyData] = await Promise.all([getProfile(), getWeightHistory()])
      setProfile(profileData)
      setWeightHistory(historyData)
      toast.success('Informations mises à jour')
    } catch (err) {
      toast.error((err as Error)?.message || 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <>
      <Button
        variant='icon-plain'
        onClick={() => window.history.back()}
        icon={<FontAwesomeIcon icon={faArrowLeft} />}
      />


      <div className="my-infos-stats">
        <Input
          type="number"
          label="Poids (kg)"
          value={poids}
          onChange={(e) => setPoids(e.target.value)}
          fullWidth
          placeholder="70"
        />
        <Input
          type="number"
          label="Taille (cm)"
          value={taille}
          onChange={(e) => setTaille(e.target.value)}
          fullWidth
          placeholder="175"
        />
      </div>

      <Button
        onClick={handleSave}
        disabled={saving}
        fullWidth
        icon={<FontAwesomeIcon icon={faSave} />}
      >
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </Button>

      {weightHistory.length > 0 ? (
        <div className="my-infos-graph-container">
          <h2 className="my-infos-graph-title">
            Historique de poids
          </h2>
          <WeightGraph data={weightHistory} />
        </div>
      ) : (
        <div className="my-infos-empty">
          Aucun historique de poids disponible
        </div>
      )}

    </>
  )
}
