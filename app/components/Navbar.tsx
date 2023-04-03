import clsx from 'clsx'

type NavElement = JSX.IntrinsicElements['nav']

type NavbarProps = NavElement

export function Navbar({ className, ...props }: NavbarProps) {
  return (
    <nav
      className={clsx(
        'fixed top-0 z-10 flex h-16 w-full flex-wrap items-center justify-between border-b bg-white px-4',
        className
      )}
      {...props}
    />
  )
}
