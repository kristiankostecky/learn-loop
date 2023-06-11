import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { BottomBar } from '~/components/BottomBar'
import { Button } from '~/components/Button'
import { Card } from '~/components/Card'
import { LinkBox, LinkOverlay } from '~/components/Link'
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
      cards: { select: { answer: true, id: true, question: true } },
      id: true,
      name: true,
    },
    where: { id, userId },
  })

  return { deck }
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
      <div className="grid grid-cols-1 gap-2 pb-20">
        {deck.cards.map((card) => {
          return (
            <LinkBox key={card.id} as={Card}>
              <LinkOverlay to={ROUTES.APP.DECKS.CARD(deck.id, card.id)}>
                <Card.Title>{card.question}</Card.Title>
              </LinkOverlay>
              <Card.Body>{card.answer}</Card.Body>
            </LinkBox>
          )
        })}
      </div>
      <BottomBar>
        <Button
          as={Link}
          className="w-full"
          to={ROUTES.APP.DECKS.NEW_CARD(deck.id)}
        >
          Create new card
        </Button>
      </BottomBar>
    </>
  )
}
