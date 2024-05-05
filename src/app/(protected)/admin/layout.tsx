import { Fragment, ReactNode } from 'react'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return <Fragment>{children}</Fragment>
}
