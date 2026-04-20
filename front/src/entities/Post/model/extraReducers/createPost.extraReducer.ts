import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import type { PostsState } from '../types/posts.type.ts';
import { createPostThunk } from '../thunks/createPost.thunk.ts';
import { prependUniqueIds } from '@/shared/libs';

export const createPostExtraReducer = (builder: ActionReducerMapBuilder<PostsState>) => {
  builder.addCase(createPostThunk.fulfilled, (state, action) => {
    const normalized = {
      ...action.payload,
      attachments: action.payload.attachments ?? { images: [], video: [], audio: [], file: [] },
    };
    postsAdapter.addOne(state, normalized);
    state.home.ids.push(normalized.id);

    const authorId = action.payload.author.id;
    state.profile[authorId] ??= {
      ids: [],
      isLoading: false,
      hasMore: true,
      nextCursor: null
    }

    const feed = state.profile[authorId];

    feed.ids = prependUniqueIds(feed.ids, [{ id: action.payload.id}]);
  });
}