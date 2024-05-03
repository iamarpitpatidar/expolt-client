import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import { Earth, Link, LayoutGrid, Search } from 'lucide-react'
import UserProfile from '@/app/dashboard/_components/UserProfile'

export default async function DashboardHeader() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <header className="grid grid-cols-3 py-4 px-6">
        <div className="grid grid-cols-6 divide-x col-span-2">
          <div className="font-bold tracking-wide text-lg flex items-center">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </div>
          <div className="flex justify-around items-center">
            <Earth className="h-6 w-6 text-gray-600" />
            <Link className="h-6 w-6 text-gray-600" />
            <LayoutGrid className="h-6 w-6 text-gray-600" />
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
