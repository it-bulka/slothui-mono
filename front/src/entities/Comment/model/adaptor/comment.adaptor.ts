import { createEntityAdapter } from '@reduxjs/toolkit';
import type { CommentWithMeta } from '@/entities/Comment/model/types/comment.type.ts';

export const commentsAdapter = createEntityAdapter<CommentWithMeta, string>({
  selectId: (comment) => comment.id,
  sortComparer: false, // backend sorts
})