import { useAppDispatch, useAppStore } from '@/shared/config/redux';
import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { commentsActions } from '../slice/comment.slice.ts';
import { postsActions } from '../../../Post';
import { selectAuthUser } from '../../../AuthUser';
import { useCommentsService } from '@/shared/libs/services';

export interface AddCommentOptimisticArgs {
  postId: string,
  parentId?: string | null,
  text: string
  onOptimisticAdded?: () => void
  onFailed?: () => void
}

export const useAddOptimisticReply = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const { createComment } = useCommentsService()

  const addOptimisticReply = useCallback(async (dto: AddCommentOptimisticArgs) => {
    const user = selectAuthUser(store.getState())

    if (!user) {
      dto?.onFailed?.()
      return
    }

    const tempId = nanoid()

    /** optimistic add */
    dispatch(
      commentsActions.addOptimisticReply({
        id: tempId,
        postId: dto.postId,
        parentId: dto.parentId,
        text: dto.text,
        createdAt: new Date().toISOString(),
        isEdited: false,
        repliesCount: 0,
        author: {
          id: 'user.id',
          nickname: 'user.nickname',
          username: 'user.username',
          avatarUrl: 'user.avatarUrl',
        },
        isLoading: true
      })
    )

    dto?.onOptimisticAdded?.()
    /** increment counters */
    if (dto.parentId) {
      dispatch(commentsActions.incrementCommentRepliesCount({ commentId: dto.parentId }))
    } else {
      dispatch(postsActions.incrementCommentsCount({ postId: dto.postId }))
    }

    try {
      /** real request */
      const realComment = await createComment({
        postId: dto.postId,
        parentId: dto.parentId,
        text: dto.text,
      })

      /** replace temp */
      dispatch(
        commentsActions.replaceOptimisticComment({
          tempId,
          realComment,
        })
      )
    } catch {
      /** rollback / error */
      dispatch(
        commentsActions.markCommentFailed({
          id: tempId,
          error: 'Failed to send comment',
          isLoading: false
        })
      )

      dto?.onFailed?.()
    }
  }, [dispatch, store, createComment]);
  return { addOptimisticReply}
}