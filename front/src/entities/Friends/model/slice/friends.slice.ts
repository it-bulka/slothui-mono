import { createSlice } from '@reduxjs/toolkit';
import type { FriendsState } from '../type/friends.type.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';
import type { RootState } from '@/app/config';
import {
  confirmFriendExtraReducer,
  fetchFollowingsExtraReducer,
  fetchFollowersExtraReducer,
  fetchSuggestionsExtraReducer,
  followUserExtraReducer,
  removeFolloweeExtraReducer,
  removeFollowerExtraReducer,
  markNewFollowersSeenExtraReducer
} from '../extraReducers';

export const initialState = friendsAdapter.getInitialState<FriendsState>({
  entities: {},
  ids: [],
  followersByUser: {},
  followingsByUser: {},
  suggestions: {
    ids: [],
  },
  followersLastViewedAt: 0,
});

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    resetFriendsState: () => initialState,
    resetFriendsStateByUser: (state, action: { payload: { userId: string } }) => {
      const { userId } = action.payload;
      delete state.followersByUser[userId];
      delete state.followingsByUser[userId];
    },
  },
  extraReducers: (builder) => {
    confirmFriendExtraReducer(builder);
    fetchFollowingsExtraReducer(builder);
    fetchFollowersExtraReducer(builder);
    fetchSuggestionsExtraReducer(builder);
    followUserExtraReducer(builder);
    removeFolloweeExtraReducer(builder);
    removeFollowerExtraReducer(builder);
    markNewFollowersSeenExtraReducer(builder);
  }
})

export const {
  reducer: friendsReducer,
  actions: friendsActions,
} = friendsSlice

export const {
  selectById: selectFriendById,
  selectEntities: selectFriendsEntities,
} = friendsAdapter.getSelectors<RootState>(
  state => state.friends
)