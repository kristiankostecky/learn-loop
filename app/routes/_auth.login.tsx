import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { Button } from '~/components/Button'
import { Checkbox, Input } from '~/components/Input'
import { Label } from '~/components/Label'
import { ROUTES } from '~/constants'

import {
  createUserSession,
  getUserIdFromSession,
  login,
} from '~/utils/session.server'
import {
  checkbox,
  keysFromZodObject,
  validationErrorMessage,
  validationRules,
} from '~/utils/validation'

const LoginSchema = z.object({
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
  'remember-me': checkbox(),
})

const fields = keysFromZodObject(LoginSchema)

export const loader = async ({ request }: LoaderArgs) => {
  const { userId } = await getUserIdFromSession(request)
  if (userId) {
    return redirect(ROUTES.APP.ROOT)
  }
  return null
}

export async function action({ request }: ActionArgs) {
  const errorResponse = json({ error: 'Wrong credentials' }, { status: 400 })

  const userCredentials = await zx.parseFormSafe(request, LoginSchema)
  if (!userCredentials.success) {
    return errorResponse
  }

  const user = await login(userCredentials.data)
  if (!user) {
    return errorResponse
  }

  return createUserSession(
    user.id,
    ROUTES.APP.ROOT,
    userCredentials.data[fields['remember-me']]
  )
}

export default function Login() {
  const actionData = useActionData<typeof action>()
  const transition = useNavigation()
  const isSubmitting = transition.state === 'submitting'

  return (
    <div className="flex h-screen">
      <div className="mx-auto my-auto w-full max-w-md rounded-md p-4">
        <h1 className="mb-8 text-center text-2xl font-medium">
          <span className="font-bold">Log in</span> to Learn Loop
        </h1>
        <Form method="post">
          <div className="-space-y-px rounded-md shadow-sm">
            <Label className="sr-only" htmlFor={fields.email}>
              Email
            </Label>
            <Input
              autoComplete="email"
              className="rounded-b-none"
              disabled={isSubmitting}
              id={fields.email}
              minLength={validationRules.email.minLength}
              name={fields.email}
              placeholder="Email"
              required
              type="email"
            />
            <Label className="sr-only" htmlFor={fields.password}>
              Password
            </Label>
            <Input
              autoComplete="current-password"
              className="rounded-t-none"
              disabled={isSubmitting}
              id={fields.password}
              minLength={validationRules.password.minLength}
              name={fields.password}
              placeholder="Password"
              required
              type="password"
            />
          </div>
          {actionData?.error && (
            <p className="mt-2 text-xs text-red-500">{actionData.error}</p>
          )}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id={fields['remember-me']}
                name={fields['remember-me']}
                type="checkbox"
              />
              <Label className="ml-2 text-sm" htmlFor={fields['remember-me']}>
                Remember me
              </Label>
            </div>
            <div className="text-sm">
              <Link
                className="font-medium text-slate-600 hover:text-slate-500"
                to="/"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">
            Log in
          </Button>
        </Form>
        <div className="mt-6 flex w-full items-center justify-center text-sm text-slate-500">
          Don&apos;t have an account?
          <Link
            className="ml-1 font-medium text-slate-900 hover:text-slate-600"
            to={ROUTES.SIGNUP}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
