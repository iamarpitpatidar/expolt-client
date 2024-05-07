import NextAuth, { type DefaultSession } from 'next-auth'
import AuthConfig from './auth.config'
import { getDeployURl } from '@lib/utils'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'admin' | 'user'
  token: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (!token.sub) {
        throw new Error('No token found')
      }

      const appUrl = await getDeployURl()
      console.log('fetching user', appUrl)
      const response = await fetch(
        `${appUrl}/api/auth/users/me?token=${token.sub}`,
        { headers: { Accept: 'application/json' } },
      ).then((res) => res.json())
      session.user = {
        ...session.user,
        ...(response.data || {}),
        token: token.sub,
      }
      return session
    },
  },
  session: { strategy: 'jwt' },
  ...AuthConfig,
})
