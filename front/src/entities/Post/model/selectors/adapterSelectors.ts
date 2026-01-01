import { postsAdapter } from '../adapter/postsAdapter.ts';
import type { RootState } from '@/app/config';

export const {
  selectById: selectPostById,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
} = postsAdapter.getSelectors<RootState>(state => state.posts)