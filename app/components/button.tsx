import type { ComponentPropsWithoutRef, ElementType } from 'react'
import React from 'react'
import clsx from 'clsx'

type ButtonElement = JSX.IntrinsicElements['button']

interface ButtonProps<T extends ElementType = 'button'> extends ButtonElement {
  as?: T
  children: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md'
  variant?: 'primary' | 'secondary' | 'ghost'
}

interface IconButtonProps
  extends Omit<
      ButtonProps,
      'children' | 'leftIcon' | 'rightIcon' | 'aria-label'
    >,
    Required<Pick<ButtonElement, 'aria-label'>> {
  icon?: React.ReactNode
}

export function Button<T extends ElementType = 'button'>({
  as,
  children,
  className,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'primary',
  ...buttonProps
}: ButtonProps<T> & ComponentPropsWithoutRef<T>) {
  const Component = as || 'button'
  return (
    <Component
      className={clsx(
        'box-border flex content-center items-center justify-center space-x-2',
        'disabled:cursor-not-allowed disabled:opacity-40',
        {
          'bg-black text-white enabled:hover:bg-slate-900':
            variant === 'primary',
          'bg-slate-200 text-black enabled:hover:bg-slate-300':
            variant === 'secondary',
          'bg-transparent text-black enabled:hover:bg-slate-100':
            variant === 'ghost',
          'h-10 rounded-md px-3': size === 'md',
          'h-8 rounded-md px-2 text-sm': size === 'sm',
        },
        className
      )}
      {...buttonProps}
    >
      {leftIcon && <i className="inline-block">{leftIcon}</i>}
      {children}
      {rightIcon && <i className="inline-block">{rightIcon}</i>}
    </Component>
  )
}

export function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <Button {...props}>
      <i className="inline-block">{icon}</i>
    </Button>
  )
}
