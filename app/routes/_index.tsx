import { Link } from '@remix-run/react'
import { ROUTES } from '~/constants'

export default function Index() {
  return (
    <>
      <header className="fixed top-0 flex h-14 w-full items-center bg-white px-4">
        <nav className="flex w-full justify-between">
          <Link className="text-black hover:no-underline" to={ROUTES.ROOT}>
            Learn Loop
          </Link>
          <Link to={ROUTES.LOGIN}>Login</Link>
        </nav>
      </header>
      <main className="mx-auto h-screen max-w-7xl px-4 pt-20 pb-16 text-center ">
        <div>
          <h1 className="text-center text-5xl font-bold">
            Master any subject with ease using our{' '}
            <span className="underline">spaced repetition</span> learning app
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Our app uses the scientifically-proven spaced repetition method to
            help you learn more efficiently and retain information for the
            long-term. With customizable flashcards and progress tracking, you
            can easily achieve your learning goals.
          </p>
        </div>
      </main>
    </>
  )
}
