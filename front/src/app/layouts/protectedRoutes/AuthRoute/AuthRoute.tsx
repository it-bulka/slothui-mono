import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { getHomePage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthUserSelector } from '@/entities';
import { useAppSelector } from '@/shared/config/redux';
import { InitPageLoader } from '@/shared/ui';

export const AuthRoute = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthUserSelector();
  const isInitialized = useAppSelector(state => state.authUser.isInitialized);

  if (!isInitialized) return <InitPageLoader />;

  if (isAuthenticated) {
    return <Navigate to={getHomePage()} replace />;
  }
  return <>{children}</>;
};