import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const getDecks = (userId: string): Array<Prisma.DeckCreateArgs['data']> => {
  return [
    {
      cards: {
        create: [
          {
            answer: '48',
            question: 'What is the result of 8 multiplied by 6?',
          },
          {
            answer: '12',
            question: 'If you subtract 13 from 25, what is the result?',
          },
          { answer: '15', question: 'What is the sum of 2, 5, and 8?' },
        ],
      },
      description: 'Basic math operations',
      name: 'Math',
      userId,
    },
    {
      cards: {
        create: [
          {
            answer: 'Avocado',
            question: 'What is the main ingredient in guacamole?',
          },

          {
            answer: 'Spaghetti',
            question: 'What type of pasta has the shape of long, thin tubes?',
          },
          {
            answer: "Donburi or 'don' for short.",
            question:
              'What is the Japanese dish made of sushi rice and various toppings called?',
          },
        ],
      },
      description: 'Common foods from around the world',
      name: 'Food',
      userId,
    },
    {
      cards: {
        create: [
          {
            answer: 'Mount Kilimanjaro',
            question: 'What is the highest mountain in Africa?',
          },
          {
            answer: 'Vatican City',
            question:
              'Which country is both the smallest by land area and population?',
          },
          { answer: 'Lima', question: 'What is the capital of Peru?' },
        ],
      },
      description: 'Facts about the world',
      name: 'Geography',
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
    getDecks(user.id).map((deck) => {
      return prisma.deck.create({ data: deck })
    })
  )
}

void seed()
