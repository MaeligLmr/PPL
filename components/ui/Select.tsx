'use client'

import { SelectHTMLAttributes, forwardRef, useState } from 'react'
import './Select.css'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label?: string
  error?: string
  fullWidth?: boolean
  options: SelectOption[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, fullWidth = false, options, placeholder, style, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = value !== undefined && value !== ''

    return (
      <div className={["ui-input-container", fullWidth ? "ui-input-container--full" : ""].join(" ")}> 
        {label && <label className="ui-input-label">{label}</label>}
        <select
          ref={ref}
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="ui-input-error">{error}</span>}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
