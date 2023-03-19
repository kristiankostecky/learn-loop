import type { Prisma } from '@prisma/client'
import { PrismaQueryError } from 'prisma/errors'

export const formatPrismaError = <TField extends string>(
  error: Prisma.PrismaClientKnownRequestError,
  fieldName?: Record<TField, string>
) => {
  if (error.code === PrismaQueryError.UniqueConstraintViolation) {
    const errorOnField = (error.meta?.target as [string])[0] as TField
    return {
      [errorOnField]: [
        `Already taken. Please choose another ${
          fieldName?.[errorOnField] ?? errorOnField
        }.`,
      ],
    } as Partial<Record<TField, Array<string>>>
  }
  return 'Unknown error'
}
