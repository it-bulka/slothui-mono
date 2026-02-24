import { useAuthUserTokenSelector } from '@/entities/AuthUser';
import { useServices } from '@/shared/libs/services';
import { useEffect, useRef, memo } from 'react';
import { initGlobalListeners } from './initGlobalListeners.ts';
import type { AppStore } from '../config';

export const SocketBootstrap = memo(({ store }: { store: AppStore}) => {
  const token = useAuthUserTokenSelector()
  const services = useServices()
  const init = useRef(false)

  useEffect(() => {
    if (!token) return
    if (init.current) return;
    initGlobalListeners(services, store)

    return () => {
      services.socket.disconnect();
      console.log('[SocketBootstrap] socket disconnected on unmount');
    };

  }, [services, store, token])

  return null
})