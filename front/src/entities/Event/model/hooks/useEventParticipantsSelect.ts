import { useAppSelector } from '@/shared/config/redux';
import { selectEventParticipants } from '../selectors/selectEventParticipants.ts';

export const useEventParticipantsSelect = (eventId?: string) => {
  return useAppSelector(selectEventParticipants(eventId));
}