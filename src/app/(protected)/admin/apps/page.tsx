import { Metadata } from 'next'
import { columns } from './_components/columns'
import AppsDatatable from '@components/data-table/data-table'
import { getAdminApps } from '@lib/actions'
import { DataTableToolbarFilter } from '@lib/types'
import { CheckCircle2, CircleX } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Apps - Expolt',
}

export default async function Apps() {
  const tasks = await getAdminApps()
  const filters: DataTableToolbarFilter[] = [
    {
      columnName: 'status',
      title: 'Status',
      options: [
        {
          value: 'active',
          label: 'Active',
          icon: <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />,
        },
        {
          value: 'inactive',
          label: 'Inactive',
          icon: <CircleX className="mr-2 h-4 w-4 text-muted-foreground" />,
        },
      ],
    },
  ]

  return (
    <div className="space-y-4 p-6">
      <AppsDatatable data={tasks} columns={columns} filters={filters} />
    </div>
  )
}
