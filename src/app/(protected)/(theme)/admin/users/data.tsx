import { DataTableToolbarFilter } from '@lib/types'
import { CheckCircle2, CircleX, User, UserCog } from 'lucide-react'

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
export const roles = [
  {
    value: 'admin',
    label: 'Admin',
    icon: <UserCog className="mr-2 h-4 w-4 text-muted-foreground" />,
  },
  {
    value: 'user',
    label: 'User',
    icon: <User className="mr-2 h-4 w-4 text-muted-foreground" />,
  },
]

export const filters: DataTableToolbarFilter[] = [
  {
    columnName: 'role',
    title: 'Role',
    options: roles,
  },
  {
    columnName: 'status',
    title: 'Status',
    options: statuses,
  },
]
