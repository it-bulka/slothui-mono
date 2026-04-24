import { useAppSelector } from '@/shared/config/redux';
import { selectLikedPostsMeta } from '../selectors/selectLikedPostsMeta.ts';

export const useSelectLikedPostsMeta = () => {
  return useAppSelector(selectLikedPostsMeta);
};