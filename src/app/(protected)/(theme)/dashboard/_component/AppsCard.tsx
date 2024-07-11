import AppsList from './AppsList'
import { getApps } from '@lib/actions'

export default async function AppsCard() {
  const apps = await getApps()

  return (
    <div
      className="grid gap-2 sm:grid-cols-2 auto-rows-max overflow-scroll"
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <AppsList apps={apps} />
    </div>
  )
}
