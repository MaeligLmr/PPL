'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { useTheme } from '@/theme/ThemeProvider'

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  error?: string
  fullWidth?: boolean
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, fullWidth = false, style, value, ...props }, ref) => {
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

    const inputStyles: React.CSSProperties = {
      fontFamily: theme.typography.body.regular.fontFamily,
      fontSize: theme.typography.body.regular.fontSize,
      lineHeight: `${theme.typography.body.regular.lineHeight}px`,
      padding: `${theme.spacing.padding[10]}px ${theme.spacing.padding[15]}px`,
      borderRadius: theme.radius.md,
      border: `2px solid ${error ? '#e74c3c' : theme.colors.input.border}`,
      backgroundColor: 'transparent',
      color: hasValue ? theme.colors.input.textFilled : theme.colors.input.text,
      outline: 'none',
      transition: 'all 0.2s ease-in-out',
      width: '100%',
      boxShadow: isFocused ? `0 0 0 3px ${theme.colors.input.border}20` : 'none',
      cursor: 'pointer',
      ...style,
    }

    const errorStyles: React.CSSProperties = {
      fontFamily: theme.typography.body.small.fontFamily,
      fontSize: theme.typography.body.small.fontSize,
      color: '#e74c3c',
      marginTop: theme.spacing.gap[5],
    }

    return (
      <div style={containerStyles}>
        {label && <label style={labelStyles}>{label}</label>}
        <input
          ref={ref}
          type="date"
          value={value}
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
        {error && <span style={errorStyles}>{error}</span>}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
