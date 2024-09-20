/**
 * An array of routes that are accessible to public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = []

/**
 * An array of routes that are used for authentication
 * These routes will redirect the logged-in user to dashboard
 * @type {string[]}
 */
export const authRoute: string[] = [
  '/auth/login',
  '/auth/forgot-password',
  '/auth/reset-password',
]

/**
 * The prefix for api authentication routes.
 * Routes that start with this prefix are used for authentication purposes.
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after login
 */
export const DEFAULT_LOGIN_REDIRECT = '/'
export const DEFAULT_LOGOUT_REDIRECT = '/auth/login'
