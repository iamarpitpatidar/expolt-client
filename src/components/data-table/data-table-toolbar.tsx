import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'

import { DataTableViewOptions } from '@components/data-table/data-table-view-options'
import { DataTableFacetedFilter } from '@components/data-table/data-table-faceted-filter'
import { DataTableToolbarProps } from '@lib/types'

export function DataTableToolbar<TData>({
  table,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] px-3 placeholder:text-muted-foreground focus-visible:outline-none text-sm rounded-md py-1"
        />
        {filters.map((filter, index) => {
          if (!table.getColumn(filter.columnName)) return null
          return (
            <DataTableFacetedFilter
              key={index}
              column={table.getColumn(filter.columnName)}
              title={filter.title}
              options={filter.options}
            />
          )
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
