'use client';

import { notifications } from "@/lib/notification-list";
import { toast } from "sonner";
import NotificationItem from "@/components/misc/NotificationItem";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DashboardNotifications = () => {

  const {user, loading} = useAuth();

  const handleToast = () => {
    toast("¡Aviso!", {
      description: "Revisar almacén: Ctnd. STOCK - TORNILLOS",
      action: {
        label: "Cerrar",
        onClick: () => console.log("Undo"),
      },
    })
  }
  
  return (
    <div className="flex flex-col gap-2">
      {
        notifications.map((notification, index) => (
          <NotificationItem key={index} title={notification.title} description={notification.description} status={notification.status} />
        ))
      }
      <Button className="w-[250px] text-white bg-black hover:bg-slate-700" onClick={handleToast}>Mostrar Notificacion</Button>
      <p>Bienvenido {user?.username}</p>
    </div>
  )
}

export default DashboardNotifications