import { ContentLayout } from '@/components/layout/ContentLayout';
import DashboardNotifications from '@/components/misc/DashboradNotifications';

export type User = {
  name: string,
  id: number,
  password: string,
  email: string,
}

const DashboardPage =  () => {
    return (
    <ContentLayout title='Dashboard'>
      <h1 className='font-bold'>Ultimas Novedades:</h1>
      <DashboardNotifications />
    </ContentLayout>
  )
}

export default DashboardPage