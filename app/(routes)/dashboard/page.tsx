'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import DashboardTabs from '@/components/misc/DashboardTabs';
import DashboardNotifications from '@/components/misc/DashboradNotifications';
import WelcomePage from '@/components/misc/WelcomePage';
import { useAuth } from '@/contexts/AuthContext';
import { useCompanyStore } from '@/stores/CompanyStore';

const DashboardPage =  () => {

    const {user, loading} = useAuth();
    const {selectedCompany, selectedStation} = useCompanyStore();

    if(!selectedCompany || !selectedStation){
      return <WelcomePage />
    }

    return (
    <ContentLayout title='Dashboard'>
      {/* {
        loading && <div>Cargando...</div>
      }
      {
        user && <h1 className='text-2xl font-medium'>Bienvenido: {user.first_name}</h1>
      } */}
      <DashboardTabs/>
    </ContentLayout>
  )
}

export default DashboardPage