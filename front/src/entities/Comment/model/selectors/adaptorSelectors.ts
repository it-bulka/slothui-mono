import { commentsAdapter } from '../adaptor/comment.adaptor.ts';
import type { RootState } from '@/app/config';
export const {
  selectById: selectCommentById,
  selectEntities: selectCommentEntities,
} = commentsAdapter.getSelectors<RootState>(
  (state) => state.comments
)