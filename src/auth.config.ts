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
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
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
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
} satisfies NextAuthConfig
