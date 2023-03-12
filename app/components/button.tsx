import React from 'react'
import clsx from 'clsx'

type ButtonElement = JSX.IntrinsicElements['button']

interface ButtonProps extends ButtonElement {
  children: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md'
  variant?: 'primary' | 'secondary'
}

export function Button({
  children,
  className,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'box-border flex content-center items-center justify-center space-x-2 ',
        'disabled:cursor-not-allowed disabled:opacity-40',
        {
          'bg-slate-700 text-white enabled:hover:bg-slate-800':
            variant === 'primary',
          'bg-white text-slate-900 enabled:hover:bg-slate-100':
            variant === 'secondary',
          'h-10 rounded-md px-3': size === 'md',
          'h-8 rounded-md px-2 text-sm': size === 'sm',
        },
        className
      )}
      {...buttonProps}
    >
      {leftIcon && <i className="inline-block">{leftIcon}</i>}
      <span>{children}</span>
      {rightIcon && <i className="inline-block">{rightIcon}</i>}
    </button>
  )
}
