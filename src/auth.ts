import NextAuth, { type DefaultSession } from 'next-auth'
import AuthConfig from './auth.config'
// import { getLoggedInUser } from '@lib/actions'

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
    // async session({ token, session }) {
    //   if (token.sub && session.user) {
    //     session.user = {
    //       ...session.user,
    //       ...(token.user || {}),
    //       token: token.sub,
    //     }
    //   }
    //   return session
    // },
    // async jwt({ token }) {
    //   if (!token.sub) return token
    //
    //   token.user = await getLoggedInUser(token.sub)
    //   return token
    // },
  },
  session: { strategy: 'jwt' },
  ...AuthConfig,
})
