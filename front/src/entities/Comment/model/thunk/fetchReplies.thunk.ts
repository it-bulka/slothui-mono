import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { GetReplyDto } from '@/shared/libs/services';
import type { CommentsPaginated } from '@/shared/types';

export const fetchReplies = createAsyncThunk<
  CommentsPaginated & { parentId: string },
  GetReplyDto,
  ThunkAPI
>(
  'comment/fetchReplies',
  async ({ parentId, cursor, postId }, { extra, rejectWithValue }) => {
  try {
    const res = await extra.services.comments.fetchReplies({ postId, parentId, cursor })
    return { parentId, ...res }
  } catch {
    return rejectWithValue('Fetching replies failed')
  }
})