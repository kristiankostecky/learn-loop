import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const getCards = (userId: string): Array<Prisma.CardCreateArgs['data']> => {
  return [
    {
      answer: '118',
      question: 'How many elements are there in the periodic table',
      userId,
    },
    {
      answer: 'Saffron',
      question: 'What is the most expensive spice in the world?',
      userId,
    },
    {
      answer: `Vatican City`,
      question: 'What is the smallest country in the world?',
      userId,
    },
  ]
}

async function seed() {
  const hash = await bcrypt.hash('password', 10)
  const user = await prisma.user.create({
    data: {
      email: 'john@doe.com',
      password: { create: { hash } },
      username: 'john',
    },
  })

  await Promise.all(
    getCards(user.id).map((card) => {
      return prisma.card.create({ data: card })
    })
  )
}

void seed()
