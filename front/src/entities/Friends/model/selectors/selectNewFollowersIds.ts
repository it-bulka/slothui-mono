import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import type { FriendEntity } from '../type/friends.type';

export const selectNewFollowersIds = createSelector(
    (state: RootState) => state.friends.entities,
    (state: RootState, userId?: string) => state.friends.followersByUser[userId || ''],
    (state: RootState) => state.friends.followersLastViewedAt,
    (entities, friendPage, globalLastViewedAt) => {
      if (!friendPage) return [];

      const lastSeenAt = friendPage.followersLastSeenAt ?? globalLastViewedAt;

      return friendPage.ids
        .map(id => entities[id])
        .filter(
          (follower): follower is FriendEntity =>
            !!follower && follower.followedAt > lastSeenAt
        )
        .map(f => f.id);
    }
  );
