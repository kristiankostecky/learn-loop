import clsx from 'clsx'

type BottomBarProps = JSX.IntrinsicElements['div']

export function BottomBar({ children, className, ...props }: BottomBarProps) {
  return (
    <div className={clsx('-mx-4', className)} {...props}>
      <div className="fixed bottom-0 mt-auto w-full border-t border-slate-100 bg-white p-4">
        {children}
      </div>
    </div>
  )
}
