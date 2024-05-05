import { DataTableToolbarFilter } from '@lib/types'
import { CheckCircle2, CircleX, Globe, Server } from 'lucide-react'

export const statuses = [
  {
    value: '1',
    label: 'Active',
    icon: <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />,
  },
  {
    value: '0',
    label: 'Inactive',
    icon: <CircleX className="mr-2 h-4 w-4 text-muted-foreground" />,
  },
]
export const types = [
  {
    value: 'vm',
    label: 'VM',
    icon: <Server className="mr-2 h-4 w-4 text-muted-foreground" />,
  },
  {
    value: 'web',
    label: 'Web',
    icon: <Globe className="mr-2 h-4 w-4 text-muted-foreground" />,
  },
]

export const filters: DataTableToolbarFilter[] = [
  {
    columnName: 'type',
    title: 'Type',
    options: types,
  },
  {
    columnName: 'status',
    title: 'Status',
    options: statuses,
  },
]
