import { PlaneTakeoff } from 'lucide-react'
import { ContentLayout } from '../layout/ContentLayout'

const WelcomePage = () => {
  return (
    <ContentLayout title='¡Bienvenido!'>
        <div className='h-[550px] flex justify-center items-center'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <PlaneTakeoff className='size-32' />
            <h1 className='text-6xl font-bold text-center'>¡Bienvenido a SIGEAC!</h1>
            <p className='text-muted-foreground text-center'>Por favor, seleccione una <strong>empresa</strong> y una <strong>estación</strong> para comenzar.</p>
          </div>
        </div>
    </ContentLayout>
  )
}

export default WelcomePage