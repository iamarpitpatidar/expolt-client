import { auth } from '@/auth'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoute,
  publicRoutes,
} from './routes'
import { NextAuthRequest } from 'next-auth/lib'

// @ts-expect-error some error
export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname as never)
  const isAuthRoute = authRoute.includes(nextUrl.pathname)

  if (isAPIAuthRoute) return null
  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))

    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackURL = nextUrl.pathname
    if (nextUrl.search) {
      callbackURL += nextUrl.search
    }

    return Response.redirect(
      new URL(`/auth/login?redirectTo=${btoa(callbackURL)}`, nextUrl),
    )
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
