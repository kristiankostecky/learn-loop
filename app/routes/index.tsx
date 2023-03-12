import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '~/db.server'
import { requireUserId } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request)
  const cards = await prisma.card.findMany({
    select: { answer: true, question: true },
  })
  return { cards }
}

export default function Index() {
  const { cards } = useLoaderData<typeof loader>()
  return (
    <div className="mx-auto flex h-full max-w-2xl items-center justify-center ">
      <div className="rounded-xl border border-slate-100 bg-white px-16 py-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">Learning deck</h1>
        <div className="mx-auto max-w-lg">
          <div className="mb-2 flex justify-between border-b-2 ">
            <div className="mr-1 font-medium">Question</div>
            <div className="font-medium">Answer</div>
          </div>
          {cards.map((card) => (
            <div key={card.question} className="mb-2 flex justify-between ">
              <div className="mr-1">{card.question}</div>
              <div>{card.answer} </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
