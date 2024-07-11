import Link from 'next/link'
import { Suspense } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { NewsCard } from './_component/NewsCard'
import { Skeleton } from '@components/ui/skeleton'
import { getApps } from '@lib/actions'
import WeatherCard from './_component/WeatherCard'
import DateTimeCard from './_component/DateTimeCard'

import '@assets/css/dash.scss'

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const apps = await getApps()

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes((searchParams.q || '').toLowerCase()),
  )

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
        <div className="grid gap-2 md:grid-cols-2 h-screen overflow-scroll">
          {filteredApps.map((app) => (
            <Card
              key={app.id}
              className="opacity-80"
              style={{ backgroundColor: `${app.meta.background}` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Badge
                  variant="secondary"
                  className="text-sm text-muted-foreground font-medium px-3 capitalize"
                >
                  {app.type}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-white py-4 text-2xl">
                  {app.name}
                </CardTitle>
                <CardDescription className="text-white py-4 line-clamp-2">
                  {app.description}
                </CardDescription>
                <div className="mt-8">
                  <Link
                    className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-4"
                    href={
                      app.type === 'web'
                        ? app.meta.redirectTo
                        : `/apps/${app.uuid}/connect`
                    }
                    target="_blank"
                  >
                    Open Software
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
