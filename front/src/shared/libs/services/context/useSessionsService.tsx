import { useServices } from './useServices.tsx';

export const useSessionsService = () => {
  const { sessions: sessionsService } = useServices();
  return sessionsService;
}