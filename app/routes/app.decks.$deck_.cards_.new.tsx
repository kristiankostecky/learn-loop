import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData, useNavigation } from '@remix-run/react'
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
  deck: z.string(),
})

const NewCardSchema = z.object({
  answer: z.string(),
  question: z.string(),
})

const fields = keysFromZodObject(NewCardSchema)

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

export async function action({ params, request }: ActionArgs) {
  const userId = await requireUserId(request)
  const { deck: id } = zx.parseParams(params, ParamsSchema)

  const cardBody = await zx.parseFormSafe(request, NewCardSchema)

  if (!cardBody.success) {
    const errors = cardBody.error.formErrors.fieldErrors
    return json({ error: errors }, { status: 400 })
  }
  const deck = await prisma.deck.findFirstOrThrow({
    select: { id: true },
    where: { id, userId },
  })

  await prisma.card.create({
    data: {
      answer: cardBody.data.answer,
      deck: { connect: { id: deck.id } },
      question: cardBody.data.question,
    },
  })

  return redirect(ROUTES.APP.DECKS.CARDS(id))
}

export const handle = {
  heading: (data: Awaited<ReturnType<typeof loader>>) => (
    <h1 className="text-center text-xl font-bold">{data.deck.name}</h1>
  ),
}

export default function NewCard() {
  const actionData = useActionData<typeof action>()
  const transition = useNavigation()
  const isSubmitting = transition.state === 'submitting'

  return (
    <>
      <div className="h-full pb-20">
        <CardForm
          errors={{
            answer: getActionDataError(actionData, fields.answer),
            question: getActionDataError(actionData, fields.question),
          }}
          fields={fields}
          isSubmitting={isSubmitting}
        />
      </div>
      <BottomBar>
        <Button className="w-full" form={CardForm.formId} type="submit">
          Create new card
        </Button>
      </BottomBar>
    </>
  )
}
