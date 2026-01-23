import { useAppSelector } from '@/shared/config/redux';
import { selectProfileFeedState } from '../selectors/selectProfileFeedState.ts';

export const useProfileFeedStateSelector = (userId?: string) => {
  console.log('useProfileFeedStateSelector', userId)

  return useAppSelector(state => selectProfileFeedState(state, userId));
}