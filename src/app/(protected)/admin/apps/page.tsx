import { Metadata } from 'next'
import { columns } from './_components/columns'
import AppsDatatable from '@components/data-table/data-table'
import { getAdminApps } from '@lib/actions'
import { filters } from './data'

export const metadata: Metadata = {
  title: 'Apps - Expolt',
}

export default async function Apps() {
  const apps = await getAdminApps()

  return (
    <div className="space-y-12 p-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all your applications!
          </p>
        </div>
      </div>
      <AppsDatatable data={apps} columns={columns} filters={filters} />
    </div>
  )
}
