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
import { Permission } from "@/types"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

interface DrawerProps {
    permissions: Permission[],
}

const PermissionsDrawer = ({ permissions }: DrawerProps) => {
  // Agrupamos permisos por módulo
  const groupedByModule = permissions.reduce((acc, permission) => {
    permission.modules.forEach(module => {
      if (!acc[module.id]) {
        acc[module.id] = {
          ...module,
          permissions: []
        };
      }
      acc[module.id].permissions.push(permission);
    });
    return acc;
  }, {} as Record<number, { id: number, name: string, description: string, permissions: Permission[] }>);

  return (
    <Drawer>
        <DrawerTrigger>
            <Button variant='ghost'>Ver Permisos</Button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="mx-auto w-full max-w-md">
                <DrawerHeader>
                    <DrawerTitle>Permisos de Rol</DrawerTitle>
                    <DrawerDescription>Aquí puede ver los permisos asignados al rol.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {
                            Object.values(groupedByModule).map(module => (
                                <div key={module.id} className="border p-4 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-semibold">{module.name}</h3>
                                    <p className="text-sm text-gray-600">{module.description}</p>
                                    <div className="mt-2">
                                        {
                                            module.permissions.map(permission => (
                                                <div key={permission.id} className="mb-1">
                                                    <Badge variant="outline">{permission.label}</Badge>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Cerrar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default PermissionsDrawer;
