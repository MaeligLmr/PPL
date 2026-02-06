'use client'

import Link from 'next/link'
import { BestPerf } from '@/types/Profile'

type Props = {
  perf: BestPerf
}

export function BestPerfTile({ perf }: Props) {
  const date = new Date(perf.workout_date).toLocaleDateString('fr-FR')

  return (
    <Link href={`/workouts/${perf.workout_id}`} className="tile">
      <div className='tile-infos'>
        <p className='tile-header'>{perf.exo_nom}</p>
        <p className='tile-subheader'>Le {date}</p>
        <p className='tile-subheader'>{perf.reps} reps</p>
      </div>
      <div className='tile-perf'>
        <h1>{perf.charge} kg</h1>
      </div>
    </Link>
  )
}
