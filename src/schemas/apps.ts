import { z } from 'zod'

const BaseAppSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  uuid: z.string(),
  status: z.enum(['0', '1']).optional(),
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

export const BaseActionSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty' }).max(255),
  description: z.string().min(1, { message: 'Description cannot be empty' }),
  meta: z.object({
    redirectTo: z.string().url({ message: 'Please enter a valid URL' }),
  }),
})
const AddAppSchema = BaseActionSchema.extend({
  type: z.literal('add'),
})
const EditAppSchema = BaseActionSchema.extend({
  id: z.number(),
  type: z.literal('edit'),
})
export const AppActionSchema = z.union([AddAppSchema, EditAppSchema])

export const ChangeStatusSchema = z.object({
  appId: z.number(),
  status: z.enum(['0', '1']),
})
export const DeleteAppSchema = z.object({
  appId: z.number(),
})
