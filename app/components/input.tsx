import clsx from 'clsx'

type InputType = JSX.IntrinsicElements['input']

type InputProps = InputType

export function Input(inputProps: InputProps) {
  return (
    <input
      {...inputProps}
      className={clsx(
        'relative block w-full rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-gray-400',
        'focus:z-10 focus:ring-2 focus:ring-inset focus:ring-slate-600',
        'disabled:cursor-not-allowed disabled:opacity-50',
        inputProps?.className
      )}
    />
  )
}

/**
 * Checkbox component for use in forms.
 * Value is set to "on" by default. When not checked box, the value won't be sent to the server.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
 */
export function Checkbox(inputProps: InputProps) {
  return (
    <input
      {...inputProps}
      className={clsx(
        'h-4 w-4 rounded border border-slate-300 text-slate-600 focus:ring-slate-600',
        'disabled:cursor-not-allowed disabled:opacity-50',
        inputProps?.className
      )}
      type="checkbox"
    />
  )
}
