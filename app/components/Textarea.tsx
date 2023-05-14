import clsx from 'clsx'
import type { ComponentProps } from 'react'

interface TextareaProps extends ComponentProps<'textarea'> {
  invalid?: boolean
}

export function Textarea({ invalid, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
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
        props?.className
      )}
    />
  )
}
