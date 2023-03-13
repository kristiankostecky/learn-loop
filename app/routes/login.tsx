import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { Button } from '~/components/button'
import { Checkbox, Input } from '~/components/input'
import { Label } from '~/components/label'
import { createUserSession, login } from '~/utils/session.server'
import { checkbox, keysFromZodObject } from '~/utils/validation'

const PASSWORD_MIN_LENGTH = 6
const EMAIL_MIN_LENGTH = 5

const LoginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(
      EMAIL_MIN_LENGTH,
      `Email must be at least ${EMAIL_MIN_LENGTH} characters`
    )
    .trim(),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
    ),
  'remember-me': checkbox(),
})

const fields = keysFromZodObject(LoginSchema)

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
    '/',
    userCredentials.data[fields['remember-me']]
  )
}

export default function Login() {
  const actionData = useActionData<typeof action>()
  const transition = useNavigation()
  const isSubmitting = transition.state === 'submitting'

  return (
    <div className="flex h-full bg-slate-50">
      <div className="mx-auto my-auto w-full max-w-md rounded-md p-4">
        <h1 className="mb-8 text-center text-2xl font-medium">
          Sign in to Learn Loop
        </h1>
        <Form aria-disabled="true" method="post">
          <div className="-space-y-px rounded-md shadow-sm">
            <Label
              aria-readonly={isSubmitting}
              className="sr-only"
              htmlFor={fields.email}
            >
              Email
            </Label>
            <Input
              autoComplete="email"
              className="rounded-b-none"
              disabled={isSubmitting}
              id={fields.email}
              minLength={EMAIL_MIN_LENGTH}
              name={fields.email}
              placeholder="Email"
              required
              type="text"
            />
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
              minLength={PASSWORD_MIN_LENGTH}
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
            Login
          </Button>
        </Form>
      </div>
    </div>
  )
}
