import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import type { FriendEntity } from '../type/friends.type';

export const selectFollowersWithNewOnTop = createSelector(
    (state: RootState) => state.friends.entities,
    (state: RootState, userId?: string) => state.friends.followersByUser[userId || ''],
    (state: RootState) => state.friends.followersLastViewedAt,
    (entities, friendPage, globalLastViewedAt) => {
      if (!friendPage) return [];

      const lastSeenAt = friendPage.followersLastSeenAt ?? globalLastViewedAt;

      const followers = friendPage.ids
        .map(id => entities[id])
        .filter((follower): follower is FriendEntity => !!follower);

      const newFollowers = followers.filter(f => f.followedAt > lastSeenAt);
      const oldFollowers = followers.filter(f => f.followedAt <= lastSeenAt);

      return [...newFollowers, ...oldFollowers]; // нові на початку
    }
  );
