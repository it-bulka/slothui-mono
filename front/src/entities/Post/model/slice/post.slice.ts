import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PostsState } from '../types/posts.type.ts';
import { postsAdapter } from '../adapter/postsAdapter.ts';
import {
  deletePostExtraReducer,
  fetchLikedPostsExtraReducer,
  fetchSavedPostsExtraReducer,
  fetchFeedPostsExtraReducer,
  fetchPostsByUserExtraReducer,
  createPostExtraReducer,
  toggleLikePostExtraReducer,
  toggleSavePostExtraReducer,
  fetchMyPostsExtraReducer
} from '../extraReducers';
import { mockPostsState } from '@/mock/data';

/*
const initialState= postsAdapter.getInitialState<PostsState>({
  entities: {},
  ids: [],
  home: {
    ids: [],
    isLoading: false,
    hasMore: true,
    nextCursor: null
  },
  profile: {},
  saves: {
    ids: [],
    isLoading: false,
    hasMore: true,
    nextCursor: null
  },
  likes: {
    ids: [],
    isLoading: false,
    hasMore: true,
    nextCursor: null
  }
})
*/
// TODO: delete default later
const initialState= postsAdapter.getInitialState<PostsState>(mockPostsState)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    incrementCommentsCount: (state, action: PayloadAction<{ postId: string }>) => {
      const post = state.entities[action.payload.postId]
      postsAdapter.updateOne(state, {
        id: post.id,
        changes: {
          commentsCount: (state.entities[post.id]?.commentsCount || 0) + 1
        }
      })
    },
    decrementCommentsCount: (state, action: PayloadAction<{ postId: string }>) => {
      const post = state.entities[action.payload.postId]
      const count = state.entities[post.id]?.commentsCount - 1
      postsAdapter.updateOne(state, {
        id: post.id,
        changes: {
          commentsCount: count < 0 ? 0 : count
        }
      })
    }
  },
  extraReducers: (builder) => {
    fetchFeedPostsExtraReducer(builder);
    fetchMyPostsExtraReducer(builder);
    fetchPostsByUserExtraReducer(builder);
    deletePostExtraReducer(builder);
    fetchSavedPostsExtraReducer(builder);
    fetchLikedPostsExtraReducer(builder);
    createPostExtraReducer(builder);
    toggleLikePostExtraReducer(builder);
    toggleSavePostExtraReducer(builder);
  },
})

export const {
  actions: postsActions,
  reducer: postsReducer,
} = postsSlice