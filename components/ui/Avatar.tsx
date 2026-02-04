import React from 'react'
import './Avatar.css'

type AvatarProps = {
  src?: string
  alt?: string
  size?: number
}

export default function Avatar({ src, alt, size = 32 }: AvatarProps) {
  return (
    <span className="ui-avatar" style={{ width: size, height: size, fontSize: size * 0.5 }}>
      {src ? <img src={src} alt={alt} /> : <span className="ui-avatar-fallback">?</span>}
    </span>
  )
}
