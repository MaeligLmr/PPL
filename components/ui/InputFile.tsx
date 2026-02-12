'use client'

import { InputHTMLAttributes, forwardRef, useState, useRef } from 'react'
import Image from 'next/image'

type InputFileProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  fullWidth?: boolean
  onFileChange?: (file: File | null) => void
  currentImageUrl?: string | null
  size?: number
}

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  ({ label, fullWidth = false, onFileChange, currentImageUrl, size = 120, className, ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null
      
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }
      
      onFileChange?.(file)
    }

    const handleClick = () => {
      inputRef.current?.click()
    }

    const displayImage = preview || currentImageUrl

    return (
      <div className={`ui-input-file-avatar-container${fullWidth ? ' ui-input-file-avatar-container--full' : ''}`}>
        {label && <label className="ui-input-label">{label}</label>}
        <div 
          className="ui-input-file-avatar"
          style={{ width: `${size}px`, height: `${size}px` }}
          onClick={handleClick}
        >
          {displayImage ? (
            <div className="ui-input-file-avatar-image">
              <Image src={displayImage} alt="Avatar" fill style={{ objectFit: 'cover' }} />
            </div>
          ) : (
            <div className="ui-input-file-avatar-placeholder">
              <svg
                width="80"
                height="80"
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
          )}
          <div className="ui-input-file-avatar-overlay">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="white"/>
            </svg>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="ui-input-file-hidden"
          onChange={handleChange}
          {...props}
        />
      </div>
    )
  }
)

InputFile.displayName = 'InputFile'

export default InputFile
