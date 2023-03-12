import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { Navbar } from './components/navbar'
import styles from './styles/app.css'
import { getSessionUserId } from './utils/session.server'

export const links = () => {
  return [{ href: styles, rel: 'stylesheet' }]
}

export async function loader({ request }: LoaderArgs) {
  const { userId } = await getSessionUserId(request)
  return { isLoggedIn: Boolean(userId) }
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  const { isLoggedIn } = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-50 text-slate-900">
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="h-screen pt-16">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
