import type { RootState } from '@/app/config';

export const selectHomeIsLoading = (state: RootState) =>
  state.posts.home.isLoading

export const selectHomeHasMore = (state: RootState) =>
  state.posts.home.hasMore

export const selectHomeNextCursor = (state: RootState) =>
  state.posts.home.nextCursor