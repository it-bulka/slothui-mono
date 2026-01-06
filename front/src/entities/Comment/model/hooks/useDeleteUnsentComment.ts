import { deleteUnsentCommentThunk } from '../thunk';
import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';

export const useDeleteUnsentComment = () => {
  const dispatch = useAppDispatch();

  const deleteUnsentComment = useCallback((commentId: string) => {
    dispatch(deleteUnsentCommentThunk({ tempId: commentId }))
  }, [dispatch]);

  return { deleteUnsentComment };
}