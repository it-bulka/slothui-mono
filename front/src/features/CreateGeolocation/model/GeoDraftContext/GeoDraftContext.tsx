import { createContext } from 'react';
import type { GeoData } from '../types/geo.types.tsx';

interface GeoDraftContextValue {
  handleSendGeo: (geo: GeoData) => void
  isOpen: boolean
  close: () => void
  open: () => void
}

export const GeoDraftContext = createContext<GeoDraftContextValue | undefined>(undefined);
