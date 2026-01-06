import { resendCommentThunk, type ResendCommentArgs } from '../thunk';
import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';

export const useResendComment = () => {
  const dispatch = useAppDispatch();
  const resendComment = useCallback((dto: ResendCommentArgs) => {
    dispatch(resendCommentThunk(dto))
  }, [dispatch]);
  return { resendComment }
}