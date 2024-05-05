import { z } from 'zod'

const BaseAppSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  uuid: z.string(),
})
const WebAppSchema = BaseAppSchema.extend({
  type: z.literal('web'),
  meta: z.object({
    background: z.string(),
    redirectTo: z.string(),
  }),
})
const VMAppSchema = BaseAppSchema.extend({
  type: z.literal('vm'),
  meta: z.object({
    background: z.string(),
  }),
})

export const AppSchema = z.union([WebAppSchema, VMAppSchema])

export type App = z.infer<typeof AppSchema>
