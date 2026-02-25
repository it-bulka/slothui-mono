import { unfollowThunk } from '../../../Friends';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '@/entities/AuthUser/model/types.ts';

export const unfollowExtraReducer = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(unfollowThunk.fulfilled, (state) => {
      if(!state.data) return
      state.data.followeesCount = Math.max(0, state.data.followeesCount - 1)
    })
}