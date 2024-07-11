'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { useAtomValue } from 'jotai/index'
import { App } from '@/schemas/apps'
import { DashboardSearch } from '@lib/store/atoms'

export default function AppsList({ apps }: { apps: App[] }) {
  const search = useAtomValue(DashboardSearch)

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes((search || '').toLowerCase()),
  )

  return (
    <Fragment>
      {filteredApps.map((app) => (
        <Card
          key={app.id}
          className="opacity-80 flex flex-col"
          style={{
            backgroundColor: `${app.meta.background}`,
            height: '240px',
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Badge
              variant="secondary"
              className="text-sm text-muted-foreground font-medium px-3 capitalize"
            >
              {app.type}
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow justify-between">
            <CardTitle className="text-white py-4 text-2xl">
              {app.name}
            </CardTitle>
            <div className="">
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
    </Fragment>
  )
}
