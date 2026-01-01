import { useAppDispatch } from '@/shared/config/redux';
import { fetchPostComments } from '../thunk';

export const useFetchPostComments = () => {
  const dispatch = useAppDispatch();

  const fetchComments = (dto: {
    postId: string
    nextCursor?: string | null
  }) => {
    return dispatch(fetchPostComments(dto))
  }

  return { fetchComments }
}