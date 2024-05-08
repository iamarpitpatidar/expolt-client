import { auth } from '@/auth'
import Link from 'next/link'
import { SessionProvider } from 'next-auth/react'
import { Earth, LayoutGrid, Search } from 'lucide-react'
import UserProfile from './UserProfile'
import Image from 'next/image'
import Logo from '@assets/images/logo.png'

export default async function DashboardHeader() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <header className="grid grid-cols-3 py-4 px-6 border-b">
        <div className="grid grid-cols-6 divide-x col-span-2">
          <Link href="/dashboard">
            <div className="font-bold tracking-wide text-lg flex items-center">
              <Image
                src={Logo}
                alt={`${process.env.NEXT_PUBLIC_APP_NAME} Logo`}
                width={40}
                className="mr-4"
              />
              {process.env.NEXT_PUBLIC_APP_NAME}
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
          <div className="col-span-3 flex px-6 items-center text-gray-600">
            <Search className="h-4 w-4 mr-2" />
            <input
              type="text"
              placeholder="Type anywhere to search"
              className="w-full outline-none"
            />
          </div>
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
