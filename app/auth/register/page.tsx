'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/stores/auth.store'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import InputFile from '@/components/ui/InputFile'
import { updateProfile } from '@/services/profile.service'
import { toast } from 'sonner'

export default function SignupPage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { loading, signUp } = useAuthStore()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas')
        return
      }
      await signUp(email, password)
      await updateProfile({
        prenom: prenom || null,
        nom: nom || null,
        pseudo: pseudo || null,
        mail: email,
      }, file || undefined)
      toast.success('Compte créé avec succès')
      window.location.href = '/PPL'
    } catch (err) {
      toast.error((err as Error)?.message || 'Erreur inconnue')
    }
  }

  return (
    <>
      <h1 className="auth-title">Créer un compte</h1>
      <form onSubmit={onSubmit} className="auth-form">
        <InputFile
          label="Photo de profil"
          onFileChange={setFile}
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
          type="email *"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          placeholder="votre.email@exemple.com"
        />
        <Input
          type="password"
          label="Mot de passe *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          minLength={6}
        />
        <Input
          type="password"
          label="Confirmer le mot de passe *"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          minLength={6}
        />
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Création...' : 'Créer le compte'}
        </Button>
      </form>
      <p className="auth-link-text">
        Déjà un compte ? <Link href="/auth/login" className="auth-link">Se connecter</Link>
      </p>
    </>
  )
}