import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CommentsState } from '../types'
import type { Comment } from '@/shared/types';
import {
  fetchPostComments,
  fetchReplies,
  editComment,
  deleteComment
} from '../thunk'
import { createEntityAdapter } from '@reduxjs/toolkit';
import { mockComments } from '@/mock/data/comments.tsx';
import type { CommentWithMeta } from '../types/comment.type.ts';
import type { RootState } from '@/app/config';

export const commentsAdapter = createEntityAdapter<CommentWithMeta, string>({
  selectId: (comment) => comment.id,
  sortComparer: false, // backend sorts
})

const initialState = commentsAdapter.getInitialState<CommentsState>({
  entities: mockComments.entities,
  ids: Object.keys(mockComments.entities),
  postComments: mockComments.postComments,
  replies: {},
})

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addOptimisticReply: (state, action: PayloadAction<CommentWithMeta>) => {
      const comment = action.payload

      commentsAdapter.addOne(state, comment)
      if(comment.parentId) {
        state.replies[comment.parentId] ??= {
          ids: [],
          hasMore: true,
          isLoading: false
        }
        state.replies[comment.parentId]?.ids.push(comment.id)
      } else {
        state.postComments[comment.postId] ??= {
          ids: [],
          hasMore: true,
          isLoading: false
        }
        state.postComments[comment.postId]?.ids.push(comment.id)
      }
    },
    replaceOptimisticComment(state, action: PayloadAction<{ tempId: string, realComment: Comment }>) {
      const { tempId, realComment } = action.payload
      commentsAdapter.removeOne(state, tempId)
      commentsAdapter.addOne(state, realComment)

      const parentId = realComment.parentId
      const postId = realComment.postId

      if (parentId) {
        state.replies[parentId]?.ids.unshift(tempId)
        state.replies[parentId]?.ids.push(realComment.id)
      } else {
        state.postComments[postId]?.ids.unshift(tempId)
        state.postComments[postId]?.ids.push(realComment.id)
      }
    },
    markCommentFailed(state, action: PayloadAction<{ id: string, error: string, isLoading: boolean }>) {
      const comment = state.entities[action.payload.id]
      comment.error = action.payload.error
      comment.isLoading = action.payload.isLoading
    },
    deleteUnsentComment: (state, action: PayloadAction<{ tempId: string }>) => {
      const { tempId } = action.payload
      const comment = state.entities[tempId]
      commentsAdapter.removeOne(state, tempId)

      if(comment.parentId) {
        const reply = state.replies[comment.parentId]
        if(!reply) return;
        reply.ids = reply.ids.filter(id => id !== tempId)
      } else {
        const postComment = state.postComments[comment.postId]
        if(!postComment) return;
        postComment.ids = postComment.ids.filter(id => id !== tempId)
      }
    },
    incrementCommentRepliesCount: (state, action: PayloadAction<{ commentId: string }>) => {
     const comment = state.entities[action.payload.commentId]
      commentsAdapter.updateOne(state, {
        id: comment.id,
        changes: {
          repliesCount: (state.entities[comment.id]?.repliesCount || 0) + 1
        }
      })
    },
    decrementCommentRepliesCount: (state, action: PayloadAction<{ commentId: string }>) => {
      const comment = state.entities[action.payload.commentId]
      const count = state.entities[comment.id]?.repliesCount - 1
      commentsAdapter.updateOne(state, {
        id: comment.id,
        changes: {
          repliesCount: count < 0 ? 0 : count
        }
      })
    },
    setCommentIsLoading: (state, action: PayloadAction<{ isLoading: boolean, commentId: string }>) => {
      commentsAdapter.updateOne(state, {
        id: action.payload.commentId,
        changes: {
          isLoading: action.payload.isLoading,
        }
      })
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, (state, action) => {
        const { postId } = action.meta.arg
        state.postComments[postId] ??= {
          ids: [],
          hasMore: true,
          isLoading: true,
        }
        state.postComments[postId].isLoading = true
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        const { postId } = action.meta.arg
        const { items, nextCursor, hasMore } = action.payload

        commentsAdapter.upsertMany(state, items)

        state.postComments[postId] = {
          ids: [
            ...(state.postComments[postId]?.ids ?? []),
            ...items.map((c) => c.id),
          ],
          nextCursor,
          hasMore,
          isLoading: false,
        }
      })

    // ---------- REPLIES ----------
    builder
      .addCase(fetchReplies.pending, (state, action) => {
        const { parentId } = action.meta.arg
        state.replies[parentId] ??= {
          ids: [],
          hasMore: true,
          isLoading: true,
        }
        state.replies[parentId].isLoading = true
        state.replies[parentId].error = undefined
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        const { parentId, items, nextCursor, hasMore } = action.payload

        commentsAdapter.upsertMany(state, items)

        state.replies[parentId] = {
          ids: [
            ...(state.replies[parentId]?.ids ?? []),
            ...items.map((c) => c.id),
          ],
          nextCursor,
          hasMore,
          isLoading: false,
        }
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        const { parentId } = action.meta.arg
        state.replies[parentId] ??= {
          ids: [],
          hasMore: true,
          isLoading: false,
        }
        state.replies[parentId].isLoading = false
        state.replies[parentId].error = action.payload
      })

    // ---------- EDIT ----------
    builder.addCase(editComment.fulfilled, (state, action) => {
      const editedComment = action.payload
      commentsAdapter.updateOne(state, {
        id: editedComment.id,
        changes: {
          text: editedComment.text,
          updatedAt: editedComment.editedAt,
        },
      })
    })

    // ---------- DELETE ----------
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      commentsAdapter.removeOne(state, action.payload)
    })
  },
})

export const commentsReducer = commentsSlice.reducer
export const commentsActions = commentsSlice.actions

export const {
  selectById: selectCommentById,
  selectEntities: selectCommentEntities,
} = commentsAdapter.getSelectors<RootState>(
  (state) => state.comments
)
