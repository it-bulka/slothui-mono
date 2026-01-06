import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { toggleLikePostThunk } from '../thunks/toggleLikePost.thunk.ts';

export const useToggleLikePost = () => {
  const dispatch = useAppDispatch();

  const toggleLikePost = useCallback((arg: { postId: string, liked: boolean }) => {
    dispatch(toggleLikePostThunk(arg))
  }, [dispatch]);

  return { toggleLikePost };
}