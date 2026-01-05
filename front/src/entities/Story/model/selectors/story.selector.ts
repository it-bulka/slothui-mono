import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import { storiesAdapter } from '../slice/adapter.ts';
import type { UserStories } from '@/shared/libs/services';
import { mapUserMetaToUserStories } from '../utils/mapUserMetaToUserStories.ts';

export const selectAllStories = createSelector(
  (state: RootState) => state.stories.ids,
  (state: RootState) => state.stories.entities,
  (state: RootState) => state.stories.isLoading,
  (state: RootState) => state.stories.error,
  (ids, entities, isLoading, error) => {
    const items = ids.map(id => entities[id]!).filter(Boolean);
    return { items, isLoading, error };
  }
);

export const selectStoriesByUser = (userId?: string) =>
  createSelector(
    (state: RootState) => state.stories.storiesByUser[userId ?? ''],
    (state: RootState) => state.stories.entities,
    (state: RootState) => state.stories.isLoading,
    (state: RootState) => state.stories.error,
    (userMeta, entities, isLoading, error) => {
      const items = userMeta?.storyIds.map((id) => entities[id]!).filter(Boolean) || [];
      return { items, isLoading, error };
    }
  );

export const selectAllGroupedStories = () =>
  createSelector(
    (state: RootState) => state.stories.entities,
    (state: RootState) => state.stories.storiesByUser,
    (state: RootState) => state.stories.isLoading,
    (state: RootState) => state.stories.error,
    (entities, storiesByUser, isLoading, error) => {
      const items: UserStories[] = Object.values(storiesByUser)
        .filter(Boolean)
        .map(userMeta => mapUserMetaToUserStories(userMeta, entities));

      return { items, isLoading, error };
    }
  );

export const selectGroupedStoriesByUser = (userId?: string) =>
  createSelector(
    (state: RootState) => state.stories.entities,
    (state: RootState) => state.stories.storiesByUser,
    (state: RootState) => state.stories.isLoading,
    (state: RootState) => state.stories.error,
    (entities, storiesByUser, isLoading, error) => {
      if(!userId) return { items: [], isLoading, error };

      const users = [storiesByUser[userId]].filter(Boolean)

      const items: UserStories[] = users.map(userMeta => mapUserMetaToUserStories(userMeta, entities));

      return { items, isLoading, error };
    }
  );

export const storiesSelectors = storiesAdapter.getSelectors<RootState>(
  (state) => state.stories
);