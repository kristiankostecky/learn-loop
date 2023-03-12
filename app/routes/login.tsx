import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import { z } from 'zod'
import { zx } from 'zodix'
import { createUserSession, login } from '~/utils/session.server'

const PASSWORD_MIN_LENGTH = 6
const USERNAME_MIN_LENGTH = 1

const LoginSchema = z.object({
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
    ),
  username: z
    .string()
    .min(
      USERNAME_MIN_LENGTH,
      `Username must be at least ${USERNAME_MIN_LENGTH} characters`
    )
    .trim(),
})

export async function action({ request }: ActionArgs) {
  const userCredentials = await zx.parseFormSafe(request, LoginSchema)

  const errorResponse = json({ error: 'Wrong credentials' }, { status: 400 })

  if (!userCredentials.success) {
    return errorResponse
  }

  const user = await login(userCredentials.data)

  if (!user) {
    return errorResponse
  }

  return createUserSession(user.id, '/')
}

export default function Login() {
  const actionData = useActionData<typeof action>()
  const transition = useTransition()

  const isSubmitting = transition.state === 'submitting'
  return (
    <div className="flex h-screen">
      <div className="mx-auto my-auto max-w-md rounded-md bg-gray-100 p-4">
        <h1 className="text-lg">Welcome to Learn-Loop</h1>
        <Form
          aria-disabled="true"
          className="mt-2 flex flex-col gap-2"
          method="post"
        >
          <label
            aria-readonly={isSubmitting}
            className="flex flex-col"
            htmlFor="username"
          >
            Username
            <input
              className="read-only:bg-gray-300"
              id="username"
              minLength={USERNAME_MIN_LENGTH}
              name="username"
              placeholder="Username"
              readOnly={isSubmitting}
              required
              type="text"
            />
          </label>
          <label
            aria-readonly={isSubmitting}
            className="flex flex-col"
            htmlFor="password"
          >
            Password
            <input
              className="read-only:bg-gray-300"
              minLength={PASSWORD_MIN_LENGTH}
              name="password"
              placeholder="Password"
              readOnly={isSubmitting}
              required
              type="password"
            />
          </label>
          {actionData?.error && (
            <p className="text-red-500">{actionData.error}</p>
          )}
          <button
            className="mx-auto rounded-sm bg-gray-200 px-4 py-1 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            disabled={isSubmitting}
            type="submit"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  )
}
