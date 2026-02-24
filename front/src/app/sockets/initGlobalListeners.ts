import type { IServices } from '@/shared/libs/services/context/service.context.tsx';
import { initMessageBatcher } from './listeners';
import type { AppStore } from '../config';

export const initGlobalListeners = (services: IServices, store: AppStore) => {
  initMessageBatcher(services, store)
}