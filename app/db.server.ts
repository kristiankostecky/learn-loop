import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var __db__: PrismaClient
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
}
if (!global.__db__) {
  global.__db__ = new PrismaClient()
}
prisma = global.__db__
void prisma.$connect()

export { prisma }
