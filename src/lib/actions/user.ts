'use server'

import { apiFetch } from '@lib/utils'
import { APIResponse } from '@lib/types'

export const getLoggedInUser = async (token: string) => {
  const res = await apiFetch<APIResponse>(`${process.env.API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const { response, error } = res
  if (error) {
    throw new Error(error.message)
  }

  return response.data
}
