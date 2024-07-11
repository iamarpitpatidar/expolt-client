import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import { Earth, LayoutGrid } from 'lucide-react'

import UserProfile from './UserProfile'
import SearchInput from './SearchInput'

import Logo from '@assets/images/logo.png'

export default async function DashboardHeader() {
  const session = await auth()

  return (
    <SessionProvider
      session={session}
      refetchInterval={60}
      refetchOnWindowFocus={false}
    >
      <header className="grid grid-cols-3 py-4 px-6 border-b">
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 divide-x col-span-2">
          <Link href="/dashboard">
            <div className="font-bold tracking-wide text-lg flex items-center">
              <Image
                src={Logo}
                alt={`${process.env.NEXT_PUBLIC_APP_NAME} Logo`}
                width={40}
                className="mr-4"
              />
              <span className="hidden lg:block">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </div>
          </Link>
          <div className="flex justify-around items-center">
            <Link href="https://expolt.com" target="_blank">
              <Earth className="h-6 w-6 text-gray-600" />
            </Link>
            <Link href="/dashboard">
              <LayoutGrid className="h-6 w-6 text-gray-600" />
            </Link>
          </div>
          <SearchInput />
        </div>
        <div className="flex items-center justify-end">
          <UserProfile />
          <div>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
        </div>
      </header>
    </SessionProvider>
  )
}
