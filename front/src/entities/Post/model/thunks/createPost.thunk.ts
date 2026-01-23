import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PostWithAttachmentsDto } from '@/shared/types';
import type { CreatePostDTO } from '@/shared/libs/services/postsService/posts.types.ts';

export const createPostThunk = createAsyncThunk<
  PostWithAttachmentsDto,
  CreatePostDTO,
  ThunkAPI
>(
  'posts/create',
  async (draftPost, { extra, rejectWithValue }) => {
    try {
      return await extra.services.posts.createOne(draftPost);
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to create message');
      return rejectWithValue(errMsg)
    }
  }
)