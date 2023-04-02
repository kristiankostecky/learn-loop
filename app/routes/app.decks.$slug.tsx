import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { Button, IconButton } from '~/components/Button'
import { Container } from '~/components/Container'
import { Layout } from '~/components/Layout'
import { Navbar } from '~/components/Navbar'
import { prisma } from '~/db.server'
import { requireUserId } from '~/utils/session.server'

const ParamsSchema = z.object({
  slug: z.string(),
})

export async function loader({ params, request }: LoaderArgs) {
  const userId = await requireUserId(request)

  const { slug } = zx.parseParams(params, ParamsSchema)
  const deck = await prisma.deck.findFirstOrThrow({
    select: {
      description: true,
      id: true,
      name: true,
    },
    where: { slug, userId },
  })

  const cards = await prisma.card.aggregate({
    _count: true,
    where: { deckId: deck.id },
  })

  return { deck: { ...deck, cardsCount: cards._count } }
}

export default function Deck() {
  const { deck } = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
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
          <h1 className="text-center text-xl font-bold">{deck.name}</h1>
        </Navbar>
      }
    >
      <Container h-full>
        <div className="m-auto text-center">
          <p className="mb-2 text-lg font-bold">{deck.cardsCount} cards</p>
          <p>{deck.description}</p>
        </div>

        <div className="-mx-4">
          <div className="border-t border-slate-100 px-4 pt-4">
            <Button className="w-full" variant="secondary">
              See all cards
            </Button>
            <Button className="mt-4 w-full">Start Quiz</Button>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
