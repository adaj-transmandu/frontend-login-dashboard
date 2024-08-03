import { PlaneTakeoff } from 'lucide-react'
import { ContentLayout } from '../layout/ContentLayout'
import CompanySelect from './CompanySelect'
import CompanySelectMobile from './CompanySelectMobile'

const WelcomePage = () => {
  return (
    <div>
        <div className='h-[750px] md:h-[850px] flex justify-center items-center max-w-sm mx-auto'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <PlaneTakeoff className='size-32' />
            <h1 className='text-6xl font-bold text-center'>¡Bienvenido a SIGEAC!</h1>
            <p className='text-muted-foreground text-center'>Por favor, seleccione una <strong>empresa</strong> y una <strong>estación</strong> para comenzar.</p>
            <CompanySelect />
            <CompanySelectMobile /> 
          </div>
        </div>
    </div>
  )
}

export default WelcomePage