'use client';

import { ContentLayout } from '@/components/layout/ContentLayout';
import DashboardNotifications from '@/components/misc/DashboradNotifications';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage =  () => {

    const {user, loading} = useAuth();

    return (
    <ContentLayout title='Dashboard'>
      {
        loading && <div>Cargando...</div>
      }
      {
        user && <h1 className='text-2xl font-medium'>Bienvenido: {user.first_name}</h1>
      }
      <DashboardNotifications />
    </ContentLayout>
  )
}

export default DashboardPage