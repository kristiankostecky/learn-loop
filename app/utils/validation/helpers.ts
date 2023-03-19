import type { ZodObject, ZodRawShape } from 'zod'
import { z } from 'zod'

export function keysFromZodObject<T extends ZodObject<ZodRawShape>>(schema: T) {
  return Object.fromEntries(
    Object.keys(schema.shape).map((key) => {
      return [key, key]
    })
  ) as { [K in keyof T['shape']]: K }
}

/**
 * For HTML `<input type="checkbox"/>` default value is set to "on" by default.
 * When checkbox is not checked, the value won't be sent to the server and will be `undefined`.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
 */
export function checkbox({
  checkedValue = 'on',
  uncheckedValue = undefined,
}: {
  checkedValue?: 'on' | string
  uncheckedValue?: string | undefined
} = {}) {
  return z.union([
    z.literal(checkedValue).transform(() => true),
    z.literal(uncheckedValue).transform(() => false),
  ])
}
