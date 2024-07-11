'use client'

import { Search } from 'lucide-react'
import { ChangeEvent } from 'react'
import { useAtom } from 'jotai'
import { DashboardSearch } from '@lib/store/atoms'

export default function SearchInput() {
  const [search, setSearch] = useAtom(DashboardSearch)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="hidden md:flex col-span-3 px-6 items-center text-gray-600">
      <Search className="h-4 w-4 mr-2" />
      <input
        type="text"
        defaultValue={search}
        placeholder="Type anywhere to search"
        className="w-full outline-none"
        onChange={handleSearch}
      />
    </div>
  )
}
