'use client'

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { useTheme } from '@/theme/ThemeProvider'

type ButtonVariant =
  | 'filled'
  | 'outlined'
  | 'plain'
  | 'icon-filled'
  | 'icon-outlined'
  | 'icon-plain'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  icon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'filled',
      fullWidth = false,
      leftIcon,
      rightIcon,
      icon,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme()
    const isIconOnly = variant.startsWith('icon-')
    const baseVariant = (isIconOnly ? variant.replace('icon-', '') : variant) as
      | 'filled'
      | 'outlined'
      | 'plain'

    const baseStyles: React.CSSProperties = {
      fontFamily: theme.typography.button.primary.fontFamily,
      fontWeight: theme.typography.button.primary.fontWeight,
      fontSize: theme.typography.button.primary.fontSize,
      lineHeight: `${theme.typography.button.primary.lineHeight}px`,
      letterSpacing: theme.typography.button.primary.letterSpacing,
      paddingLeft: isIconOnly ? theme.spacing.button.padding.y : theme.spacing.button.padding.x,
      paddingRight: isIconOnly ? theme.spacing.button.padding.y : theme.spacing.button.padding.x,
      paddingTop: theme.spacing.button.padding.y,
      paddingBottom: theme.spacing.button.padding.y,
      borderRadius: theme.spacing.button.radius,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease-in-out',
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.6 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.gap[10],
      minWidth: isIconOnly ? 40 : undefined,
      minHeight: isIconOnly ? 40 : undefined,
    }

    const variantStyles: Record<'filled' | 'outlined' | 'plain', React.CSSProperties> = {
      filled: {
        backgroundColor: theme.colors.button.primaryBackground,
        color: theme.colors.button.primaryText,
      },
      outlined: {
        backgroundColor: 'transparent',
        color: theme.colors.button.outlinedText,
        border: `2px solid ${theme.colors.button.outlinedText}`,
      },
      plain: {
        backgroundColor: 'transparent',
        color: theme.colors.button.outlinedText,
      },
    }

    const hoverStyles: Record<'filled' | 'outlined' | 'plain', React.CSSProperties> = {
      filled: {
        backgroundColor: theme.colors.button.primaryBackgroundHover,
      },
      outlined: {
        backgroundColor: theme.colors.button.outlinedHoverBackground,
      },
      plain: {
        backgroundColor: theme.colors.button.outlinedHoverBackground,
      },
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{
          ...baseStyles,
          ...variantStyles[baseVariant],
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            Object.assign(e.currentTarget.style, hoverStyles[baseVariant])
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            Object.assign(e.currentTarget.style, variantStyles[baseVariant])
          }
        }}
        {...props}
      >
        {isIconOnly ? (
          icon
        ) : (
          <>
            {leftIcon && <span aria-hidden>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span aria-hidden>{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
