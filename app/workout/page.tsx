'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getWorkoutById } from '@/services/workout.service'
import { WorkoutLineWithDetails, WorkoutWithDetails } from '@/types/Workout'
import { usePageTitle } from '@/components/layout/PageTitleContext'
import Button from '@/components/ui/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ExerciseCard } from '@/components/workout/ExerciceCard'

export default function WorkoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setTitle } = usePageTitle()
  const [workout, setWorkout] = useState<WorkoutWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const id = searchParams.get('workout')

  useEffect(() => {
    if (!id) return

    const load = async () => {
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
    }

    load()
  }, [id, setTitle])

  const addExercice = () => {
    //TODO : add exercice to workout
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
        {workout.workout_exercises && workout.workout_exercises.length > 0 ? (
          workout.workout_exercises.map((line) => (
            <ExerciseCard key={line.id} exercise={line as WorkoutLineWithDetails} />
          ))
        ) : (
          <p>Aucun exercice enregistré</p>
        )}
        <Button variant="filled" leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>} onClick={addExercice} />
      </div >
    </>
  )
}
