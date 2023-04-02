import { Menu as HeadlessUiMenu, Transition } from '@headlessui/react'
import type { ReactNode } from 'react'
import { Fragment } from 'react'

function MenuTransition({ children }: { children: ReactNode }) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  )
}

export const Menu = HeadlessUiMenu as typeof HeadlessUiMenu & {
  Transition: typeof MenuTransition
}

Menu.Transition = MenuTransition
