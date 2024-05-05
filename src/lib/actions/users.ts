'use server'

import { auth } from '@/auth'
import { apiFetch } from '@lib/utils'
import { User, UserSchema } from '@/schemas/users'
import { z } from 'zod'

export const getUsers = async () => {
  const session = await auth()
  const res = await apiFetch<User[]>(`${process.env.API_URL}/users`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  })

  const { response, error } = res
  if (error || !response?.data) {
    throw new Error(error?.message ?? 'Failed to fetch users')
  }

  return z.array(UserSchema).parse(response.data)
}
