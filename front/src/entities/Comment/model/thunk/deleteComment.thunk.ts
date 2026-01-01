import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const deleteComment = createAsyncThunk<
  string,
  { id: string },
  ThunkAPI
>('comment/delete', async ({ id }, { extra }) => {
  await extra.services.comments.deleteComment(id)
  return id
})