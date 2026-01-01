import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkAPI } from '@/shared/config/redux';
import type { GetCommentDto } from '@/shared/libs/services';
import type { CommentsPaginated } from '@/shared/types';

export const fetchPostComments = createAsyncThunk<
  CommentsPaginated,
  GetCommentDto,
  ThunkAPI
>(
  'comment/fetchPostComments',
  async ({ postId, cursor }, { extra }) => {
  const res = await extra.services.comments.fetchPostComments({ postId, cursor })
  return { postId, ...res }
})

