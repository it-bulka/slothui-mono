import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { createPostThunk } from '../thunks/createPost.thunk.ts';
import type { CreatePostDTO } from '@/shared/libs/services/postsService/posts.types.ts';

export const useCreatePost = () => {
  const dispatch = useAppDispatch();

  const createPost = useCallback((dto: CreatePostDTO) => {
    return dispatch(createPostThunk(dto))
  }, [dispatch]);

  return { createPost };
}