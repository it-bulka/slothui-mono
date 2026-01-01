import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { EditCommentDto, EditedCommentDTO } from '@/shared/libs/services';

export const editComment = createAsyncThunk<
  EditedCommentDTO,
  EditCommentDto,
  ThunkAPI
>('comment/edit', async ({ commentId, text }, { extra, rejectWithValue }) => {
  try {
    return await extra.services.comments.editComment({ text, commentId })
  } catch {
    return rejectWithValue('Editing comment failed')
  }
})