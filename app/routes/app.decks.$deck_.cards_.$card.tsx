import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { BottomBar } from '~/components/BottomBar'
import { Button } from '~/components/Button'
import { Disclosure } from '~/components/Disclosure'
import { ROUTES } from '~/constants'
import { prisma } from '~/db.server'
import { requireUserId } from '~/utils/session.server'

const ParamsSchema = z.object({
  card: z.string(),
  deck: z.string(),
})

export async function loader({ params, request }: LoaderArgs) {
  await requireUserId(request)

  const { card: cardId } = zx.parseParams(params, ParamsSchema)
  const card = await prisma.card.findFirstOrThrow({
    select: {
      answer: true,
      deck: { select: { id: true, name: true } },
      id: true,
      question: true,
    },
    where: { id: cardId },
  })

  return { card }
}

export const handle = {
  heading: (data: Awaited<ReturnType<typeof loader>>) => (
    <h1 className="text-center text-xl font-bold">{data.card.deck.name}</h1>
  ),
}

export default function Deck() {
  const { card } = useLoaderData<typeof loader>()
  return (
    <>
      <div className="flex h-full flex-col items-center  pb-20">
        <Disclosure as="div" className="w-full" defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="disclosure-btn bg-white">
                <span className="w-full text-center text-lg">Question</span>
                <Disclosure.Icon isOpen={open} />
              </Disclosure.Button>
              <Disclosure.Panel className="disclosure-panel text-justify">
                {card.question}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-6 w-full">
          {({ open }) => (
            <>
              <Disclosure.Button className="disclosure-btn bg-white">
                <span className="w-full text-center text-lg">Answer</span>
                <Disclosure.Icon isOpen={open} />
              </Disclosure.Button>
              <Disclosure.Panel className="disclosure-panel text-justify">
                {card.answer}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      <BottomBar>
        <Button
          as={Link}
          className="w-full"
          to={ROUTES.APP.DECKS.EDIT_CARD(card.deck.id, card.id)}
        >
          Edit card
        </Button>
      </BottomBar>
    </>
  )
}
