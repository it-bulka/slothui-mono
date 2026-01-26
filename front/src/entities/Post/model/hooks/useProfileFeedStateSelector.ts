import { useAppSelector } from '@/shared/config/redux';
import { selectProfileFeedState } from '../selectors/selectProfileFeedState.ts';

export const useProfileFeedStateSelector = (userId?: string) => {
  return useAppSelector(state => selectProfileFeedState(state, userId));
}