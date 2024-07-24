import { ContentLayout } from '@/components/layout/ContentLayout'
import InventoryForm from '@/components/forms/InventoryForm'
import React from 'react'

const AgregarPage = () => {
  return (
    <ContentLayout title='TEST DE AGREGADO'>
      <h1 className='font-bold uppercase text-2xl'>Ingreso de pieza</h1>
      <p className='text-sm text-muted-foreground'>Rellene los datos para ingresar una pieza al almacén</p>
      <InventoryForm /> 
    </ContentLayout>
  )
}

export default AgregarPage