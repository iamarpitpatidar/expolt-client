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
        console.log('init auth')
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          console.log('validated fields')
          const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedFields.data),
          })
          console.log('api call')

          const res = await response.json()
          console.log(res)
          console.log(res.status === 'error')
          console.log(res.status)
          if (res.status === 'error') {
            console.log('error')
            if (res.status_code === 'INVALID_CREDENTIALS') {
              throw new CredentialsSignin(res.message)
            } else if (res.status_code === 'USER_BLOCKED') {
              throw new AccessDenied(res.message)
            } else {
              throw new AuthError(res.message)
            }
          }

          console.log('success')

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
