import { createSelector } from '@reduxjs/toolkit';
import { selectReplyTarget } from '@/entities';
import type { RootState } from '@/app/config';
import { useAppSelector } from '@/shared/config/redux';
import type { UserShort } from '@/shared/types';

export const selectReplyTargetAuthor = createSelector(
  [
    selectReplyTarget,
    (state: RootState) => state.posts.entities,
    (state: RootState) => state.comments.entities,
  ],
  (replyTarget, posts, comments): UserShort | null => {
    if (!replyTarget.parentId || !replyTarget.type) return null

    if (replyTarget.type === 'post') {
      return posts[replyTarget.parentId]?.author ?? null
    }

    if (replyTarget.type === 'comment') {
      return comments[replyTarget.parentId]?.author ?? null
    }

    return null
  }
)

export const useSelectReplyTargetAuthor = () => {
  return useAppSelector(selectReplyTargetAuthor)
}