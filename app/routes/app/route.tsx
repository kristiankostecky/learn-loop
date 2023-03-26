import type { LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getUserIdFromSession } from '~/utils/session.server'
import { Navbar } from './Navbar'

export async function loader({ request }: LoaderArgs) {
  const { userId } = await getUserIdFromSession(request)
  return { isLoggedIn: Boolean(userId) }
}

export default function App() {
  const { isLoggedIn } = useLoaderData<typeof loader>()
  return (
    <>
      <header>
        <Navbar isLoggedIn={isLoggedIn} />
      </header>
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  )
}
