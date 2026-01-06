import { useAppSelector } from '@/shared/config/redux';
import { selectPostById } from '../selectors/adapterSelectors.ts';

export const usePostByIdSelect = (postId: string) => {
  return useAppSelector(state => selectPostById(state, postId));
}