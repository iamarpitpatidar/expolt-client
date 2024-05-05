import { Metadata } from 'next'
import { columns } from './_components/columns'
import AppsDatatable from '@components/data-table/data-table'
import { getAdminApps } from '@lib/actions'
import { filters } from './data'

export const metadata: Metadata = {
  title: 'Apps - Expolt',
}

export default async function Apps() {
  const tasks = await getAdminApps()

  return (
    <div className="space-y-4 p-6">
      <AppsDatatable data={tasks} columns={columns} filters={filters} />
    </div>
  )
}
