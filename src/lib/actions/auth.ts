'use server'

import * as z from 'zod'
import { signIn, signOut } from '@/auth'
import { LoginSchema } from '@/schemas'
import { APIResponse } from '@lib/types'
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_LOGOUT_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string,
): Promise<APIResponse> => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { status: 'error', message: validatedFields.error.errors[0].message }
  }

  const { email, password } = validatedFields.data
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl ? atob(callbackUrl) : DEFAULT_LOGIN_REDIRECT,
    })

    return { status: 'success', message: 'Login successfully' }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { status: 'error', message: 'Username or Password incorrect!' }
      } else {
        return { status: 'error', message: 'Something went wrong' }
      }
    }

    throw error
  }
}

export const Logout = async () => {
  await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT })
}
