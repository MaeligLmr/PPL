'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { addExerciseToWorkout, getWorkoutById } from '@/services/workout.service'
import { WorkoutLineWithDetails, WorkoutWithDetails } from '@/types/Workout'
import { usePageTitle } from '@/components/layout/PageTitleContext'
import Button from '@/components/ui/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ExerciseCard } from '@/components/workout/ExerciceCard'

export default function WorkoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setTitle } = usePageTitle()
  const [workout, setWorkout] = useState<WorkoutWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      console.log(workout)
    }
  }, [id, setTitle])

  useEffect(() => {
    loadWorkout()
  }, [id, setTitle, loadWorkout])

  const addExercice = () => {
    addExerciseToWorkout(id!).then(() => {
      // Recharger les données après ajout d'exercice
      loadWorkout()
    }).catch((err) => {
      console.error('Erreur ajout exercice:', err)
    })
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
      <span className='tag'>{workout.categorie?.nom || 'Séance'}</span>
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {workout.workout_line && workout.workout_line.length > 0 && (
          workout.workout_line.map((line) => (
            <ExerciseCard
              key={line.id}
              id_category= {workout.id_category}
              exercise={line as WorkoutLineWithDetails}
              isNew={line.id_exo === null}
              onExerciseUpdate={loadWorkout}
            />
          ))
        )}
        <Button variant="filled" leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>} onClick={addExercice} >Ajouter un exercice</Button>
      </div >
    </>
  )
}
