import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthUserSelector } from '@/entities';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthUserSelector();

  if (!isAuthenticated) {
    return <Navigate to={getLoginPage()} replace />;
  }
  return <>{children}</>;
}