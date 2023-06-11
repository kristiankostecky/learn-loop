import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { BottomBar } from '~/components/BottomBar'
import { Button } from '~/components/Button'
import { CardForm } from '~/components/forms/CardForm'
import { ROUTES } from '~/constants'
import { prisma } from '~/db.server'
import { getActionDataError } from '~/utils/remix'
import { requireUserId } from '~/utils/session.server'
import { keysFromZodObject } from '~/utils/validation'

const ParamsSchema = z.object({
  card: z.string(),
  deck: z.string(),
})

const EditCardSchema = z.object({
  answer: z.string(),
  question: z.string(),
})

const fields = keysFromZodObject(EditCardSchema)

export async function loader({ params, request }: LoaderArgs) {
  await requireUserId(request)

  const { card: cardId } = zx.parseParams(params, ParamsSchema)
  const card = await prisma.card.findFirstOrThrow({
    select: {
      answer: true,
      deck: { select: { name: true } },
      question: true,
    },
    where: { id: cardId },
  })

  return { card }
}

export async function action({ params, request }: ActionArgs) {
  await requireUserId(request)
  const { card: cardId, deck: deckId } = zx.parseParams(params, ParamsSchema)

  const cardBody = await zx.parseFormSafe(request, EditCardSchema)

  if (!cardBody.success) {
    const errors = cardBody.error.formErrors.fieldErrors
    return json({ error: errors }, { status: 400 })
  }

  await prisma.card.update({
    data: { answer: cardBody.data.answer, question: cardBody.data.question },
    where: { id: cardId },
  })

  return redirect(ROUTES.APP.DECKS.CARD(deckId, cardId))
}

export const handle = {
  heading: (data: Awaited<ReturnType<typeof loader>>) => (
    <h1 className="text-center text-xl font-bold">{data.card.deck.name}</h1>
  ),
}

export default function Deck() {
  const actionData = useActionData<typeof action>()
  const { card } = useLoaderData<typeof loader>()
  const transition = useNavigation()
  const isSubmitting = transition.state === 'submitting'
  return (
    <>
      <div className="h-full pb-20">
        <CardForm
          defaultValues={{ answer: card.answer, question: card.question }}
          errors={{
            answer: getActionDataError(actionData, fields.answer),
            question: getActionDataError(actionData, fields.question),
          }}
          fields={fields}
          isSubmitting={isSubmitting}
        />
      </div>

      <BottomBar>
        <Button
          className="w-full"
          form={CardForm.formId}
          type="submit"
          variant="secondary"
        >
          Update card
        </Button>
      </BottomBar>
    </>
  )
}
