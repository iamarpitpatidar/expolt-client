export type APIError = Record<string, string[]>

interface SuccessResponse<T> {
  status: 'success'
  message: string
  data?: T
}
interface ErrorResponse {
  status: 'error'
  message: string
  errors?: APIError
}

export type APIResponse<T = never> = SuccessResponse<T> | ErrorResponse

export type FetchResponse<T = never> =
  | {
      response: {
        data: T | null
        message: string
      }
      error: null
    }
  | {
      response: null
      error: { message: string; errors?: APIError }
    }
