'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/stores/auth.store'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, signUp } = useAuthStore() 
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await signUp(email, password)
      router.replace('/')
    } catch (err) {
      setError((err as Error)?.message || 'Erreur inconnue')
    }
  }

  return (
    <>
      <h1 className="auth-title">Créer un compte</h1>
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
          minLength={6}
          placeholder="••••••••"
        />
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Création...' : 'Créer le compte'}
        </Button>
        {error && (
          <p className="auth-error">{error}</p>
        )}
      </form>
      <p className="auth-link-text">
        Déjà un compte ? <Link href="/auth/login" className="auth-link">Se connecter</Link>
      </p>
    </>
  )
}