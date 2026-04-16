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
    init.current = true;

    services.socket.connect()
      .then(() => {
        initGlobalListeners(services, store)
      })
      .catch((err) => console.error('[SocketBootstrap] connect error', err));

    return () => {
      services.socket.disconnect();
      init.current = false;
      console.log('[SocketBootstrap] socket disconnected on unmount');
    };

  }, [services, store, token])

  return null
})