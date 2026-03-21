'use client'

import { TextareaHTMLAttributes, forwardRef, useState } from 'react'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  fullWidth?: boolean
  style?: React.CSSProperties
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = false, style, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = value !== undefined && value !== ''

    return (
      <div className={["ui-input-container", fullWidth ? "ui-input-container--full" : ""].join(" ")}> 
        <div style={{ position: 'relative', width: '100%' }}>
          <textarea
            ref={ref}
            value={value}
            placeholder={label}
            className={["ui-input", error ? "ui-input--error" : "", isFocused ? "ui-input--focus" : "", hasValue ? "ui-input--filled" : ""].join(" ")}
            style={{ ...style, resize: 'vertical', minHeight: 80 }}
            onFocus={e => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={e => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
        </div>
        {error && <span className="ui-input-error">{error}</span>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
