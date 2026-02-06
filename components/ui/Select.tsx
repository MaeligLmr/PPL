'use client'

import { SelectHTMLAttributes, forwardRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'

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
        <div className="ui-select-wrapper" style={{ position: 'relative' }}>
          <select
            ref={ref}
            value={value}
            className={["ui-input", error ? "ui-input--error" : "", isFocused ? "ui-input--focus" : "", hasValue ? "ui-input--filled" : ""].join(" ")}
            style={{ ...style, appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none', paddingRight: 36 }}
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
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} className="ui-select-option">
                {option.label}
              </option>
            ))}
          </select>
          <span className="ui-select-chevron">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </div>
        {error && <span className="ui-input-error">{error}</span>}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
