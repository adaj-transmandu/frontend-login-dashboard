"use client"

import { ColumnDef } from "@tanstack/react-table"
 
import { DataTableColumnHeader } from "@/components/tables/DataTableHeader"
import DropdownActions from "@/components/misc/DropdownActions"
import { Checkbox } from "@/components/ui/checkbox"
import { Role } from "@/types"
import { Badge } from "@/components/ui/badge"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import PermissionsDrawer from "@/components/misc/PermissionsDrawer"



export const columns: ColumnDef<Role>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({row}) =>
      <>
          <span className='number'>{row.original.name}</span>
      </>
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Permisos" />
    ),
    cell: ({row}) =>
      <PermissionsDrawer permissions={row.original.permissions} />
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Compañia" />
    ),
    cell: ({row}) =>
      <p>{row.original.company.map((c) => <p>{c.description}</p>)}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id
      return (
        <DropdownActions id={id} />
      )
    },
  },
]
