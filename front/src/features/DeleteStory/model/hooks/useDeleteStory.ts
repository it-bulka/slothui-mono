import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { deleteStoryThunk } from '../thunks/deleteStory.thunk.ts';

export const useDeleteStory = () => {
  const dispatch = useAppDispatch();
  const [confirmStoryId, setConfirmStoryId] = useState<string | null>(null);

  const requestDelete = useCallback((storyId: string) => {
    setConfirmStoryId(storyId);
  }, []);

  const cancelDelete = useCallback(() => {
    setConfirmStoryId(null);
  }, []);

  const confirmDelete = useCallback(async (): Promise<boolean> => {
    if (!confirmStoryId) return false;
    const id = confirmStoryId;
    setConfirmStoryId(null);
    try {
      await dispatch(deleteStoryThunk(id));
      return true;
    } catch (e) {
      console.error('Failed to delete story:', e);
      return false;
    }
  }, [dispatch, confirmStoryId]);

  return { confirmStoryId, requestDelete, cancelDelete, confirmDelete };
};
