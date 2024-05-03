import { Fragment } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import ForgotPasswordForm from '@components/auth/forgot-password-form'

export default function PasswordResetForm() {
  return (
    <Fragment>
      <p className="mt-2 text-gray-500">Forgot Password ?</p>
      <ForgotPasswordForm />
      <div className="mt-8">
        <Link
          href="/auth/login"
          className="text-gray-500 flex justify-center items-center"
        >
          <ArrowLeftIcon className="h-4 w-6 mr-1" />
          Back to log in
        </Link>
      </div>
    </Fragment>
  )
}
