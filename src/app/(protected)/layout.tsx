import { Fragment, ReactNode } from 'react'
import DashboardHeader from '@/app/(protected)/dashboard/_components/Header'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Fragment>
      <DashboardHeader />
      {children}
    </Fragment>
  )
}
