import { useServices } from './useServices.tsx';

export const useNotificationsService = () => {
  const { notifications } = useServices();
  return notifications;
};
