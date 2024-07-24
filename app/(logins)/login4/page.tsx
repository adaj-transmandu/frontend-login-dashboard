import { LoginForm } from '@/components/LoginForm'
import Logo from '@/components/misc/Logo'
import { ThemeToggler } from '@/components/layout/ThemeToggler'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Login4 = () => {

  return (
    <div className="h-dvh w-dvw bg-primary">
      <div className="flex flex-col lg:flex-row mx-auto h-full items-center justify-between">
        <div className="bg-planeBg1 bg-cover bg-no-repeat w-full h-full">
        </div>
        <div className="h-full w-full flex lg:items-center justify-center dark:bg-slate-900 lg:bg-primary/60 lg:dark:bg-primary/70">
          <div className="flex flex-col space-y-4 lg:bg-white  lg:dark:bg-accent p-2 lg:p-12 lg:shadow-lg rounded-lg">
              <ThemeToggler />
            <div className="hidden lg:flex w-full justify-center">
              <Logo />
            </div>
            <h1 className="text-center text-3xl font-bold">Ingrese al Sistema</h1>
            <p className="text-center font-light text-sm text-muted-foreground">Por favor, inicie sesión con sus credenciales para ingresar.</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login4