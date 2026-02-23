'use client'

import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '@/services/profile.service'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import InputFile from '@/components/ui/InputFile'
import { usePageTitle } from '@/components/layout/PageTitleContext'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'sonner'
import { useProfileStore } from '@/stores/profile.store'
import Loader from '@/components/ui/Loader'

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [mail, setMail] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const { refreshProfile } = useProfileStore()

  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('Modifier mon profil')
  }, [setTitle])

  useEffect(() => {
    getProfile()
      .then((profile) => {
        setPrenom(profile.prenom ?? '')
        setNom(profile.nom ?? '')
        setPseudo(profile.pseudo ?? '')
        setMail(profile.mail ?? '')
        setPhotoUrl(profile.photo_url ?? '')
      })
      .catch((err) => {
        toast.error((err as Error)?.message || 'Erreur lors du chargement du profil')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await updateProfile({
        prenom: prenom || null,
        nom: nom || null,
        pseudo: pseudo || null,
        mail: mail,
        photo_url: photoUrl || null,
      }, file || undefined)
      await refreshProfile()
      toast.success('Profil mis à jour')
    } catch (err) {
      toast.error((err as Error)?.message || 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="content"><Loader /></div>

  return (
    <>
      <Button variant='icon-plain'
        onClick={() => window.history.back()}
        icon={<FontAwesomeIcon icon={faArrowLeft} />} />


      <form onSubmit={handleSubmit}>
        <InputFile
          label="Photo de profil"
          onFileChange={setFile}
          currentImageUrl={photoUrl}
          fullWidth
        />
        <Input
          type="text"
          label="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          fullWidth
          placeholder="Votre prénom"
        />
        <Input
          type="text"
          label="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          fullWidth
          placeholder="Votre nom"
        />
        <Input
          type="text"
          label="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          fullWidth
          placeholder="Votre pseudo"
        />
        <Input
          type="email"
          label="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          fullWidth
          placeholder="votre.email@exemple.com"
        />
        <Button type="submit" disabled={saving} fullWidth>
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </form>
    </>
  )
}
