import { Fragment, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()
  if (!session || session.user.role !== 'admin') {
    redirect(DEFAULT_LOGIN_REDIRECT)
  }

  return (
    <Fragment>
      {children}
      <Toaster position="top-right" />
    </Fragment>
  )
}
