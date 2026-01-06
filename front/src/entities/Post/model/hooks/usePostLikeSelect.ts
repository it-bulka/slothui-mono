import { selectPostLikeState } from '../selectors/selectPostLikeState.ts';
import { useAppSelector } from '@/shared/config/redux';


export const usePostLikeSelect = (postId: string) => {
  return useAppSelector(state => selectPostLikeState(state, postId));
}
