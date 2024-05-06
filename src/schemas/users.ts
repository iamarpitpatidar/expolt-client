import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum(['admin', 'user']),
  status: z.enum(['0', '1']).optional(),
})

export type User = z.infer<typeof UserSchema>

const BaseActionSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty' }).max(255),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.enum(['admin', 'user']),
})
const AddUserSchema = BaseActionSchema.extend({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  type: z.literal('add'),
})
const EditUserSchema = BaseActionSchema.extend({
  id: z.number(),
  password: z.string().optional(),
  type: z.literal('edit'),
})
export const UserActionSchema = z.union([AddUserSchema, EditUserSchema])

export const ChangeStatusSchema = z.object({
  userId: z.number(),
  status: z.enum(['0', '1']),
})

export const DeleteUserSchema = z.object({
  userId: z.number(),
})
