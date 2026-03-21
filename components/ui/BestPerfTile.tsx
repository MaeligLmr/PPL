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
        <span className='tile-header' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-10)' }}>
          {perf.exo_svg ? (
            <div
              className="exercise-icon"
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color:'var(--theme-text)'
              }}
              dangerouslySetInnerHTML={{ __html: perf.exo_svg }}
            ></div>
          ) : null}
          {perf.exo_nom}
        </span>
        <p className='tile-subheader'>Le {date}</p>

      </div>
      <div className='tile-perf'>
        <h1>{perf.charge} kg</h1>
      </div>
    </Link>
  )
}
