'use client'

import { AppWindow, Cog, LogOut, User, Users } from 'lucide-react'
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
import LogoutButton from '@components/auth/logout-button'
import { useCurrentUser } from '@lib/hooks/use-current-user'
import Link from 'next/link'

export default function UserProfile() {
  const user = useCurrentUser()

  return (
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
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <AppWindow className="h-4 w-4 mr-2" />
              <Link href="/apps">
                <span>Apps</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Users className="h-4 w-4 mr-2" />
              <Link href="/settings">
                <span>Users</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Cog className="h-4 w-4 mr-2" />
              <Link href="/settings">
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
