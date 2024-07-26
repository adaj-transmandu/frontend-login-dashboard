'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import CreateRoleForm from "../forms/CreateRoleForm"
import CreatePermisssionForm from "../forms/CreatePermissionForm"

export function CreatePermissionDialog() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="flex items-center justify-center gap-2 h-8 border-dashed">Nuevo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Creación de Permisos</DialogTitle>
          <DialogDescription>
            Cree un permiso colocando el nombre y asignandole sus respectivas acciones.
          </DialogDescription>
        </DialogHeader>
        <CreatePermisssionForm />
      </DialogContent>
    </Dialog>
  )
}
