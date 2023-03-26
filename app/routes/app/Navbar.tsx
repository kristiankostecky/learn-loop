import { Form, Link } from '@remix-run/react'
import { ROUTES } from '~/constants'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { Button } from '~/components/Button'

interface NavbarProps {
  isLoggedIn: boolean
}

export function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <nav className="fixed top-0 flex h-16 w-full flex-wrap items-center justify-between bg-gray-800 px-6 text-white">
      <Link className="text-white  hover:no-underline" to={ROUTES.ROOT}>
        Learn Loop
      </Link>
      {isLoggedIn && (
        <Form action={ROUTES.LOGOUT} method="post">
          <Button
            rightIcon={<ArrowRightOnRectangleIcon className="h-4 w-4" />}
            size="sm"
            type="submit"
            variant="secondary"
          >
            Logout
          </Button>
        </Form>
      )}
    </nav>
  )
}
