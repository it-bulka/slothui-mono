import { useAppSelector } from '@/shared/config/redux';
import { selectUpcomingEvents } from '../selectors/selectUpcomingEvents.ts';

export const useUpcomingEventsSelect = () => {
  return useAppSelector(selectUpcomingEvents);
}