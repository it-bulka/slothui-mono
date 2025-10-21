import { useContext } from 'react';
import { Ctx, type CtxProps } from './service.context.tsx';

export const useServices = (): CtxProps['services'] => {
  const context = useContext(Ctx)
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context.services;
}