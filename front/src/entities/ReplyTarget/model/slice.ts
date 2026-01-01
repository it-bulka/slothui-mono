import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ReplyTargetState {
  parentId?: string | null
  type: 'post' | 'comment' | null
  postId: string | null
}

const initialState: ReplyTargetState = {
  parentId: null,
  type: null,
  postId: null,
}

const replyTargetSlice = createSlice({
  name: 'replyTarget',
  initialState,
  reducers: {
    setReplyTarget(_state, action: PayloadAction<ReplyTargetState>) {
      return action.payload
    },
    resetReplyTarget(_state) {
      return initialState
    },
    resetParentId(state) {
      state.parentId = null
      return state
    }
  }
})

export const {
  reducer: replyTargetReducer,
  actions: replyTargetActions
} = replyTargetSlice
