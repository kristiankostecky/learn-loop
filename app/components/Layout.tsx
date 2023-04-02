import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { Form, Link } from '@remix-run/react'
import type { ReactNode } from 'react'
import { ROUTES } from '~/constants'
import { IconButton } from './Button'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
  renderNavbar?: ReactNode
}

export function Layout({ children, renderNavbar }: LayoutProps) {
  return (
    <>
      <header>
        {renderNavbar || (
          <Navbar>
            <Link className="text-black  hover:no-underline" to={ROUTES.ROOT}>
              Learn Loop
            </Link>
            <Form action={ROUTES.LOGOUT} method="post">
              <IconButton
                aria-label="Logout"
                icon={<ArrowRightOnRectangleIcon className="h-full w-4" />}
                size="sm"
                type="submit"
                variant="secondary"
              />
            </Form>
          </Navbar>
        )}
      </header>
      <main className="flex h-full min-h-screen justify-center pt-16">
        {children}
      </main>
    </>
  )
}
