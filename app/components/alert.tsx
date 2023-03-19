import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Portal } from './portal'

interface AlertProps {
  delay?: number
  message: string
  variant?: 'success' | 'error' | 'info'
}

const DEFAULT_DELAY = 3000

export function Alert({
  delay = DEFAULT_DELAY,
  message,
  variant = 'error',
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, delay)
    return () => {
      clearTimeout(timeout)
    }
  }, [delay])

  const enterFrom =
    'fixed top-0 left-[50%] w-full max-w-md translate-x-[-50%] rounded-md shadow-md'

  return (
    <Portal>
      <Transition
        appear
        className={clsx(enterFrom, {
          'bg-emerald-600 text-white': variant === 'success',
          'bg-rose-500 text-white': variant === 'error',
          'bg-white': variant === 'info',
        })}
        enter="transition ease-in-out duration-500 transform"
        enterFrom="-translate-y-full"
        enterTo="translate-y-4"
        leave="transition ease-in-out duration-500 transform"
        leaveFrom="translate-y-4"
        leaveTo="-translate-y-full"
        show={isVisible}
      >
        <p className="py-2 text-center">{message}</p>
      </Transition>
    </Portal>
  )
}
