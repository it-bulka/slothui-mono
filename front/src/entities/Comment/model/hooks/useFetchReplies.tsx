import { useAppDispatch } from '@/shared/config/redux';
import { fetchReplies } from '../thunk';
import type { GetReplyDto } from '@/shared/libs/services';
import { useCallback } from 'react';

export const useFetchReplies = () => {
  const dispatch = useAppDispatch()

  const getReplies = useCallback((dto: GetReplyDto) => {
    return dispatch(fetchReplies(dto))
  }, [dispatch])

  return { fetchReplies: getReplies }
}