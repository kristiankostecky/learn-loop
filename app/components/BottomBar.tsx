import clsx from 'clsx'

type BottomBarProps = JSX.IntrinsicElements['div']

export function BottomBar({ children, className, ...props }: BottomBarProps) {
  return (
    <div className={clsx('-mx-4', className)} {...props}>
      <div className="border-t border-slate-100 px-4 pt-4">{children}</div>
    </div>
  )
}
