import type { LinkProps } from '@remix-run/react'
import { Link } from '@remix-run/react'
import clsx from 'clsx'

interface LinkBoxProps {
  children: React.ReactNode
  className?: string
}

export function LinkBox({ children, className }: LinkBoxProps) {
  return <div className={clsx('relative', className)}>{children}</div>
}

export function LinkOverlay({ className, ...props }: LinkProps) {
  return (
    <Link
      className={clsx('before:absolute before:inset-0', className)}
      {...props}
    />
  )
}
