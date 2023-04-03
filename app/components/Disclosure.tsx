import { Disclosure as HeadlessUiDisclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface IconProps extends React.SVGAttributes<SVGElement> {
  isOpen: boolean
}

function Icon({ className, isOpen }: IconProps) {
  return (
    <ChevronUpIcon
      className={clsx(
        'disclosure-icon',
        {
          'rotate-180 transform': isOpen,
        },
        className
      )}
    />
  )
}

export const Disclosure =
  HeadlessUiDisclosure as typeof HeadlessUiDisclosure & {
    Icon: typeof Icon
  }

Disclosure.Icon = Icon
