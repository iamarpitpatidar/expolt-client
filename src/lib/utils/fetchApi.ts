import { APIResponse, FetchResponse } from '@lib/types'
import { signOut } from '@/auth'

export const apiFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<FetchResponse<T>> => {
  try {
    const apiOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    }
    const res = await fetch(url, apiOptions)
    const status = res.status

    if (status === 401) {
      await signOut()
    }
    const json: APIResponse<T> = await res.json()
    if (json.status === 'success') {
      return {
        response: { data: json.data ?? null, message: json.message },
        error: null,
      }
    } else {
      return {
        response: null,
        error: { message: json.message, errors: json.errors },
      }
    }
  } catch (err: any) {
    return { response: null, error: { message: err.message } }
  }
}
