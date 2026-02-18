'use client'

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { playUserSound } from '@/services/sound.service'

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
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
  playSound?: boolean // Nouvelle prop pour activer le son
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
      size = 'md',
      align = 'center',
      playSound = true,
      style,
      disabled,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const isIconOnly = variant.startsWith('icon-')
    const baseVariant = (isIconOnly ? variant.replace('icon-', '') : variant) as
      | 'filled'
      | 'outlined'
      | 'plain'

    const justifyContent =
      align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (playSound) {
        playUserSound();
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[
          'ui-btn',
          `ui-btn--${baseVariant}`,
          isIconOnly ? 'ui-btn--icon' : '',
          fullWidth ? 'ui-btn--full' : '',

          `ui-btn--${size}`,
          className ?? '',
        ].join(' ')}
        style={{
          ...style,
          opacity: disabled ? 0.6 : 1,
          minWidth: isIconOnly ? 40 : undefined,
          minHeight: isIconOnly ? 40 : undefined,
          justifyContent,
        }}
        onClick={handleClick}
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