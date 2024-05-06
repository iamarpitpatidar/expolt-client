'use server'

import { auth } from '@/auth'
import { apiFetch } from '@lib/utils'
import {
  User,
  UserSchema,
  UserActionSchema,
  DeleteUserSchema,
  ChangeStatusSchema,
} from '@/schemas/users'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'

export const getUsers = async () => {
  const session = await auth()
  const res = await apiFetch<User[]>(`${process.env.API_URL}/users`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
    next: { tags: ['users'] },
  })

  const { response, error } = res
  if (error || !response?.data) {
    throw new Error(error?.message ?? 'Failed to fetch users')
  }

  return z.array(UserSchema).parse(response.data)
}

export const createUser = async (data: z.infer<typeof UserActionSchema>) => {
  const validatedFields = UserActionSchema.safeParse(data)
  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message)
  }
  if (validatedFields.data.type !== 'add') {
    throw new Error('Type must be set to "add"')
  }

  const session = await auth()
  const { type, ...values } = validatedFields.data
  const { response, error } = await apiFetch<User>(
    `${process.env.API_URL}/users`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${session?.user.token}` },
      body: JSON.stringify(values),
    },
  )

  if (!error) {
    revalidateTag('users')
  }
  return { response, error }
}

export const updateUser = async (data: z.infer<typeof UserActionSchema>) => {
  const validatedFields = UserActionSchema.safeParse(data)
  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message)
  }
  if (validatedFields.data.type !== 'edit') {
    throw new Error('Type must be set to "add"')
  }

  const session = await auth()
  const { id, type, ...values } = validatedFields.data
  const { response, error } = await apiFetch<User>(
    `${process.env.API_URL}/users/${validatedFields.data.id}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${session?.user.token}` },
      body: JSON.stringify(values),
    },
  )

  if (!error) {
    revalidateTag('users')
  }
  return { response, error }
}

export const updateStatus = async (
  data: z.infer<typeof ChangeStatusSchema>,
) => {
  const validatedFields = ChangeStatusSchema.safeParse(data)
  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message)
  }

  const session = await auth()
  const { response, error } = await apiFetch<User>(
    `${process.env.API_URL}/users/${validatedFields.data.userId}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${session?.user.token}` },
      body: JSON.stringify({ status: validatedFields.data.status }),
    },
  )

  if (!error) {
    revalidateTag('users')
  }
  return { response, error }
}

export const deleteUser = async (data: z.infer<typeof DeleteUserSchema>) => {
  const validatedFields = DeleteUserSchema.safeParse(data)
  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message)
  }

  const session = await auth()
  const { response, error } = await apiFetch<User>(
    `${process.env.API_URL}/users/${validatedFields.data.userId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session?.user.token}` },
    },
  )

  if (!error) {
    revalidateTag('users')
  }
  return { response, error }
}
