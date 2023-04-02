import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { Outlet, useLocation, useMatches, useNavigate } from '@remix-run/react'
import { IconButton } from '~/components/Button'
import { Container } from '~/components/Container'
import { Layout } from '~/components/Layout'
import { Navbar } from '~/components/Navbar'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const goBack = () => navigate(-1)
  const matches = useMatches()
  const match = matches.find((item) => item.pathname === location.pathname)

  return (
    <Layout
      renderNavbar={
        <Navbar className="grid grid-cols-3">
          <IconButton
            aria-label="Go back"
            className="mr-auto"
            icon={<ArrowLeftIcon className="h-4 w-4" />}
            onClick={goBack}
            variant="ghost"
          />
          {match && match.handle && match.handle.heading(match.data)}
        </Navbar>
      }
    >
      <Container h-full>
        <Outlet />
      </Container>
    </Layout>
  )
}
