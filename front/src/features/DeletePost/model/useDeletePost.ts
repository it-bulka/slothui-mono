import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { deletePostThunk } from '@/entities/Post';

export const useDeletePost = () => {
  const dispatch = useAppDispatch();
  const [confirmPostId, setConfirmPostId] = useState<string | null>(null);

  const requestDelete = useCallback((postId: string) => {
    setConfirmPostId(postId);
  }, []);

  const cancelDelete = useCallback(() => {
    setConfirmPostId(null);
  }, []);

  const confirmDelete = useCallback(async (): Promise<boolean> => {
    if (!confirmPostId) return false;
    const postId = confirmPostId;
    setConfirmPostId(null);
    try {
      await dispatch(deletePostThunk(postId)).unwrap();
      return true;
    } catch (e) {
      console.error('Failed to delete post:', e);
      return false;
    }
  }, [dispatch, confirmPostId]);

  return { confirmPostId, requestDelete, cancelDelete, confirmDelete };
};
