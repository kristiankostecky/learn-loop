import clsx from 'clsx'
import type { ReactNode } from 'react'

type InputType = JSX.IntrinsicElements['input']

interface InputProps extends InputType {
  invalid?: boolean
}

export function Input({ invalid, ...inputProps }: InputProps) {
  return (
    <input
      {...inputProps}
      className={clsx(
        'relative block w-full rounded-md border-0 py-1.5  ring-1 ring-inset',
        'focus:z-10 focus:ring-2 focus:ring-inset',
        'disabled:cursor-not-allowed disabled:opacity-50',
        {
          'text-slate-900 ring-slate-300 placeholder:text-gray-400 focus:ring-slate-600':
            !invalid,
          'z-10 text-red-900 ring-red-600 placeholder:text-red-400 focus:ring-red-600':
            invalid,
        },
        inputProps?.className
      )}
    />
  )
}

/**
 * Checkbox component for use in forms.
 * Value is set to "on" by default. When not checked, the value won't be sent to the server.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
 */
export function Checkbox(inputProps: InputProps) {
  return (
    <input
      {...inputProps}
      className={clsx(
        'h-4 w-4 rounded border border-slate-300 text-slate-600',
        'focus:ring-slate-600',
        'disabled:cursor-not-allowed disabled:opacity-50',
        inputProps?.className
      )}
      type="checkbox"
    />
  )
}

export function FieldError({ children }: { children: ReactNode }) {
  return <p className="pb-1 text-xs text-red-600">{children}</p>
}
