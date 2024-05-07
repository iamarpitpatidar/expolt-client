import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table'
import { Input } from '@components/ui/input'
import { Skeleton } from '@components/ui/skeleton'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'

export default function UserLoadingSkeleton() {
  return (
    <div className="space-y-12 p-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all the users!
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Search..."
              className="h-8 w-[150px] lg:w-[250px] px-3 placeholder:text-muted-foreground focus-visible:outline-none text-sm rounded-md py-1"
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6" />
                </TableCell>
                <TableCell>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
