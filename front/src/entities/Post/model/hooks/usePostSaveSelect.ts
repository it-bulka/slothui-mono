import { selectPostSaveState } from '../selectors/selectPostSaveState.ts';
import { useAppSelector } from '@/shared/config/redux';

export const usePostSaveSelect = (postId: string) => {
  return useAppSelector(state => selectPostSaveState(state, postId));
}
