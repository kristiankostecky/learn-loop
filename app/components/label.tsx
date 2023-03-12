import clsx from 'clsx'

type LabelElement = JSX.IntrinsicElements['label']

type LabelProps = LabelElement

export function Label({ children, className, ...labelProps }: LabelProps) {
  return (
    <label
      className={clsx(
        'text-sm font-medium leading-6 text-slate-900',
        className
      )}
      {...labelProps}
    >
      {children}
    </label>
  )
}
