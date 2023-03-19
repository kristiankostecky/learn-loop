type ActionDataError<TField extends string = string> =
  | Partial<Record<TField, Array<string> | undefined>>
  | string
  | undefined

export const getActionDataError = <
  TActionDataFields extends string,
  TField extends TActionDataFields
>(
  actionData: { error: ActionDataError<TActionDataFields> } | undefined,
  field?: TField
) => {
  if (typeof actionData?.error === 'string' && !field) {
    return actionData.error
  }
  if (typeof actionData?.error === 'object') {
    return actionData.error[field]?.join(', ')
  }
  return undefined
}
