import { Column, Table } from '@tanstack/react-table'
import { ReactElement } from 'react'

/**
 * Data table filter
 */
interface DataTableFilterOption {
  label: string
  value: string
  icon?: ReactElement
}
export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: DataTableFilterOption[]
}

/**
 * Data table toolbar
 */
export interface DataTableToolbarFilter {
  columnName: string
  title: string
  options: DataTableFilterOption[]
}
export interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters: DataTableToolbarFilter[]
}
