import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { createStoryThunk } from '../thunks/createStory.thunk.ts';

export const useCreateStory = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const createStory = useCallback(async (file: File) => {
    setIsLoading(true);
    try {
      await dispatch(createStoryThunk(file));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return { createStory, isLoading };
};
