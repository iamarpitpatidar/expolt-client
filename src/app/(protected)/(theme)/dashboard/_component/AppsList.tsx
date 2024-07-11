import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import Link from 'next/link'
import { getApps } from '@lib/actions'

export default async function AppsList({ search }: { search?: string }) {
  const apps = await getApps()

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes((search || '').toLowerCase()),
  )

  return (
    <div className="grid gap-2 sm:grid-cols-2 auto-rows-max max-h-screen overflow-scroll">
      {filteredApps.map((app) => (
        <Card
          key={app.id}
          className="opacity-80"
          style={{
            backgroundColor: `${app.meta.background}`,
            maxHeight: '240px',
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
  )
}
