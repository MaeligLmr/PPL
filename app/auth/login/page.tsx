'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useTheme } from '@/theme/ThemeProvider'

export default function LoginPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }

    router.replace('/')
  }

  const containerStyles: React.CSSProperties = {
    maxWidth: 420,
    margin: '40px auto',
    padding: theme.spacing.padding[30],
    backgroundColor: theme.colors.tile.background,
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.tile.border}`,
  }

  const titleStyles: React.CSSProperties = {
    fontFamily: theme.typography.heading.large.fontFamily,
    fontSize: theme.typography.heading.large.fontSize,
    fontWeight: theme.typography.heading.large.fontWeight,
    color: theme.colors.title.textColor,
    marginBottom: theme.spacing.padding[20],
  }

  const formStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.gap[20],
  }

  const linkTextStyles: React.CSSProperties = {
    fontFamily: theme.typography.body.small.fontFamily,
    fontSize: theme.typography.body.small.fontSize,
    color: theme.colors.text.textColor,
    textAlign: 'center',
    marginTop: theme.spacing.gap[10],
  }

  const linkStyles: React.CSSProperties = {
    color: theme.colors.button.outlinedText,
    textDecoration: 'underline',
  }

  return (
    <main style={containerStyles}>
      <h1 style={titleStyles}>Connexion</h1>
      <form onSubmit={onSubmit} style={formStyles}>
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
          <p style={{ color: '#e74c3c', fontSize: 14, textAlign: 'center' }}>
            {error}
          </p>
        )}
      </form>
      <p style={linkTextStyles}>
        Pas de compte ? <Link href="/auth/register" style={linkStyles}>Créer un compte</Link>
      </p>
    </main>
  )
}