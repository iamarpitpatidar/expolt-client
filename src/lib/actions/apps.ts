'use server'

import { z } from 'zod'
import { apiFetch } from '@lib/utils'
import { auth } from '@/auth'
import {
  App,
  AppSchema,
  AppActionSchema,
  DeleteAppSchema,
  ChangeStatusSchema,
} from '@/schemas/apps'
import { revalidateTag } from 'next/cache'

export const getAdminApps = async (): Promise<App[]> => {
  const session = await auth()
  const res = await apiFetch<App[]>(`${process.env.API_URL}/apps`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
    next: { tags: ['adminApps'] },
  })

  const { response, error } = res
  if (error || !response?.data) {
    throw new Error(error?.message ?? 'Failed to fetch apps')
  }

  return z.array(AppSchema).parse(response.data)
}

export const getApps = async (): Promise<App[]> => {
  const session = await auth()
  const res = await apiFetch<App[]>(`${process.env.API_URL}/apps/list`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
    next: { tags: ['apps'] },
  })

  const { response, error } = res
  if (error || !response?.data) {
    throw new Error(error?.message ?? 'Failed to fetch apps')
  }

  return z.array(AppSchema).parse(response.data)
}

export const createApp = async (data: z.infer<typeof AppActionSchema>) => {
  const validatedFields = AppActionSchema.safeParse(data)
  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message)
  }
  if (validatedFields.data.type !== 'add') {
    throw new Error('Type must be set to "add"')
  }

  const session = await auth()
  const { response, error } = await apiFetch<App>(
    `${process.env.API_URL}/apps`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${session?.user.token}` },
      body: JSON.stringify(validatedFields.data),
    },
  )

  if (!error) {
    revalidateTag('adminApps')
    revalidateTag('apps')
  }
  return { response, error }
}

export const updateApp = async (data: z.infer<typeof AppActionSchema>) => {
  const validatedFields = AppActionSchema.safeParse(data)
  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message)
  }
  if (validatedFields.data.type !== 'edit') {
    throw new Error('Type must be set to "edit"')
  }

  const session = await auth()
  const { id, ...values } = validatedFields.data
  const { response, error } = await apiFetch<App>(
    `${process.env.API_URL}/apps/${id}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${session?.user.token}` },
      body: JSON.stringify(values),
    },
  )

  if (!error) {
    revalidateTag('adminApps')
    revalidateTag('apps')
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
  const { response, error } = await apiFetch<App>(
    `${process.env.API_URL}/apps/${validatedFields.data.appId}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${session?.user.token}` },
      body: JSON.stringify({ status: validatedFields.data.status }),
    },
  )

  if (!error) {
    revalidateTag('adminApps')
    revalidateTag('apps')
  }
  return { response, error }
}

export const deleteApp = async (data: z.infer<typeof DeleteAppSchema>) => {
  const validatedFields = DeleteAppSchema.safeParse(data)
  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors[0].message)
  }

  const session = await auth()
  const { response, error } = await apiFetch<App>(
    `${process.env.API_URL}/apps/${validatedFields.data.appId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session?.user.token}` },
    },
  )

  if (!error) {
    revalidateTag('adminApps')
    revalidateTag('apps')
  }
  return { response, error }
}
