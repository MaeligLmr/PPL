'use client'

import { InputHTMLAttributes, forwardRef, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  error?: string
  fullWidth?: boolean
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, fullWidth = false, style, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = value !== undefined && value !== ''
    const inputRef = useRef<HTMLInputElement>(null)

    const handleIconClick = () => {
      if (inputRef.current) {
        inputRef.current.showPicker?.()
      }
    }

    return (
      <div className={["ui-input-container", fullWidth ? "ui-input-container--full" : ""].join(" ")}> 
        {label && <label className="ui-input-label">{label}</label>}
        <div style={{ position: 'relative' }}>
          <input
            ref={(node) => {
              inputRef.current = node
              if (typeof ref === 'function') ref(node)
              else if (ref) ref.current = node
            }}
            type="date"
            value={value}
            className={["ui-input", error ? "ui-input--error" : "", isFocused ? "ui-input--focus" : "", hasValue ? "ui-input--filled" : ""].join(" ")}
            style={{ ...style, paddingRight: '40px' }}
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
          <FontAwesomeIcon 
            icon={faCalendar} 
            onClick={handleIconClick}
            style={{ 
              position: 'absolute', 
              right: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: 'var(--theme-text-secondary)'
            }} 
          />
        </div>
        {error && <span className="ui-input-error">{error}</span>}
        
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default DatePicker