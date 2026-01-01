import type { EntityState } from '@reduxjs/toolkit';
import type { Comment } from '@/shared/types';

export type CommentWithMeta = Comment & {
  error?: string
  isLoading?: boolean
};

export interface CommentsPage {
  ids: string[]
  nextCursor?: string | null
  hasMore: boolean
  isLoading: boolean
  error?: string
}

export interface CommentsState extends EntityState<CommentWithMeta, string> {
  postComments: Record<string, CommentsPage> // key = postId
  replies: Record<string, CommentsPage> // key = parentCommentId
}