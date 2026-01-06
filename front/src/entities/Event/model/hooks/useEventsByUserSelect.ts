import { useAppSelector } from '@/shared/config/redux';
import { selectEventsByUser } from '../selectors/selectEventsByUser.ts';

export const useEventsByUserSelect = (userId?: string) => {
  return useAppSelector(selectEventsByUser(userId));
}