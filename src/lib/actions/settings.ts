'use server'

import { auth } from '@/auth'
import { apiFetch } from '@lib/utils'
import { Settings, SettingSchema } from '@/schemas/settings'
import { revalidateTag } from 'next/cache'

export const getSettings = async () => {
  const session = await auth()
  const res = await apiFetch(`${process.env.API_URL}/settings`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
    next: { tags: ['settings'] },
  })

  const { response, error } = res
  if (error || !response?.data) {
    throw new Error(error?.message ?? 'Failed to fetch users')
  }

  return SettingSchema.parse(response.data)
}

export const updateSettings = async (data: Partial<Settings>) => {
  const session = await auth()
  const res = await apiFetch(`${process.env.API_URL}/settings`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${session?.user.token}` },
    body: JSON.stringify(data),
  })

  const { error } = res
  if (error) {
    return { success: 'error', message: 'Something went wrong' }
  }

  revalidateTag('settings')
  return { status: 'success', message: 'Settings updated Successfully.' }
}
