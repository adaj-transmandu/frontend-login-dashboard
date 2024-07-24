'use client';

import Logo from '@/components/misc/Logo'
import { ThemeToggler } from '@/components/layout/ThemeToggler'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DoorOpen } from 'lucide-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import gif from '@/public/loading2.gif'

const Login3 = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    setLoading(false)

    router.push('/dashboard');
  }

  return (
    <div className='flex w-dvw h-dvh'>
        <div className='flex justify-center items-center w-full bg-planeBg1 bg-opacity-65 bg-cover h-full'>
        </div>
        <div className='flex flex-col space-y-6 items-center justify-center w-full h-full bg-sky-50'>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Logo /> 
            <Separator className='bg-primary h-[4px]' />
            <p className='text-sm text-muted-foreground'>Por favor, ingrese sus credenciales de inicio de sesión.</p>
          </div>
          <div className='flex flex-col space-y-2'>
            <Label className='text-2xl font-medium'>Usuario</Label>
            <Input className='bg-sky-50 border-t-0 border-r-0 border-l-0 rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-b-2 focus-visible:border-b-primary' placeholder='Ingrese su usuario...'/>
            <Label className='text-2xl font-medium'>Contraseña</Label>
            <Input className='bg-sky-50 border-t-0 border-r-0 border-l-0 rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-b-2 focus-visible:border-b-primary' placeholder='Ingrese su contraseña...'/>
          </div>
          <div className='flex gap-x-4 items-center'>
            <Button disabled={loading} onClick={handleClick} className='gap-x-2 bg-blue-500 text-white hover:bg-blue-600'>
              {loading ? <Image src={gif} width={120} height={120} alt='Loading' /> : <p className='flex gap-x-2 items-center'><DoorOpen /> Iniciar Sesion</p>}
            </Button>
            <ThemeToggler />
          </div>
        </div>
    </div>
  )
}

export default Login3