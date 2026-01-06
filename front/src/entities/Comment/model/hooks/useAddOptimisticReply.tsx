import { useAppDispatch } from '@/shared/config/redux';
import { addCommentOptimisticThunk, type AddCommentOptimisticArgs } from '../thunk/addOptimisticComment.thunk.ts';
import { useCallback } from 'react';

export const useAddOptimisticReply = () => {
  const dispatch = useAppDispatch();
  const addOptimisticReply = useCallback((dto: AddCommentOptimisticArgs) => {
    dispatch(addCommentOptimisticThunk(dto))
  }, [dispatch]);
  return { addOptimisticReply}
}