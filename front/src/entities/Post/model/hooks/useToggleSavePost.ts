import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { toggleSavePostThunk } from '../thunks/toggleSavePost.thunk.ts';

export const useToggleSavePost = () => {
  const dispatch = useAppDispatch();

  const toggleSavePost = useCallback((arg: { postId: string, saved: boolean }) => {
    dispatch(toggleSavePostThunk(arg))
  }, [dispatch]);

  return { toggleSavePost };
}