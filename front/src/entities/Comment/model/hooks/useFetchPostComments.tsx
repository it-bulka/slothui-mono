import { useAppDispatch } from '@/shared/config/redux';
import { fetchPostComments } from '../thunk';
import { useCallback } from 'react';

export const useFetchPostComments = () => {
  const dispatch = useAppDispatch();

  const fetchComments = useCallback((dto: {
    postId: string
    nextCursor?: string | null
  }) => {
    return dispatch(fetchPostComments(dto))
  }, [dispatch]);

  return { fetchComments }
}