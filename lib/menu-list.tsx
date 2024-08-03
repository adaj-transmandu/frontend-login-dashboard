import {
  Bookmark,
  LayoutGrid,
  LucideIcon,
  Settings,
  SquarePen,
  Tag,
  User2
} from "lucide-react";
  
  type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };

  export type CompanyMenu = 'transmandu' | 'hangar74';
  

  //TODO: Crear menus para cada empresa. Mismo array o diferente, ir probando.

  export function getMenuList(pathname: string, company: CompanyMenu): Group[] {
    switch (company) {
      case 'transmandu': 
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/dashboard",
              label: "Dashboard",
              active: pathname.includes("/dashboard"),
              icon: LayoutGrid,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Almacen",
          menus: [
            {
              href: "",
              label: "Carga",
              active: pathname.includes("/carga"),
              icon: SquarePen,
              submenus: [
                {
                  href: "/almacen/carga/registar_carga",
                  label: "Registrar carga",
                  active: pathname === "/almacen/carga/registar_carga"
                },
                {
                  href: "/almacen/carga/historial_carga",
                  label: "Historial de Carga",
                  active: pathname === "/almacen/carga/historial_carga"
                },
                {
                  href: "/almacen/carga/ordenes_carga",
                label: "Ordenes de Carga",
                active: pathname.includes("/carga/ordenes_carga"),
                }
              ]
            },
            {
              href: "/almacen/requisiciones",
              label: "Requisiciones",
              active: pathname.includes("/almacen/requisiciones"),
              icon: Bookmark,
              submenus: []
            },
            {
              href: "/almacen/inventario",
              label: "Inventario",
              active: pathname.includes("/almacen/inventario"),
              icon: Tag,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Planificación y Mantenimiento",
          menus: [
            {
              href: "/planificacion/ordenes_trabajo",
              label: "Ordenes de Trabajo",
              active: pathname.includes("/ordenes_trabajo"),
              icon: SquarePen,
              submenus: [
                {
                  href: "/planificacion/ordenes_trabajo/nueva_orden_trabajo",
                  label: "Registrar Orden",
                  active: pathname === "/planificacion/ordenes_trabajo/nueva_orden_trabajo"
                },
                {
                  href: "/planificacion/ordenes_trabajo/historial",
                  label: "Historial de Ordenes",
                  active: pathname === "/planificacion/ordenes_trabajo/historial"
                }
              ]
            },
            {
              href: "/planificacion/trabajadores",
              label: "Trabajadores",
              active: pathname.includes("/planificacion/trabajadores"),
              icon: Bookmark,
              submenus: []
            },
            {
              href: "/planificacion/reportes",
              label: "Reportes",
              active: pathname.includes("/planificacion/reportes"),
              icon: Tag,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/cuenta",
              label: "Cuenta",
              active: pathname.includes("/cuenta"),
              icon: Settings,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Admistración",
          menus: [
            {
              href: "/administracion",
              label: "Control",
              active: pathname.includes("/administracion"),
              icon: User2,
              submenus: [
                {
                  href: "/administracion/usuarios",
                  label: "Administrar Usuarios",
                  active: pathname === ("/administracion/usuarios"),
                },
                {
                  href: "/administracion/roles",
                  label: "Administrar  Roles",
                  active: pathname === ("/administracion/roles")
                },
                {
                  href: "/administracion/permisos",
                  label: "Administrar Permisos",
                  active: pathname === ("/administracion/permisos")
                }
              ]
            }
          ]
        }
      ];
      
      case 'hangar74': 
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/dashboard",
              label: "Dashboard HANGAR",
              active: pathname.includes("/dashboard"),
              icon: LayoutGrid,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Almacen",
          menus: [
            {
              href: "",
              label: "Carga",
              active: pathname.includes("/carga"),
              icon: SquarePen,
              submenus: [
                {
                  href: "/almacen/carga/registar_carga",
                  label: "Registrar carga",
                  active: pathname === "/almacen/carga/registar_carga"
                },
                {
                  href: "/almacen/carga/historial_carga",
                  label: "Historial de Carga",
                  active: pathname === "/almacen/carga/historial_carga"
                },
                {
                  href: "/almacen/carga/ordenes_carga",
                label: "Ordenes de Carga",
                active: pathname.includes("/carga/ordenes_carga"),
                }
              ]
            },
            {
              href: "/almacen/requisiciones",
              label: "Requisiciones",
              active: pathname.includes("/almacen/requisiciones"),
              icon: Bookmark,
              submenus: []
            },
            {
              href: "/almacen/inventario",
              label: "Inventario",
              active: pathname.includes("/almacen/inventario"),
              icon: Tag,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Planificación y Mantenimiento",
          menus: [
            {
              href: "/planificacion/ordenes_trabajo",
              label: "Ordenes de Trabajo",
              active: pathname.includes("/ordenes_trabajo"),
              icon: SquarePen,
              submenus: [
                {
                  href: "/planificacion/ordenes_trabajo/nueva_orden_trabajo",
                  label: "Registrar Orden",
                  active: pathname === "/planificacion/ordenes_trabajo/nueva_orden_trabajo"
                },
                {
                  href: "/planificacion/ordenes_trabajo/historial",
                  label: "Historial de Ordenes",
                  active: pathname === "/planificacion/ordenes_trabajo/historial"
                }
              ]
            },
            {
              href: "/planificacion/trabajadores",
              label: "Trabajadores",
              active: pathname.includes("/planificacion/trabajadores"),
              icon: Bookmark,
              submenus: []
            },
            {
              href: "/planificacion/reportes",
              label: "Reportes",
              active: pathname.includes("/planificacion/reportes"),
              icon: Tag,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/cuenta",
              label: "Cuenta",
              active: pathname.includes("/cuenta"),
              icon: Settings,
              submenus: []
            }
          ]
        },
        {
          groupLabel: "Admistración",
          menus: [
            {
              href: "/administracion",
              label: "Control",
              active: pathname.includes("/administracion"),
              icon: User2,
              submenus: [
                {
                  href: "/administracion/usuarios",
                  label: "Administrar Usuarios",
                  active: pathname === ("/administracion/usuarios"),
                },
                {
                  href: "/administracion/roles",
                  label: "Administrar  Roles",
                  active: pathname === ("/administracion/roles")
                },
                {
                  href: "/administracion/permisos",
                  label: "Administrar Permisos",
                  active: pathname === ("/administracion/permisos")
                }
              ]
            }
          ]
        }
      ];
      
      default: 
      return [
        {
          groupLabel: "",
          menus: [
            {
              href: "/dashboard",
              label: "Dashboard",
              active: pathname.includes("/dashboard"),
              icon: LayoutGrid,
              submenus: []
            }
          ]
        }
      ];
    }
  }