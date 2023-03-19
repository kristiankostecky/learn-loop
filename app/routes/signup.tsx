import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Prisma } from '@prisma/client'
import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { Alert } from '~/components/alert'
import { Button } from '~/components/button'
import { FieldError, Input } from '~/components/input'
import { Label } from '~/components/label'
import { ROUTES } from '~/constants'
import { formatPrismaError } from '~/utils/prisma-errors.server'
import { getActionDataError } from '~/utils/remix'
import { createUserSession, signUp } from '~/utils/session.server'
import {
  keysFromZodObject,
  validationErrorMessage,
  validationRules,
} from '~/utils/validation'

const SignUpSchema = z.object({
  email: z
    .string()
    .email(validationErrorMessage('email').invalid)
    .min(
      validationRules.email.minLength,
      validationErrorMessage('email').minLength()
    )
    .trim(),
  password: z
    .string()
    .min(
      validationRules.password.minLength,
      validationErrorMessage('password').minLength()
    ),
  username: z
    .string()
    .min(
      validationRules.username.minLength,
      validationErrorMessage('username').minLength()
    ),
})

const fields = keysFromZodObject(SignUpSchema)

export async function action({ request }: ActionArgs) {
  const userCredentials = await zx.parseFormSafe(request, SignUpSchema)

  if (!userCredentials.success) {
    const errors = userCredentials.error.formErrors.fieldErrors
    return json({ error: errors }, { status: 400 })
  }

  try {
    const user = await signUp(userCredentials.data)
    return await createUserSession(user.id, '/', false)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = formatPrismaError<keyof typeof userCredentials>(error)
      return json({ error: prismaError }, { status: 409 })
    }
    return json(
      { error: 'Something went wrong, please try again' },
      { status: 409 }
    )
  }
}

export default function SignUp() {
  const actionData = useActionData<typeof action>()
  const transition = useNavigation()
  const [parent] = useAutoAnimate()
  const isSubmitting = transition.state === 'submitting'

  const fieldErrorNode = (field: keyof z.infer<typeof SignUpSchema>) => {
    const error = getActionDataError(actionData, field)
    return error ? <FieldError>{error}</FieldError> : null
  }
  const generalError = getActionDataError(actionData)

  return (
    <div className="flex h-full bg-slate-50">
      {generalError && <Alert message={generalError} />}
      <div className="mx-auto my-auto w-full max-w-md rounded-md p-4">
        <h1 className="mb-8 text-center text-2xl font-medium">
          Sign up to Learn Loop
        </h1>
        <Form method="post">
          <div ref={parent} className="-space-y-px rounded-md">
            <Label
              aria-readonly={isSubmitting}
              className="sr-only"
              htmlFor={fields.username}
            >
              Email
            </Label>
            <Input
              autoComplete="username"
              className="rounded-b-none"
              disabled={isSubmitting}
              id={fields.username}
              invalid={!!fieldErrorNode(fields.username)}
              minLength={validationRules.username.minLength}
              name={fields.username}
              placeholder="Username"
              required
              type="text"
            />
            {fieldErrorNode(fields.username)}
            <Label
              aria-readonly={isSubmitting}
              className="sr-only"
              htmlFor={fields.email}
            >
              Email
            </Label>
            <Input
              autoComplete="email"
              className="rounded-none"
              disabled={isSubmitting}
              id={fields.email}
              invalid={!!fieldErrorNode(fields.email)}
              minLength={validationRules.email.minLength}
              name={fields.email}
              placeholder="Email"
              required
              type="email"
            />
            {fieldErrorNode(fields.email)}
            <Label
              aria-readonly={isSubmitting}
              className="sr-only"
              htmlFor={fields.password}
            >
              Password
            </Label>
            <Input
              autoComplete="current-password"
              className="rounded-t-none"
              disabled={isSubmitting}
              id={fields.password}
              invalid={!!fieldErrorNode(fields.password)}
              minLength={validationRules.password.minLength}
              name={fields.password}
              placeholder="Password"
              required
              type="password"
            />
            {fieldErrorNode(fields.password)}
          </div>
          <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">
            Sign Up
          </Button>
          <div className="mt-6 flex w-full items-center justify-center text-sm text-slate-500">
            Already have an account?
            <Link
              className="ml-1 font-medium text-slate-900 hover:text-slate-600"
              to={ROUTES.LOGIN}
            >
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
