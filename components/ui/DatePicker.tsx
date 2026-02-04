'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import './Input.css'

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  error?: string
  fullWidth?: boolean
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, fullWidth = false, style, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = value !== undefined && value !== ''

    return (
      <div className={["ui-input-container", fullWidth ? "ui-input-container--full" : ""].join(" ")}> 
        {label && <label className="ui-input-label">{label}</label>}
        <input
          ref={ref}
          type="date"
          value={value}
          className={["ui-input", error ? "ui-input--error" : "", isFocused ? "ui-input--focus" : "", hasValue ? "ui-input--filled" : ""].join(" ")}
          style={style}
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
        {error && <span className="ui-input-error">{error}</span>}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
