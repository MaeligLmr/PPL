// filepath: c:\Users\maeli\Documents\ppl\components\ui\Select.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export type CustomSelectOption = {
  value: string
  label: string
  icon?: string // SVG string
}

type SelectProps = {
  label?: string
  error?: string
  fullWidth?: boolean
  options: CustomSelectOption[]
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

export default function Select({
  label,
  error,
  fullWidth = false,
  options,
  placeholder,
  value,
  onChange,
  disabled = false
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
    setIsFocused(false)
  }

  return (
    <div className={["ui-input-container", fullWidth ? "ui-input-container--full" : ""].join(" ")}>
      {label && <label className="ui-input-label">{label}</label>}
      <div ref={containerRef} style={{ position: 'relative' }}>
        <div
          className={["ui-input", "ui-custom-select", error ? "ui-input--error" : "", isFocused ? "ui-input--focus" : "", value ? "ui-input--filled" : "", disabled ? "ui-custom-select--disabled" : ""].join(" ")}
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) setIsOpen(!isOpen)
          }}
          onFocus={() => setIsFocused(true)}
          tabIndex={disabled ? -1 : 0}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {selectedOption?.icon && (
            <div 
              dangerouslySetInnerHTML={{ __html: selectedOption.icon }} 
              style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
              className="custom-select-icon"
            />
          )}
          <span style={{ flex: 1 }}>
            {selectedOption ? selectedOption.label : placeholder || 'Sélectionner...'}
          </span>
          <FontAwesomeIcon icon={faChevronDown} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
        </div>

        {isOpen && (
          <div 
            className="ui-custom-select-dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={["ui-custom-select-option", option.value === value ? "ui-custom-select-option--selected" : ""].join(" ")}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelect(option.value)
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {option.icon && (
                  <div 
                    dangerouslySetInnerHTML={{ __html: option.icon }} 
                    style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                    className="custom-select-icon"
                  />
                )}
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <span className="ui-input-error">{error}</span>}
    </div>
  )
}