import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { LinkBox, LinkOverlay } from '~/components/Link'
import { prisma } from '~/db.server'
import { requireUserId } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request)
  const decks = await prisma.deck.findMany({
    select: { description: true, name: true },
    where: { userId },
  })

  return { decks }
}

export default function AppIndex() {
  const { decks } = useLoaderData<typeof loader>()

  return (
    <div className="grid auto-rows-fr grid-cols-2 gap-2 py-4 px-2">
      {decks.map((deck) => {
        return (
          <LinkBox
            key={deck.name}
            className="rounded-md border border-slate-200 bg-white p-4 text-center shadow-sm"
          >
            <h2 className="font-medium">
              <LinkOverlay to="/">{deck.name}</LinkOverlay>
            </h2>
            {deck.description && (
              <p className="text-sm text-slate-600">{deck.description}</p>
            )}
          </LinkBox>
        )
      })}
    </div>
  )
}
