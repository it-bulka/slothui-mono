import { createSlice } from '@reduxjs/toolkit';
import { createPostThunk } from '@/entities';

interface PostComposerState {
  isCreating: boolean;
  error?: string;
}

const initialState: PostComposerState = {
  isCreating: false,
};

const postComposerSlice = createSlice({
  name: 'postComposer',
  initialState,
  reducers: {
    resetPostComposer: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createPostThunk.pending, state => {
        state.isCreating = true;
        state.error = undefined;
      })
      .addCase(createPostThunk.fulfilled, state => {
        state.isCreating = false;
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  reducer: postComposerReducer,
  actions: postComposerActions,
} = postComposerSlice;
