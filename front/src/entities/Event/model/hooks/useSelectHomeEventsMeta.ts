import { useAppSelector } from '@/shared/config/redux';
import { selectHomeEventsMeta } from '../selectors/selectEventsHomeMeta.tsx';

export const useSelectHomeEventsMeta = () => {
  return useAppSelector(selectHomeEventsMeta);
};