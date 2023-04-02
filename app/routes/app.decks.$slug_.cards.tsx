import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { BottomBar } from '~/components/BottomBar'
import { Button } from '~/components/Button'
import { Card } from '~/components/Card'
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
      cards: { select: { answer: true, question: true, slug: true } },
      name: true,
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
      <div className="grid grid-cols-1 gap-2">
        {deck.cards.map((card) => {
          return (
            <Card key={card.slug}>
              <Card.Title>{card.question}</Card.Title>
              <Card.Body>{card.answer}</Card.Body>
            </Card>
          )
        })}
      </div>
      <BottomBar className="mt-auto">
        <Button className="w-full">Create new card</Button>
      </BottomBar>
    </>
  )
}
