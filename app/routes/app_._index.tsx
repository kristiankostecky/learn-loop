import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Card } from '~/components/Card'
import { Container } from '~/components/Container'
import { Layout } from '~/components/Layout'
import { LinkBox, LinkOverlay } from '~/components/Link'
import { ROUTES } from '~/constants'
import { prisma } from '~/db.server'
import { requireUserId } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request)
  const decks = await prisma.deck.findMany({
    select: { description: true, name: true, slug: true },
    where: { userId },
  })

  return { decks }
}

export default function AppIndex() {
  const { decks } = useLoaderData<typeof loader>()

  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-1 gap-2">
          {decks.map((deck) => {
            return (
              <LinkBox key={deck.slug} as={Card} className="">
                <h2 className="font-medium">
                  <LinkOverlay to={ROUTES.APP.DECKS.DECK(deck.slug)}>
                    {deck.name}
                  </LinkOverlay>
                </h2>
                {deck.description && (
                  <p className="text-sm text-slate-600">{deck.description}</p>
                )}
              </LinkBox>
            )
          })}
        </div>
      </Container>
    </Layout>
  )
}
