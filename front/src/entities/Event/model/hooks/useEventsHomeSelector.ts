import { useAppSelector } from '@/shared/config/redux';
import { selectEventsHome } from '../selectors/selectEventsHome.ts';

export const useEventsHomeSelect = () => {
  return useAppSelector(selectEventsHome);
}