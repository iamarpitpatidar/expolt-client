import { Fragment, ReactNode } from 'react'
import DashboardHeader from '@/app/dashboard/_components/Header'
import { auth } from '@/auth'

export default async function DashboardLayout({
  user,
  admin,
}: {
  user: ReactNode
  admin: ReactNode
}) {
  const session = await auth()

  return (
    <Fragment>
      <DashboardHeader />
      {session?.user.role === 'admin' ? admin : user}
    </Fragment>
  )
}
