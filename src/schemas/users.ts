import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum(['admin', 'user']),
  status: z.enum(['0', '1']).optional(),
})

export type User = z.infer<typeof UserSchema>
