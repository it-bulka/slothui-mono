import { useAppSelector } from '@/shared/config/redux';
import { selectReplyTarget } from '../selectors/selectReplyTarget.ts';

export const useGetReplyTarget = () => {
  return useAppSelector(selectReplyTarget)
}