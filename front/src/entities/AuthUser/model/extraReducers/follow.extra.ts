import { followUserThunk } from '../../../Friends';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type { AuthUserState } from '@/entities/AuthUser/model/types.ts';

export const followExtraReducer = (builder: ActionReducerMapBuilder<AuthUserState>) => {
  builder
    .addCase(followUserThunk.fulfilled, (state) => {
      if (!state.data) return;
      state.data.followeesCount = state.data.followeesCount + 1;
    });
}
