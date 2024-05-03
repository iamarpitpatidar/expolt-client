import { Fragment } from 'react'
import LoginForm from '@components/auth/login-form'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectTo: string }
}) {
  const { redirectTo } = searchParams

  return (
    <Fragment>
      <p className="mt-2 text-gray-500">Login into your account</p>
      <LoginForm callbackUrl={redirectTo} />
    </Fragment>
  )
}
