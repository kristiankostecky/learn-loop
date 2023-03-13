import type {
  CookieSerializeOptions,
  SessionIdStorageStrategy,
} from '@remix-run/node'
import { createCookieSessionStorage, redirect } from '@remix-run/node'
import bcrypt from 'bcrypt'
import { ROUTES } from '~/constants'
import { prisma } from '~/db.server'

const { SESSION_SECRET } = process.env

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not set')
}

const SESSION_USER_ID = 'userId'
const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 7, // one week
  name: 'learn_loop_session',
  path: '/',
  secrets: [SESSION_SECRET],
  secure: true,
} satisfies CookieSerializeOptions & SessionIdStorageStrategy['cookie']

export async function login({
  password,
  username,
}: {
  password: string
  username: string
}) {
  const userWithPassword = await prisma.user.findUnique({
    include: { password: true },
    where: { username },
  })
  if (!userWithPassword || !userWithPassword.password?.hash) {
    return null
  }
  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)
  if (!isValid) {
    return null
  }

  const { password: _password, ...user } = userWithPassword
  return user
}

export const storage = createCookieSessionStorage({
  cookie: COOKIE_OPTIONS,
})

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'))
  return redirect(ROUTES.ROOT, {
    headers: { 'Set-Cookie': await storage.destroySession(session) },
  })
}

export async function createUserSession(
  userId: string,
  redirectTo: string,
  remember = false
) {
  const session = await storage.getSession()
  session.set(SESSION_USER_ID, userId)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session, {
        maxAge: remember ? COOKIE_OPTIONS.maxAge : undefined,
      }),
    },
  })
}

export async function getUserIdFromSession(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'))
  const userId: string = session.get(SESSION_USER_ID)

  return { userId }
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const { userId } = await getUserIdFromSession(request)
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])

    throw redirect(`${ROUTES.LOGIN}?${searchParams.toString()}`)
  }
  return userId
}
