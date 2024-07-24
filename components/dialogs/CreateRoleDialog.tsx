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
import { useState } from "react"

export function CreateRoleDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant={'outline'} className="flex items-center justify-center gap-2 h-8 border-dashed">Crear</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Creación de Rol</DialogTitle>
          <DialogDescription>
            Cree un rol colocando el nombre.
          </DialogDescription>
        </DialogHeader>
        <CreateRoleForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}