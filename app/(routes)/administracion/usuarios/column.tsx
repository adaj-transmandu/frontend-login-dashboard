"use client"

import { ColumnDef } from "@tanstack/react-table"
 
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"

import DropdownActions from "@/components/misc/DropdownActions"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export type Item = {
  id: number,
  first_name: string
  last_name: string
  username: string
  email: string
  isActive: boolean
}


export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({row}) =>
      <>
          <span className='number'>{row.original.first_name} {row.original.last_name}</span>
      </>
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuario" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({row}) => {
      const item = row.original

      return (
        <>
          {
            item.isActive.toString() === '1' ? <Badge className="bg-emerald-500">ACTIVO</Badge> : <Badge className="bg-rose-500">INACTIVO</Badge>
          }
        </>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <DropdownActions id={id.toString()} />
      )
    },
  },
]
