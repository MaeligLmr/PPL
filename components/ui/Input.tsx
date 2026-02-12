'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, style, value, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const hasValue = value !== undefined && value !== ''
    const isPassword = type === 'password'

    return (
      <div className={["ui-input-container", fullWidth ? "ui-input-container--full" : ""].join(" ")}> 
        {label && <label className="ui-input-label">{label}</label>}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            ref={ref}
            value={value}
            type={isPassword && showPassword ? 'text' : type}
            className={["ui-input", error ? "ui-input--error" : "", isFocused ? "ui-input--focus" : "", hasValue ? "ui-input--filled" : ""].join(" ")}
            style={{
              ...style,
              paddingRight: isPassword ? '40px' : undefined
            }}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
          {isPassword && (
            <Button
              type="button"
              variant="icon-plain"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: '100'
              }}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              icon={<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />}
            />
          )}
        </div>
        {error && <span className="ui-input-error">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input