'use client'

import Link from 'next/link'
import { BestPerf } from '@/types/Profile'
import { playUserSound } from '@/services/sound.service'

type Props = {
  perf: BestPerf
}

export function BestPerfTile({ perf }: Props) {
  const date = new Date(perf.workout_date).toLocaleDateString('fr-FR')

  const handleClick = () => {
    playUserSound();
  };

  return (
    <Link
      href={`/workout/?workout=${perf.workout_id}`}
      className="tile"
      onClick={handleClick}
    >
      <div className='tile-infos'>
        <p className='tile-header'>{perf.exo_nom}</p>
        <p className='tile-subheader'>Le {date}</p>

      </div>
      <div className='tile-perf'>
        <h1>{perf.charge} kg</h1>
      </div>
    </Link>
  )
}
