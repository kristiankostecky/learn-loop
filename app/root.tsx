import type { V2_MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from './styles/app.css'

export const links = () => {
  return [
    { href: styles, rel: 'stylesheet' },
    {
      as: 'font',
      crossOrigin: 'anonymous',
      href: '/fonts/quicksand/quicksand-v30-latin-regular.woff2',
      rel: 'preload',
      type: 'font/woff2',
    },
    {
      as: 'font',
      crossOrigin: 'anonymous',
      href: '/fonts/quicksand/quicksand-v30-latin-600.woff2',
      rel: 'preload',
      type: 'font/woff2',
    },
  ]
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Learn Loop' },
    { charset: 'utf-8' },
    { viewport: 'width=device-width,initial-scale=1' },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-quicksand">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
