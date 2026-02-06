import { Profile } from "@/types/Profile"
import Image from "next/image"

type AvatarProps = {
  dimensions: number
  profile: Profile | null
  hoverDisabled?: boolean
  showName?: boolean
}

const Avatar = ({ dimensions, profile, hoverDisabled = false, showName = true }: AvatarProps) => {
  const size = `${dimensions * 4}px` // Convert units (1 = 4px)
  if (!profile || !profile.photo_url) {
    return (
      <div className={`avatar-container ${hoverDisabled ? '' : 'avatar-hover-enabled'}`}>
        <div 
          className="avatar-circle avatar-default"
          style={{ width: size, height: size }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="40" r="20" fill="#9CA3AF" />
            <path
              d="M10 120c0-28 22-48 50-48s50 20 50 48"
              fill="#9CA3AF"
            />
          </svg>
        </div>
        {showName && profile && profile.pseudo && (
          <span className="avatar-profilename">{profile.pseudo}</span>
        )}
      </div>
    )
  } else {
    return (
      <div className={`avatar-container ${hoverDisabled ? '' : 'avatar-hover-enabled'}`}>
        <div 
          className="avatar-circle"
          style={{ width: size, height: size }}
        >
          <Image src={profile.photo_url} alt="Avatar" className="avatar-image" fill />
        </div>
        {showName && profile.pseudo && (
          <span className="avatar-profilename">{profile.pseudo}</span>
        )}
      </div>
    )
  }
}

export default Avatar
