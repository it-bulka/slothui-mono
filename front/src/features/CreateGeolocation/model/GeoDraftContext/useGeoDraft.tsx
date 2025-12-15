import { useContext } from 'react';
import { GeoDraftContext } from './GeoDraftContext.tsx';

export const useGeoDraft = () => {
  const ctx = useContext(GeoDraftContext);
  if(!ctx) throw new Error('useGeoDraft must be inside GeoDraftProvider');
  return ctx;
}