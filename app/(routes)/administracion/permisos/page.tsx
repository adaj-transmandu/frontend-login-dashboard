import { ContentLayout } from '@/components/layout/ContentLayout'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import React from 'react'

const PermisosPage = () => {
  return (
    <ProtectedRoute roles={['admin']}>
      <ContentLayout title='Permisos'>PermisosPage</ContentLayout>
    </ProtectedRoute>
  )
}

export default PermisosPage