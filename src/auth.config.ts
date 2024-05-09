import { AuthError, CredentialsSignin, NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas'
import { AccessDenied } from '@auth/core/errors'

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'username' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedFields.data),
          })

          const res = await response.json()
          if (res.status === 'error') {
            if (res.status_code === 'INVALID_CREDENTIALS') {
              throw new CredentialsSignin(res.message)
            } else if (res.status_code === 'USER_BLOCKED') {
              throw new AccessDenied(res.message)
            } else {
              throw new AuthError(res.message)
            }
          }

          return { id: res.data.token }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
  },
} satisfies NextAuthConfig
