import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { getHomePage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthUserSelector } from '@/entities';

export const AuthRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthUserSelector();
  if (isAuthenticated) {
    return <Navigate to={getHomePage()} replace />;
  }
  return <>{children}</>;
};