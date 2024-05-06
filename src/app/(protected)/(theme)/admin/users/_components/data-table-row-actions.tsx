'use client'

import { Fragment } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { useDialog } from '@components/ui/use-dialog'
import DeleteUserDialog from './delete-user'
import EditUserDialog from './edit-user'

import { UserSchema } from '@/schemas/users'
import ChangeStatusDialog from './change-status'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const editUserDialog = useDialog()
  const changeStatusDialog = useDialog()
  const deleteUserDialog = useDialog()
  const user = UserSchema.parse(row.original)

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={editUserDialog.trigger}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={changeStatusDialog.trigger}>
            Change Status
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={deleteUserDialog.trigger}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserDialog dialog={editUserDialog} user={user} />
      <ChangeStatusDialog dialog={changeStatusDialog} user={user} />
      <DeleteUserDialog dialog={deleteUserDialog} userId={user.id} />
    </Fragment>
  )
}
