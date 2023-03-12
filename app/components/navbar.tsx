import { Form, Link } from '@remix-run/react'
import { ROUTES } from '~/constants'

export function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-6 text-white">
      <Link className="text-white  hover:no-underline" to={ROUTES.ROOT}>
        Learn Loop
      </Link>
      <Form action={ROUTES.LOGOUT} method="post">
        <button type="submit">Logout</button>
      </Form>
    </nav>
  )
}
