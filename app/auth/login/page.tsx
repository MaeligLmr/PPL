'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/stores/auth.store'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading } = useAuthStore()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      window.location.href = '/'
    } catch (err) {
      setError((err as Error)?.message || 'Erreur inconnue')
    }
  }

  return (
    <div className="content">
      <h1 className="auth-title">Connexion</h1>
      <form onSubmit={onSubmit} className="auth-form">
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          placeholder="votre.email@exemple.com"
        />
        <Input
          type="password"
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          placeholder="••••••••"
        />
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
        {error && (
          <p className="auth-error">{error}</p>
        )}
      </form>
      <p className="auth-link-text">
        Pas de compte ? <Link href="/auth/register" className="auth-link">Créer un compte</Link>
      </p>
    </div>
  )
}