import { createAsyncThunk } from '@reduxjs/toolkit'
import { commentsActions } from '../slice/comment.slice'
import type { ThunkAPI } from '@/shared/config/redux';
import { selectCommentById } from '../slice/comment.slice';

export interface ResendCommentArgs {
  tempId: string
  onFailed?: () => void
}
/** not extra reducer **/
export const resendCommentThunk = createAsyncThunk<
  void,
  ResendCommentArgs,
  ThunkAPI
>(
  'comments/addCommentOptimistic',
  async ({ tempId, onFailed }, { dispatch, getState, extra }) => {
    const state = getState()
    const comment = selectCommentById(state, tempId)

    dispatch(
      commentsActions.setCommentIsLoading({
        commentId: tempId,
        isLoading: true,
      })
    )
    try {
      /** real request */
      const realComment = await extra.services.comments.createComment({
        postId: comment.postId,
        parentId: comment.parentId,
        text: comment.text,
      })

      /** replace temp */
      dispatch(
        commentsActions.replaceOptimisticComment({
          tempId,
          realComment,
        })
      )
    } catch (e) {
      /** rollback / error */
      dispatch(
        commentsActions.markCommentFailed({
          id: tempId,
          error: 'Failed to send comment',
          isLoading: false,
        })
      )

      onFailed?.()

      throw e
    }
  }
)
