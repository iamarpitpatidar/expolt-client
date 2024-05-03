import { apiFetch } from '@lib/utils'
import { APIResponse } from '@lib/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return Response.json({
      status: 'error',
      message: 'No token found',
    })
  }

  const res = await apiFetch<APIResponse>(`${process.env.API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const { response, error } = res
  if (error) {
    throw new Error(error.message)
  }
  return Response.json({
    status: 'success',
    data: response?.data,
  })
}
