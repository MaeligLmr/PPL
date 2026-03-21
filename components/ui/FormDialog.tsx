'use client'

import Button from './Button'
import { ReactNode } from 'react'

export type FormDialogProps = {
  isOpen: boolean
  title: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
  children: ReactNode
}

export default function FormDialog({ isOpen, title, message, onConfirm, onCancel, children }: FormDialogProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
        }}
        onClick={onCancel}
      />

      {/* Dialog */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--theme-tile-bg)',
          border: '1px solid var(--theme-tile-border)',
          borderRadius: 'var(--radius-15)',
          padding: 'var(--spacing-20)',
          width: '90vw',
          zIndex: 9999,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 style={{ margin: '0 0 var(--spacing-15) 0', color: 'var(--theme-title-text)' }}>
          {title}
        </h2>
        {message && (
          <p style={{ margin: '0 0 var(--spacing-20) 0', color: 'var(--theme-text)' }}>
            {message}
          </p>
        )}
        {children}
        <div className='flex pt-4' >
          <Button variant="outlined" fullWidth onClick={onCancel}>
            Annuler
          </Button>
          <Button variant="filled" fullWidth onClick={onConfirm}>
            Enregistrer
          </Button>
        </div>
      </div>
    </>
  )
}
