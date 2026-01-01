import { createAsyncThunk } from '@reduxjs/toolkit'
import { commentsActions } from '../slice/comment.slice'
import { postsActions } from '@/entities/Post'
import { nanoid } from 'nanoid'
import type { ThunkAPI } from '@/shared/config/redux';

export interface AddCommentOptimisticArgs {
  postId: string,
  parentId?: string | null,
  text: string
  onOptimisticAdded?: () => void
  onFailed?: () => void
}
/** not extra reducer **/
export const addCommentOptimisticThunk = createAsyncThunk<
  void,
  AddCommentOptimisticArgs,
  ThunkAPI
>(
  'comments/addCommentOptimistic',
  async ({ postId, parentId, text, onOptimisticAdded, onFailed }, { dispatch, getState, rejectWithValue, extra }) => {
    const state = getState()
    const user = state.user.data

    if (!user) {
      return rejectWithValue('User not authorized')
    }

    const tempId = nanoid()

    /** optimistic add */
    dispatch(
      commentsActions.addOptimisticReply({
        id: tempId,
        postId,
        parentId,
        text,
        createdAt: new Date().toISOString(),
        isEdited: false,
        repliesCount: 0,
        author: {
          id: 'user.id',
          nickname: 'user.nickname',
          username: 'user.name',
          avatarUrl: 'user.avatarUrl',
        },
        isLoading: true
      })
    )

    onOptimisticAdded?.()
    /** increment counters */
    if (parentId) {
      dispatch(commentsActions.incrementCommentRepliesCount({ commentId: parentId }))
    } else {
      dispatch(postsActions.incrementCommentsCount({ postId }))
    }

    try {
      /** real request */
      const realComment = await extra.services.comments.createComment({
        postId,
        parentId,
        text,
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
          isLoading: false
        })
      )

      onFailed?.()

      throw e
    }
  }
)
