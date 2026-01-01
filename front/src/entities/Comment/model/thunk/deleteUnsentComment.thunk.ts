import { createAsyncThunk } from '@reduxjs/toolkit'
import { commentsActions } from '../slice/comment.slice'
import type { ThunkAPI } from '@/shared/config/redux';
import { selectCommentById } from '../slice/comment.slice';
import { postsActions } from '../../../Post';

export interface ResendCommentArgs {
  tempId: string
}
/** not extra reducer **/
export const deleteUnsentCommentThunk = createAsyncThunk<
  void,
  ResendCommentArgs,
  ThunkAPI
>(
  'comments/addCommentOptimistic',
  async ({ tempId }, { dispatch, getState }) => {
    const state = getState()
    const comment = selectCommentById(state, tempId)

    dispatch(commentsActions.deleteUnsentComment({ tempId }))
    if(comment.parentId) {
      dispatch(commentsActions.decrementCommentRepliesCount({ commentId: tempId }))
    } else {
      dispatch(postsActions.decrementCommentsCount({ postId: comment.postId }))
    }
  }
)
