import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FriendsState, FriendEntity } from '../type/friends.type.ts';
import { friendsAdapter } from '../adapter/friends.adapter.ts';
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
import { fetchUserProfileDataThunk } from '../../../UsersProfiles';

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
    upsertRelation: (state, action: PayloadAction<{ ownerUserId: string, relatedUser: FriendEntity}>) => {
      friendsAdapter.upsertOne(state, action.payload.relatedUser);

      const ownerUserId = action.payload.ownerUserId
      const relatedUserId = action.payload.relatedUser.id
      const isFollower = action.payload.relatedUser.isFollower
      const isFollowee = action.payload.relatedUser.isFollowee

      if (isFollowee) {
        const ids = state.followingsByUser[ownerUserId].ids;

        if (!ids.includes(relatedUserId)) {
          ids.push(relatedUserId);
        }
      }
      if (isFollower) {
        const ids = state.followersByUser[ownerUserId].ids;

        if (!ids.includes(relatedUserId)) {
          ids.push(relatedUserId);
        }
      }
    }
  },
  extraReducers: (builder) => {
    confirmFriendExtraReducer(builder);
    fetchFollowingsExtraReducer(builder);
    fetchFollowersExtraReducer(builder);
    fetchSuggestionsExtraReducer(builder);
    followUserExtraReducer(builder);
    removeFolloweeExtraReducer(builder); // = unfollow
    removeFollowerExtraReducer(builder);
    markNewFollowersSeenExtraReducer(builder);

    // from userProfile
    builder
      .addCase(fetchUserProfileDataThunk.fulfilled, (state, action) => {
      const { user, relation } = action.payload.profile
      friendsAdapter.upsertOne(state, {
        id: user.id,
        src: user.avatarUrl,
        username: user.username,
        nickname: user.nickname,

        isFollower: relation.isFollower,
        isFollowee: relation.isFollowee,
        followedAt: 0
      });

      const ownerUserId = action.payload.currentUserId
      const relatedUserId = user.id

      if (relation?.isFollowee) {
        const ids = state.followingsByUser[ownerUserId]?.ids || [];

        if (!ids.includes(relatedUserId)) {
          ids.push(relatedUserId);
        }
      }
      if (relation?.isFollower) {
        const ids = state.followersByUser[ownerUserId]?.ids || [];

        if (!ids.includes(relatedUserId)) {
          ids.push(relatedUserId);
        }
      }
    })
  }
})

export const {
  reducer: friendsReducer,
  actions: friendsActions,
} = friendsSlice
