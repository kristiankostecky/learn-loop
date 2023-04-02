import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import clsx from 'clsx'
import type { ElementType, ReactNode } from 'react'

interface LinkBoxProps {
  as?: ElementType
  children: ReactNode
  className?: string
}

export function LinkBox({
  as: Component = 'div',
  children,
  className,
}: LinkBoxProps) {
  return (
    <Component className={clsx('relative', className)}>{children}</Component>
  )
}

export function LinkOverlay({ className, ...props }: LinkProps) {
  return (
    <Link
      className={clsx('before:absolute before:inset-0', className)}
      {...props}
    />
  )
}
