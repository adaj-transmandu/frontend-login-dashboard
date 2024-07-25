'use client'
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoadingPage from '../misc/LoadingPage';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
}

const ProtectedRoute = ({ children, roles, permissions }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <LoadingPage />;

  if (!user) {
    router.push('/login1');
    return null;
  }

  const userRoles = user.roles?.map(role => role.name) || [];
  
  const userPermissions = user.roles?.flatMap(role => role.permissions.map(permission => permission.name)) || [];

  if (roles && !roles.some(role => userRoles.includes(role))) {
    router.push('/not-authorized');
    return null;
  }

  if (permissions && !permissions.some(permission => userPermissions.includes(permission))) {
    router.push('/not-authorized');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
