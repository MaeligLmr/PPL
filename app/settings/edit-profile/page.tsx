'use client'

import { useState, useEffect } from 'react'
import { getUser } from '@/services/auth.service'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { User } from '@/types/User'
import { usePageTitle } from '@/components/layout/PageTitleContext'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setTitle } = usePageTitle()
  useEffect(() => {
    setTitle('Modifier mon profil')
  }, [setTitle])

  useEffect(() => {
    getUser().then((fetchedUser) => {
      if (fetchedUser?.data?.user) {
        const u = fetchedUser.data.user as User
        setUser(u)
        setUsername(u?.user_metadata?.email?.split('@')[0] || '')
        setEmail(u?.email || '')
      }
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      // TODO: Implement API call to update user profile
      // await updateProfile(username, email)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError((err as Error)?.message || 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Chargement...</div>

  return (
    <main className="settings-container">
      <Button variant='icon-plain' 
        onClick={() => window.history.back()}
        icon={<FontAwesomeIcon icon={faArrowLeft} />}/>

      <section className="settings-form">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            placeholder="Votre pseudo"
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            placeholder="votre.email@exemple.com"
            disabled
          />
          <Button type="submit" disabled={saving} fullWidth>
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
          {success && <p className="success-message">✓ Modifications enregistrées</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  )
}
