import { useAppSelector } from '@/shared/config/redux';
import { selectSubscribedEvents } from '../selectors/selectSubscribedEvents.ts';

export const useSubscribedEventsSelect = () => {
  return useAppSelector(selectSubscribedEvents);
}