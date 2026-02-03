'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { useTheme } from '@/theme/ThemeProvider'

type InputNumberProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  error?: string
  fullWidth?: boolean
  min?: number
  max?: number
  step?: number
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({ label, error, fullWidth = false, style, value, min, max, step = 1, ...props }, ref) => {
    const { theme } = useTheme()
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = value !== undefined && value !== ''

    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.gap[5],
      width: fullWidth ? '100%' : 'auto',
    }

    const labelStyles: React.CSSProperties = {
      fontFamily: theme.typography.body.small.fontFamily,
      fontWeight: '600',
      fontSize: theme.typography.body.small.fontSize,
      lineHeight: `${theme.typography.body.small.lineHeight}px`,
      color: theme.colors.input.text,
    }

    const wrapperStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      borderRadius: theme.radius.md,
      border: `2px solid ${error ? '#e74c3c' : theme.colors.input.border}`,
      backgroundColor: 'transparent',
      overflow: 'hidden',
      transition: 'all 0.2s ease-in-out',
      boxShadow: isFocused ? `0 0 0 3px ${theme.colors.input.border}20` : 'none',
    }

    const inputStyles: React.CSSProperties = {
      fontFamily: theme.typography.body.regular.fontFamily,
      fontSize: theme.typography.body.regular.fontSize,
      lineHeight: `${theme.typography.body.regular.lineHeight}px`,
      padding: `${theme.spacing.padding[10]}px ${theme.spacing.padding[15]}px`,
      border: 'none',
      backgroundColor: 'transparent',
      color: hasValue ? theme.colors.input.textFilled : theme.colors.input.text,
      outline: 'none',
      flex: 1,
      width: '100%',
      ...style,
    }

    const buttonStyles: React.CSSProperties = {
      padding: `${theme.spacing.padding[10]}px ${theme.spacing.padding[15]}px`,
      border: 'none',
      backgroundColor: theme.colors.button.primaryBackground,
      color: theme.colors.button.primaryText,
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    const errorStyles: React.CSSProperties = {
      fontFamily: theme.typography.body.small.fontFamily,
      fontSize: theme.typography.body.small.fontSize,
      color: '#e74c3c',
      marginTop: theme.spacing.gap[5],
    }

    const handleIncrement = () => {
      const currentValue = Number(value) || 0
      const newValue = currentValue + step
      if (max === undefined || newValue <= max) {
        const event = {
          target: { value: String(newValue) },
        } as React.ChangeEvent<HTMLInputElement>
        props.onChange?.(event)
      }
    }

    const handleDecrement = () => {
      const currentValue = Number(value) || 0
      const newValue = currentValue - step
      if (min === undefined || newValue >= min) {
        const event = {
          target: { value: String(newValue) },
        } as React.ChangeEvent<HTMLInputElement>
        props.onChange?.(event)
      }
    }

    return (
      <div style={containerStyles}>
        {label && <label style={labelStyles}>{label}</label>}
        <div style={wrapperStyles}>
          <button
            type="button"
            style={buttonStyles}
            onClick={handleDecrement}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.button.primaryBackgroundHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.button.primaryBackground
            }}
          >
            −
          </button>
          <input
            ref={ref}
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            style={inputStyles}
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
          <button
            type="button"
            style={buttonStyles}
            onClick={handleIncrement}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.button.primaryBackgroundHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.button.primaryBackground
            }}
          >
            +
          </button>
        </div>
        {error && <span style={errorStyles}>{error}</span>}
      </div>
    )
  }
)

InputNumber.displayName = 'InputNumber'

export default InputNumber
