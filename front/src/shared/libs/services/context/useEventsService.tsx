import { useServices } from './useServices.tsx';

export const useEventsService = () => {
  const { events: eventsService } = useServices();
  return eventsService;
}