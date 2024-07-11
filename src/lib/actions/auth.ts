'use server'

import * as z from 'zod'
import { signOut, auth, signIn } from '@/auth'
import {
  ForgotPasswordSchema,
  LoginSchema,
  ResetPasswordSchema,
} from '@/schemas'
import { APIResponse } from '@lib/types'
import { DEFAULT_LOGOUT_REDIRECT } from '@/routes'
import { apiFetch } from '@lib/utils'
import { AuthError } from 'next-auth'

export const login = async (
  data: z.infer<typeof LoginSchema>,
): Promise<APIResponse> => {
  const validatedFields = LoginSchema.safeParse(data)
  if (!validatedFields.success) {
    return { status: 'error', message: validatedFields.error.errors[0].message }
  }

  const { email, password } = validatedFields.data
  try {
    await signIn('credentials', {
      email,
      password,
    })

    return { status: 'success', message: 'Login successfully' }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return {
          status: 'error',
          message: 'Username or Password incorrect!',
        }
      } else if (error.type === 'AccessDenied') {
        return { status: 'error', message: 'User is deactivated!' }
      } else {
        return { status: 'error', message: 'Something went wrong' }
      }
    }

    throw error
  }
}

export const sendPasswordResetMail = async (
  data: z.infer<typeof ForgotPasswordSchema>,
): Promise<APIResponse> => {
  const validatedFields = ForgotPasswordSchema.safeParse(data)
  if (!validatedFields.success) {
    return { status: 'error', message: validatedFields.error.errors[0].message }
  }

  const { email } = validatedFields.data
  const { error } = await apiFetch(
    `${process.env.API_URL}/auth/forgot-password`,
    { method: 'POST', body: JSON.stringify({ email }) },
  )
  if (error) {
    return { status: 'error', message: error.message }
  }

  return { status: 'success', message: 'Email sent successfully!' }
}

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
): Promise<APIResponse> => {
  const validatedFields = ResetPasswordSchema.safeParse(values)
  if (!validatedFields.success) {
    return { status: 'error', message: validatedFields.error.errors[0].message }
  }

  const { error } = await apiFetch(
    `${process.env.API_URL}/auth/reset-password`,
    { method: 'POST', body: JSON.stringify(validatedFields.data) },
  )
  if (error) {
    return { status: 'error', message: error.message }
  }

  return { status: 'success', message: 'Password reset successfully!' }
}

export const Logout = async () => {
  const session = await auth()
  if (!session) return

  await fetch(`${process.env.API_URL}/auth/logout`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.token}`,
    },
  })
  await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT })
}
