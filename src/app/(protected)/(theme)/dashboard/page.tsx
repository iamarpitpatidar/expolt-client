import { Suspense } from 'react'
import { Card } from '@components/ui/card'
import { NewsCard } from './_component/NewsCard'
import { Skeleton } from '@components/ui/skeleton'
import WeatherCard from './_component/WeatherCard'
import DateTimeCard from './_component/DateTimeCard'
import AppsList from './_component/AppsList'

import '@assets/css/dash.scss'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  return (
    <div className="bg-gray-200 p-6">
      <div className="grid gap-2 lg:grid-cols-2">
        <div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="col-span-2">
              <Suspense fallback={<Skeleton className="h-full" />}>
                <NewsCard />
              </Suspense>
            </div>
            <Suspense fallback={<Skeleton />}>
              <WeatherCard />
            </Suspense>
            <Card className="p-8 flex justify-center items-center text-5xl text-gray-500">
              <DateTimeCard />
            </Card>
          </div>
        </div>
        <AppsList search={searchParams.q} />
      </div>
    </div>
  )
}
