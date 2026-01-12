import { useServices } from './useServices.tsx';

export const useNotificationsCountersService = () => {
  const { notificationsCounters: notificationsCountersService } = useServices();
  return notificationsCountersService;
}