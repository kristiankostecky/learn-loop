/**
 * Conditional function parameter type
 * When `TValue` extends  `TCondition` the function will have one optional parameter of type `TParameter`,
 * otherwise it will have one required parameter of type `TParameter`.
 * @example ConditionalFunctionParameter<T, 'email', number, string> // T === 'email' then (number?) => string otherwise (number) => string
 */
export type ConditionalFunctionParameter<
  TValue,
  TCondition,
  TParameter,
  ReturnType
> = (
  ...parameters: TValue extends TCondition ? [TParameter?] : [TParameter]
) => ReturnType
