'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    router.push(`/dashboard?q=${e.target.value}`)
  }

  return (
    <div className="hidden md:flex col-span-3 px-6 items-center text-gray-600">
      <Search className="h-4 w-4 mr-2" />
      <input
        type="text"
        defaultValue={searchParams.get('q') ?? ''}
        placeholder="Type anywhere to search"
        className="w-full outline-none"
        onChange={handleSearch}
      />
    </div>
  )
}
