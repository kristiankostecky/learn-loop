import { Link } from '@remix-run/react'
import { Container } from '~/components/Container'
import { Layout } from '~/components/Layout'
import { Navbar } from '~/components/Navbar'
import { ROUTES } from '~/constants'

export default function Index() {
  return (
    <Layout
      renderNavbar={
        <Navbar>
          <Link className="text-black hover:no-underline" to={ROUTES.ROOT}>
            Learn Loop
          </Link>
          <Link to={ROUTES.LOGIN}>Login</Link>
        </Navbar>
      }
    >
      <Container className="pb-16 pt-24 text-center">
        <div>
          <h1 className="text-center text-5xl font-bold">
            Master any subject with ease using{' '}
            <span className="block animate-[wiggle_1s_ease-in-out_infinite]">
              spaced repetition
            </span>{' '}
            learning
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Our app uses the scientifically-proven spaced repetition method to
            help you learn more efficiently and retain information for the
            long-term. With customizable flashcards and progress tracking, you
            can easily achieve your learning goals.
          </p>
        </div>
      </Container>
    </Layout>
  )
}
