'use client';

import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/sidebar/Menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/sidebar/SidebarToggle";
import Image from "next/image";
import { useCompanyStore } from "@/stores/CompanyStore";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const {selectedCompany, selectedStation} = useCompanyStore()
  
  if(!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800 mt-5">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 mt-4",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src={'/logo.png'} width={150} height={150} alt="Logo" />
          </Link>
        </Button>
        {
          selectedCompany && selectedStation ? <Menu isOpen={sidebar?.isOpen} /> :

          <p className="text-sm text-muted-foreground text-center mt-10">Por favor, seleccione una <strong>Empresa</strong> y una <strong>Estacion</strong>.</p>
          
        }
      </div>
    </aside>
  );
}