import { useAppDispatch, useAppStore } from '@/shared/config/redux';
import { useCallback } from 'react';
import { selectCommentById } from '@/entities/Comment/model/selectors/adaptorSelectors.ts';
import { commentsActions } from '@/entities/Comment/model';
import { useCommentsService } from '@/shared/libs/services';

export interface ResendCommentArgs {
  tempId: string
  onFailed?: () => void
}

export const useResendComment = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const { createComment } = useCommentsService()

  const resendComment = useCallback(async (dto: ResendCommentArgs) => {
    dispatch(
      commentsActions.setCommentIsLoading({
        commentId: dto.tempId,
        isLoading: true,
      })
    )

    const comment = selectCommentById(store.getState(), dto.tempId)

    try {
      /** real request */
      const realComment = await createComment({
        postId: comment.postId,
        parentId: comment.parentId,
        text: comment.text,
      })

      /** replace temp */
      dispatch(
        commentsActions.replaceOptimisticComment({
          tempId: dto.tempId,
          realComment,
        })
      )
    } catch {
      /** rollback / error */
      dispatch(
        commentsActions.markCommentFailed({
          id: dto.tempId,
          error: 'Failed to send comment',
          isLoading: false,
        })
      )

      dto?.onFailed?.()
    }
  }, [dispatch, createComment, store]);
  return { resendComment }
}