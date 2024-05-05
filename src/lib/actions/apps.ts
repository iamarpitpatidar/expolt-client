'use server'

import { z } from 'zod'
import { apiFetch } from '@lib/utils'
import { auth } from '@/auth'
import { App, AppSchema } from '@/schemas/apps'

export const getAdminApps = async (): Promise<App[]> => {
  const session = await auth()
  if (!session?.user.token) throw new Error('Unauthorized')

  const res = await apiFetch<App[]>(`${process.env.API_URL}/apps`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  })

  const { response, error } = res
  if (error || !response?.data) {
    throw new Error(error?.message ?? 'Failed to fetch apps')
  }

  return z.array(AppSchema).parse(response.data)
}

export const getApps = async (): Promise<App[]> => {
  const session = await auth()
  if (!session?.user.token) throw new Error('Unauthorized')

  const res = await apiFetch<App[]>(`${process.env.API_URL}/apps/list`, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  })

  const { response, error } = res
  if (error || !response?.data) {
    throw new Error(error?.message ?? 'Failed to fetch apps')
  }

  return z.array(AppSchema).parse(response.data)
}
