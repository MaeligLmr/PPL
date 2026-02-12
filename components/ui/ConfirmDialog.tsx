'use client'

import Button from './Button'

type ConfirmDialogProps = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
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
          minWidth: '300px',
          maxWidth: '90vw',
          zIndex: 9999,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 style={{ margin: '0 0 var(--spacing-15) 0', color: 'var(--theme-title-text)' }}>
          {title}
        </h2>
        <p style={{ margin: '0 0 var(--spacing-20) 0', color: 'var(--theme-text)' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-10)', justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onCancel}>
            Annuler
          </Button>
          <Button variant="filled" onClick={onConfirm}>
            Confirmer
          </Button>
        </div>
      </div>
    </>
  )
}
