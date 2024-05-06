import { Skeleton } from '@components/ui/skeleton'

export default function DashboardLoadingSkeleton() {
  return (
    <div className="bg-gray-200 p-6">
      <div className="grid gap-2 grid-cols-2">
        <div className="grid gap-2 md:grid-cols-2">
          <div className="col-span-2">
            <Skeleton className="h-full" />
          </div>
          <Skeleton />
          <Skeleton />
        </div>
        <div className="grid gap-2 md:grid-cols-2 h-screen overflow-scroll">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  )
}
