import { GeoDraftContext } from './GeoDraftContext.tsx';
import type { ReactNode } from 'react';
import type { GeoData } from '../types/geo.types.tsx';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { useCallback } from 'react';

export const GeoDraftProvider = ({ children, sendGeo }: { children: ReactNode, sendGeo: (geo: GeoData) => void }) => {
  const { isOpen, open, close } = useModalControl();

  const handleSendGeo = useCallback((geo: GeoData) => {
    sendGeo(geo);
    close()
  }, [sendGeo, close]);

  return (
    <GeoDraftContext.Provider value={{ handleSendGeo, isOpen, close, open }}>{children}</GeoDraftContext.Provider>
  )
}
