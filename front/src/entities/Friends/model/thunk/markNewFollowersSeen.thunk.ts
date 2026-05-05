import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import { notificationsCountersActions } from '@/entities/NotificationsCounters';

export const markNewFollowersSeenThunk = createAsyncThunk<
  { followersLastSeenAt: number; userId: string } | undefined,
  void,
  ThunkAPI
>(
  'friends/markNewFollowersSeen',
  async (_arg, { getState, extra, dispatch, rejectWithValue }) => {
    const userId = getState().authUser?.data?.id;
    if (!userId) return rejectWithValue('User not authorized');

    if (getState().notificationsCounters.newFollowers === 0) return undefined;

    dispatch(notificationsCountersActions.resetFollowersCounter());
    try {
      const followersLastSeenAt = await extra.services.friends.markFollowersSeen();
      return { followersLastSeenAt, userId };
    } catch (e) {
      const errMsg = extra.extractErrorMessage(e, 'Failed to mark followers seen');
      return rejectWithValue(errMsg);
    }
  }
);
