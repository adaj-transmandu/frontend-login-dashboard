import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import OverviewTab from "../tabs/dashboardTabs/OverviewTab"

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList className="h-12">
        <TabsTrigger value="overview" className="text-lg">Overview</TabsTrigger>
        <TabsTrigger value="analytics" className="text-lg">Analiticas</TabsTrigger>
        <TabsTrigger value="reports" className="text-lg">Reportes</TabsTrigger>
        <TabsTrigger value="notifications" className="text-lg">Notificaciones</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><OverviewTab/></TabsContent>
      <TabsContent value="analytics"><OverviewTab/></TabsContent>
    </Tabs>

  )
}

export default DashboardTabs