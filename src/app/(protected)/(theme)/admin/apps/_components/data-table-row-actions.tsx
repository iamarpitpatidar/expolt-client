'use client'

import { Fragment } from 'react'
import { Row } from '@tanstack/react-table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import EditAppDialog from './edit-app'
import DeleteAppDialog from './delete-app'
import ChangeStatusDialog from './change-status'

import { AppSchema } from '@/schemas/apps'
import { useDialog } from '@components/ui/use-dialog'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}
export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const editAppDialog = useDialog()
  const changeStatusDialog = useDialog()
  const deleteAppDialog = useDialog()

  const app = AppSchema.parse(row.original)

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
          <DropdownMenuItem onClick={editAppDialog.trigger}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={changeStatusDialog.trigger}>
            Change Status
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={deleteAppDialog.trigger}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditAppDialog dialog={editAppDialog} app={app} />
      <ChangeStatusDialog dialog={changeStatusDialog} app={app} />
      <DeleteAppDialog dialog={deleteAppDialog} appId={app.id} />
    </Fragment>
  )
}
