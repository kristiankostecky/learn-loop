import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
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

  const { deck: slug } = zx.parseParams(params, ParamsSchema)
  const deck = await prisma.deck.findFirstOrThrow({
    select: {
      cards: { select: { answer: true, question: true, slug: true } },
      name: true,
      slug: true,
    },
    where: { slug, userId },
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
            <LinkBox key={card.slug} as={Card}>
              <LinkOverlay to={ROUTES.APP.DECKS.CARD(deck.slug, card.slug)}>
                <Card.Title>{card.question}</Card.Title>
              </LinkOverlay>
              <Card.Body>{card.answer}</Card.Body>
            </LinkBox>
          )
        })}
      </div>
      <BottomBar>
        <Button className="w-full">Create new card</Button>
      </BottomBar>
    </>
  )
}
