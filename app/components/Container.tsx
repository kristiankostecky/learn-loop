import clsx from 'clsx'

type ContainerProps = JSX.IntrinsicElements['button']

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        'flex min-h-full w-full max-w-6xl flex-col p-4',
        className
      )}
    >
      {children}
    </div>
  )
}
