'use server'

import { auth } from '@/auth'
import { apiFetch } from '@lib/utils'

export const getVMDetails = async (appId: string) => {
  const session = await auth()

  return await apiFetch<{ state: string; redirectTo: string }>(
    `${process.env.API_URL}/apps/${appId}/virtual-machine`,
    {
      headers: { Authorization: `Bearer ${session?.user.token}` },
      cache: 'no-cache',
    },
  )
}
