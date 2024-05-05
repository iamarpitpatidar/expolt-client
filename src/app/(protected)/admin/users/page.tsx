import { Metadata } from 'next'
import { getUsers } from '@lib/actions'
import UsersDatatable from '@components/data-table/data-table'
import { columns } from './_components/columns'
import { filters } from './data'

export const metadata: Metadata = {
  title: 'Users - Expolt',
}

export default async function users() {
  const users = await getUsers()

  return (
    <div className="space-y-12 p-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all the Users!
          </p>
        </div>
      </div>
      <UsersDatatable data={users} columns={columns} filters={filters} />
    </div>
  )
}
