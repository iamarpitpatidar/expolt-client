import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas'

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

          if (!response.ok) {
            return null
          }

          const res = await response.json()
          return { id: res.data.token }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
} satisfies NextAuthConfig
