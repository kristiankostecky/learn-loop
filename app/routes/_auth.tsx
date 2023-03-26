import { Outlet } from '@remix-run/react'

export default function AuthLayout() {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}
