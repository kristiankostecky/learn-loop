import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { BottomBar } from '~/components/BottomBar'
import { Button } from '~/components/Button'
import { ROUTES } from '~/constants'
import { prisma } from '~/db.server'
import { requireUserId } from '~/utils/session.server'

const ParamsSchema = z.object({
  deck: z.string(),
})

export async function loader({ params, request }: LoaderArgs) {
  const userId = await requireUserId(request)

  const { deck: id } = zx.parseParams(params, ParamsSchema)
  const deck = await prisma.deck.findFirstOrThrow({
    select: {
      description: true,
      id: true,
      name: true,
    },
    where: { id, userId },
  })

  const cards = await prisma.card.aggregate({
    _count: true,
    where: { deckId: deck.id },
  })

  return { deck: { ...deck, cardsCount: cards._count } }
}

export const handle = {
  heading: (data: Awaited<ReturnType<typeof loader>>) => (
    <h1 className="text-center text-xl font-bold">{data.deck.name}</h1>
  ),
}

export default function Deck() {
  const { deck } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="m-auto pb-32 text-center">
        <p className="mb-2 text-lg font-bold">{deck.cardsCount} cards</p>
        <p>{deck.description}</p>
      </div>

      <BottomBar>
        <Button
          as={Link}
          className="block w-full"
          to={ROUTES.APP.DECKS.CARDS(deck.id)}
          variant="secondary"
        >
          See all cards
        </Button>
        <Button className="mt-4 w-full">Start Quiz</Button>
      </BottomBar>
    </>
  )
}
