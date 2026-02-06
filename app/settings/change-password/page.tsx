'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { usePageTitle } from '@/components/layout/PageTitleContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
const { setTitle } = usePageTitle()
      useEffect(() => {
        setTitle('Modifier le mot de passe')
      }, [setTitle])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (newPassword.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setLoading(true)

    try {
      // TODO: Implement API call to change password
      // await changePassword(currentPassword, newPassword)
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError((err as Error)?.message || 'Erreur lors du changement de mot de passe')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="settings-container">
      <Button variant='icon-plain' 
        onClick={() => window.history.back()}
        icon={<FontAwesomeIcon icon={faArrowLeft} />}/>

      <section className="settings-form">
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            label="Mot de passe actuel"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            fullWidth
            placeholder="••••••••"
          />
          <Input
            type="password"
            label="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
            minLength={6}
            placeholder="••••••••"
          />
          <Input
            type="password"
            label="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            minLength={6}
            placeholder="••••••••"
          />
          <Button type="submit" disabled={loading} fullWidth>
            {loading ? 'Changement en cours...' : 'Changer le mot de passe'}
          </Button>
          {success && <p className="success-message">✓ Mot de passe changé avec succès</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  )
}
