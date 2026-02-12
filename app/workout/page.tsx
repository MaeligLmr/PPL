'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { addExerciseToWorkout, getWorkoutById, deleteWorkout } from '@/services/workout.service'
import { WorkoutLineWithDetails, WorkoutWithDetails } from '@/types/Workout'
import { usePageTitle } from '@/components/layout/PageTitleContext'
import Button from '@/components/ui/Button'
import { toast } from 'sonner'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ExerciseCard } from '@/components/workout/ExerciceCard'

export default function WorkoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setTitle } = usePageTitle()
  const [workout, setWorkout] = useState<WorkoutWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const id = searchParams.get('workout')

  const loadWorkout = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      const data = await getWorkoutById(id)
      setWorkout(data)
      setTitle(`Séance du ${new Date(data.date).toLocaleDateString('fr-FR')}`)
    } catch (err) {
      setError((err as Error)?.message || 'Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }, [id, setTitle])

  useEffect(() => {
    loadWorkout()
  }, [id, setTitle, loadWorkout])

  const addExercice = () => {
    addExerciseToWorkout(id!).then(() => {
      loadWorkout()
      toast.success('Exercice ajouté')
    }).catch((err) => {
      console.error('Erreur ajout exercice:', err)
      toast.error('Erreur lors de l\'ajout de l\'exercice')
    })
  }

  const handleDeleteWorkout = async () => {
    try {
      await deleteWorkout(id!)
      toast.success('Séance supprimée')
      router.push('/')
    } catch (error) {
      console.error('Erreur suppression séance:', error)
      toast.error('Erreur lors de la suppression de la séance')
    }
  }

  if (loading) {
    return <div className="content">Chargement...</div>
  }

  if (error || !workout) {
    return (
      <div className="content">
        <p>Erreur: {error || 'Séance non trouvée'}</p>
        <Button variant="outlined" onClick={() => router.back()}>
          Retour
        </Button>
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className='tag'>{workout.categorie?.nom || 'Séance'}</span>
        <div style={{ position: 'relative' }}>
          <Button 
            variant="icon-plain" 
            icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <>
              <div 
                style={{ 
                  position: 'fixed', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  zIndex: 999 
                }}
                onClick={() => setShowMenu(false)}
              />
              <div 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  background: 'var(--theme-tile-bg)',
                  border: '1px solid var(--theme-tile-border)',
                  borderRadius: 'var(--radius-15)',
                  padding: 'var(--spacing-10)',
                  minWidth: '200px',
                  zIndex: 1000,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <Button 
                  variant="plain" 
                  fullWidth
                  leftIcon={<FontAwesomeIcon icon={faTrash} />}
                  onClick={() => {
                    setShowMenu(false)
                    setShowDeleteConfirm(true)
                  }}
                  style={{ justifyContent: 'flex-start', color: 'var(--theme-text)' }}
                >
                  Supprimer
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {workout.workout_line && workout.workout_line.length > 0 && (
          workout.workout_line.map((line) => (
            <ExerciseCard
              key={line.id}
              id_category={workout.id_category}
              exercise={line as WorkoutLineWithDetails}
              isNew={line.id_exo === null}
              onExerciseUpdate={loadWorkout}
              workoutId={id!}
            />
          ))
        )}
        <Button variant="filled" leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>} onClick={addExercice} >Ajouter un exercice</Button>
      </div >
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Supprimer la séance"
        message="Êtes-vous sûr de vouloir supprimer cette séance ?"
        onConfirm={handleDeleteWorkout}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  )
}
