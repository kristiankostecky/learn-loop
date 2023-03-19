import { capitalize } from '../helpers'
import type { ConditionalFunctionParameter } from '../types'
import { validationRules } from './constants'

type ValidationRulesKeys = keyof typeof validationRules

const minLength: <TField extends string | ValidationRulesKeys>(
  field: TField | ValidationRulesKeys
) => ConditionalFunctionParameter<
  TField,
  ValidationRulesKeys,
  number,
  string
> = (field) => (length) => {
  const message = (fieldLength: number) =>
    `${capitalize(field)} must be at least ${fieldLength} characters long`

  if (!length) {
    if (field in validationRules) {
      const validationRulesMinLength =
        validationRules[field as ValidationRulesKeys].minLength
      return message(validationRulesMinLength)
    }
    throw new Error('Min length has to be provided')
  }
  return message(length)
}

const invalid = (field: string) => {
  return `${capitalize(field)} is invalid`
}

export const validationErrorMessage = <T extends string | ValidationRulesKeys>(
  field: T | ValidationRulesKeys
) => {
  return {
    invalid: invalid(field),
    minLength: minLength(field),
  }
}
