'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { AppWindow, Cog, Dock, LogOut, User, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { useCurrentUser } from '@lib/hooks/use-current-user'
import { useDialog } from '@components/ui/use-dialog'
import LogoutDialog from './LogoutDialog'

export default function UserProfile() {
  const user = useCurrentUser()
  const logoutDialog = useDialog()

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none mr-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-sky-500">
              <User className="text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end">
          <DropdownMenuLabel>Hello, {user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user?.role === 'admin' && (
            <Fragment>
              <DropdownMenuGroup>
                <Link href="/">
                  <DropdownMenuItem className="cursor-pointer">
                    <Dock className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/admin/apps">
                  <DropdownMenuItem className="cursor-pointer">
                    <AppWindow className="h-4 w-4 mr-2" />
                    <span>Apps</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/admin/users">
                  <DropdownMenuItem className="cursor-pointer">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Users</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/admin/settings">
                  <DropdownMenuItem className="cursor-pointer">
                    <Cog className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </Fragment>
          )}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={logoutDialog.trigger}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog dialog={logoutDialog} />
    </Fragment>
  )
}
